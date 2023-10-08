export interface CreateChecklistDTO {
  name: string;
  cardId: string;
}

export interface CreateCheckItemDTO {
  name?: string;
  checklistId: string;
}
