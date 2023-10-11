import { Module } from '@nestjs/common';
import { BoardModule } from './Boards/board.module';
import { ListModule } from './Lists/list.module';
import { CardModule } from './Cards/card.module';
import { ChecklistModule } from './Checklits/checklist.module';
import { PDFModule } from './PDF/pdf.module';

@Module({
  imports: [PDFModule, BoardModule, ListModule, CardModule, ChecklistModule]
})
export class AppModule {}
