import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDTO } from './dto/createBoard.dto';

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

  @Post()
  createBoard(@Body() data: CreateBoardDTO) {
    return this.boardService.createBoard(data);
  }
}
