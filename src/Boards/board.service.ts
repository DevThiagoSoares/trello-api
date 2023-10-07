import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  getBoard(): string {
    return 'Board!';
  }
}
