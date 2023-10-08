import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChecklistService } from './checklist.service';
import { CreateCheckItemDTO, CreateChecklistDTO } from './dto/checklist.dto';

@Controller('api/checklist')
export class ChecklistController {
  constructor(private readonly checklistService: ChecklistService) {}

  @Post()
  createChecklist(@Body() data: CreateChecklistDTO) {
    return this.checklistService.createChecklist(data);
  }

  @Post('check-item')
  createCheckItem(@Body() data: CreateCheckItemDTO) {
    return this.checklistService.createCheckItem(data);
  }

  @Get()
  getCheckItem(@Body() data: CreateCheckItemDTO) {
    return this.checklistService.getCheckItem(data);
  }
}
