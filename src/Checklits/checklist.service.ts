import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateCheckItemDTO, CreateChecklistDTO } from './dto/checklist.dto';

@Injectable()
export class ChecklistService {
  async createChecklist(data: CreateChecklistDTO) {
    return axios
      .post(
        `${process.env.API_TRELLO_URL}/checklists?idCard=${data.cardId}&name=${data.name}&key=${process.env.KEY}&token=${process.env.TOKEN}`,
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

  async createCheckItem(data: CreateCheckItemDTO) {
    return axios
      .post(
        `${process.env.API_TRELLO_URL}/checklists/${data.checklistId}/checkItems?name=${data.name}&key=${process.env.KEY}&token=${process.env.TOKEN}`,
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

  async getCheckItem(data: CreateCheckItemDTO) {
    return axios
      .get(
        `${process.env.API_TRELLO_URL}/checklists/${data.checklistId}?key=${process.env.KEY}&token=${process.env.TOKEN}`,
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }
}
