import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateCardDTO } from './dto/createCard.dto';

@Injectable()
export class CardService {
  async getCard() {
    return axios
      .get(
        `${process.env.API_TRELLO_URL}/members/me/boards?fields=name,url&key=${process.env.KEY}&token=${process.env.TOKEN}`,
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
  }
  async createCard(data: CreateCardDTO) {
    return axios
      .post(
        `${process.env.API_TRELLO_URL}/cards?name=${data.name}&desc=${data.desc}&idList=${data.idList}&key=${process.env.KEY}&token=${process.env.TOKEN}`,
        {
          defaultCards: false,
        },
      )

      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }
}
