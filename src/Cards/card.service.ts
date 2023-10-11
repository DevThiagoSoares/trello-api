/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import { Payload, UpdateCardDTO } from './dto/createCard.dto';
import { PDFService } from './../PDF/pdf.service';
import FormData from 'form-data';

@Injectable()
export class CardService {
  constructor(
    @Inject(PDFService)
    private readonly PdfService: PDFService
  ) {}
  async getCard() {
    return axios
      .get(
        `${process.env.API_TRELLO_URL}/members/me/boards?fields=name,url&key=${process.env.KEY}&token=${process.env.TOKEN}`
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
  }

  async createCard(data: Payload) {
    try {
      // Gera o PDF e aguarda sua conclusão
      await this.PdfService.generatePdf(data);
      const description = this.generateDescription(data);

      // Continua com a criação do cartão
      const response = await axios.post(`${process.env.API_TRELLO_URL}/cards`, {
        name: 'Pedido de Compra',
        desc: description,
        idList: process.env.ID_LIST,
        key: process.env.KEY,
        token: process.env.TOKEN
      });

      const cardDetails = {
        id: response.data.id,
        name: response.data.name,
        checkItemStates: response.data.checkItemStates,
        dateLastActivity: response.data.dateLastActivity,
        idBoard: response.data.idBoard,
        idChecklists: response.data.idChecklists,
        idList: response.data.idList,
        url: response.data.url,
        desc: response.data.desc
      };

      // Cria anexos após a criação do cartão
      await this.createAttachmentsCard(cardDetails.id, {
        name: cardDetails.name,
        file: 'uploads/pedido.pdf'
      });

      return cardDetails;
    } catch (error) {
      return error;
    }
  }

  async createAttachmentsCard(cardId, data) {
    const form = new FormData();
    const fileData = fs.createReadStream(data.file);

    form.append('key', process.env.KEY);
    form.append('token', process.env.TOKEN);
    form.append('file', fileData, { filename: 'pedido.pdf' });

    try {
      const response = await axios.post(
        `${process.env.API_TRELLO_URL}/cards/${cardId}/attachments`,
        form,
        {
          headers: {
            ...form.getHeaders()
          }
        }
      );

      const cardDetails = {
        id: response.data.id,
        name: response.data.name,
        idMember: response.data.idMember,
        isUpload: response.data.isUpload,
        fileName: response.data.fileName,
        limits: response.data.limits,
        date: response.data.date
      };
      return cardDetails;
    } catch (error) {
      return error;
    }
  }

  async updateCard(cardId: string, data: UpdateCardDTO) {
    return axios
      .put(
        `${process.env.API_TRELLO_URL}/cards/${cardId}?name=${data.name}&desc=${data.desc}&key=${process.env.KEY}&token=${process.env.TOKEN}`,
        {
          defaultCards: false
        }
      )

      .then((response) => {
        const cardDetails = {
          id: response.data.id,
          name: response.data.name,
          checkItemStates: response.data.checkItemStates,
          dateLastActivity: response.data.dateLastActivity,
          idBoard: response.data.idBoard,
          idChecklists: response.data.idChecklists,
          idList: response.data.idList,
          url: response.data.url,
          desc: response.data.desc
        };
        return cardDetails;
      })
      .catch((error) => {
        return error;
      });
  }

  generateDescription(payload: Payload): string {
    const projectInfo = `
    \n**Nome do solicitante:** ${payload.project.requester}\n
    \n**Projeto:** ${payload.project.projectName}
    \n**Centro de Custos:** ${payload.project.costCenter}
    \n**Filial:** ${payload.project.subsidiary}
    \n**Prioridade:** ${payload.project.priority}
    \n 
    \n_______________________________________________
    \n**Justificativa:** ${payload.justification}
    \n_______________________________________________
    \n 
    `;

    const materialListInfo = payload.materialList.map(
      (material, index) => `
    \n  - **Material ${index + 1}:**
    \n    - Quantidade: ${material.quantity} ${
      material.und
    }\n    - Descrição: ${material.description}\n    - Valor Unitário: ${
      material.unitaryValue
    }\n    - Link de Compra: ${material.purchaseLink}
    `
    );

    const personInfo = `
    \n_______________________________________________
    \n\n**Lider do Projeto:** ${payload.projectLeader}\n
    \n**Gerente do projeto:** ${payload.projectManager}
    \n**Gerente Técnico:** ${payload.technicalManager}
    \n**Email Solicitante:** ${payload.email}
    \n\n`;

    return `${projectInfo}\n\n\n${materialListInfo.join('')}\n\n${personInfo}`;
  }
}
