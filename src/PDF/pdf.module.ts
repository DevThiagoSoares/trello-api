import { Module } from '@nestjs/common';
import { PDFController } from './pdf.controller';
import { PDFService } from './pdf.service';

// PDFModule
@Module({
  imports: [],
  controllers: [PDFController],
  providers: [PDFService], // Certifique-se de que PDFService está listado aqui
  exports: [PDFService],
})
export class PDFModule {}
