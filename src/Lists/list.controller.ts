import { Body, Controller, Get, Post } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDTO } from './dto/createList.dto';

@Controller('api/list')
export class ListController {
  constructor(private readonly boardService: ListService) {}

  @Get()
  getAllList() {
    return this.boardService.getList();
  }

  @Post()
  createList(@Body() data: CreateListDTO) {
    return this.boardService.createList(data);
  }
}
