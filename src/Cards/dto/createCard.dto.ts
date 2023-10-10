export interface CreateCardDTO {
  name: string;
  desc: string;
  idList: string;
}

export interface CreateAttachmentCardDTO {
  name?: string;
  file?: string;
}

export interface UpdateCardDTO {
  name?: string;
  desc?: string;
  idList?: string;
}
