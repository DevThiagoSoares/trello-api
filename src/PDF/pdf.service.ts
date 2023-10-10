import { Injectable } from '@nestjs/common';
import * as ejs from 'ejs';
import * as pdf from 'html-pdf';
import { generatePdfDTO } from './dto/pdf.dto';

@Injectable()
export class PDFService {
  async generatePdf(data: generatePdfDTO): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        // Carregue o arquivo EJS
        const ejsTemplate = await ejs.renderFile(
          'src/Utils/templates/index.ejs',
          data,
        );

        // Opções para a conversão HTML para PDF
        const options: pdf.CreateOptions = {
          format: 'Letter', // ou outro formato de página desejado
          orientation: 'portrait', // ou 'landscape' para paisagem
        };

        // Converta o HTML para PDF
        pdf
          .create(ejsTemplate, options)
          .toFile('./uploads/pedido.pdf', (err, res) => {
            if (err) {
              reject(err); // Rejeita a Promise em caso de erro
            } else {
              resolve(res.filename); // Resolve a Promise com o nome do arquivo PDF
            }
          });
      } catch (error) {
        reject(error); // Rejeita a Promise em caso de erro
      }
    });
  }
}
