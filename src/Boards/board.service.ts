import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateBoardDTO } from './dto/createBoard.dto';

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
  async createBoard(data: CreateBoardDTO) {
    return axios
      .post(
        `${process.env.API_TRELLO_URL}/boards?name=${data.name}&key=${process.env.KEY}&token=${process.env.TOKEN}`,
      )

      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
  }
}
