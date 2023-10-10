import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDTO, GetAllListDTO } from './dto/list.dto';

@Controller('api/list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  getAllList(@Body() data: GetAllListDTO) {
    return this.listService.getAllList(data);
  }

  @Get('all-cards/:id')
  getAllCardsInAList(@Param('id') id: string) {
    return this.listService.getAllCardInAList(id);
  }

  @Post()
  createList(@Body() data: CreateListDTO) {
    return this.listService.createList(data);
  }
}
