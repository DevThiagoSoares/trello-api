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

interface Project {
  requester: string;
  projectName: string;
  coastCenter: string;
  subsidiary: string;
  priority: string;
}

export interface Material {
  quantity: number;
  Und: string;
  description: string;
  unitaryValue: number;
  purchaseLink: string;
}

export interface Payload {
  imagePath: string;
  projectLeader: string;
  projectManager: string;
  technicalNanager: string;
  email: string;
  justification: string;
  project: Project;
  materialList: Material[];
}
