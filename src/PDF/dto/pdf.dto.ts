import { Material } from 'src/Cards/dto/createCard.dto';

export interface generatePdfDTO {
  title: string;
  itens: Material[];
  gerente: string;
}
