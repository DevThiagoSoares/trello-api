import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateListDTO, GetAllListDTO } from './dto/list.dto';

@Injectable()
export class ListService {
  async getAllList(data: GetAllListDTO) {
    return axios
      .get(
        `${process.env.API_TRELLO_URL}/boards/${data.boardId}/lists?key=${process.env.KEY}&token=${process.env.TOKEN}`,
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
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
        return error;
      });
  }

  async getAllCardInAList(id: string) {
    try {
      const response = await axios.get(
        `${process.env.API_TRELLO_URL}/lists/${id}/cards?&key=${process.env.KEY}&token=${process.env.TOKEN}`,
      );

      const cards = response.data;

      const cardDetails = cards.map((card) => {
        return {
          id: card.id,
          name: card.name,
          checkItemStates: card.checkItemStates,
          dateLastActivity: card.dateLastActivity,
          idBoard: card.idBoard,
          idChecklists: card.idChecklists,
          idList: card.idList,
          url: card.url,
          desc: card.desc,
        };
      });
      return cardDetails;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
