import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateListDTO } from './dto/createList.dto';

@Injectable()
export class ListService {
  async getList() {
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
  async createList(data: CreateListDTO) {
    return axios
      .post(
        `${process.env.API_TRELLO_URL}/lists?name=${data.name}&idBoard=${data.idBoard}&key=${process.env.KEY}&token=${process.env.TOKEN}`,
        {
          defaultLists: false,
        },
      )

      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
  }
}
