import { Body, Controller, Get } from '@nestjs/common';
import { BoardService } from './board.service';

@Controller('api/board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('test')
  getHello(): string {
    return this.boardService.getBoardTest();
  }
  @Get()
  getAllBoard() {
    return this.boardService.getBoard();
  }
}
