import { Controller, Post, Body } from '@nestjs/common';
import { PDFService } from './pdf.service';
import { Payload } from 'src/Cards/dto/createCard.dto';

@Controller('api/pdf')
export class PDFController {
  constructor(private readonly pdfService: PDFService) {}

  @Post()
  async generatePdf(@Body() data: Payload) {
    await this.pdfService.generatePdf(data);
  }
}
