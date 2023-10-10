import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { PDFModule } from 'src/PDF/pdf.module';

// CardModule
@Module({
  imports: [PDFModule], // Certifique-se de que PDFModule está importado aqui
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
