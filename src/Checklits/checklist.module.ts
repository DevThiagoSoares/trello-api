import { Module } from '@nestjs/common';
import { ChecklistController } from './checklist.controller';
import { ChecklistService } from './checklist.service';

@Module({
  imports: [],
  controllers: [ChecklistController],
  providers: [ChecklistService],
})
export class ChecklistModule {}
