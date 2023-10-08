import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class BoardService {
  getBoardTest(): string {
    return 'Board!';
  }

  async getBoard() {
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
}
