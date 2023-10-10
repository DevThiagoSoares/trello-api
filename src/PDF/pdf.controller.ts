import { Controller, Post, Body } from '@nestjs/common';
import { generatePdfDTO } from './dto/pdf.dto';
import { PDFService } from './pdf.service';

@Controller('api/pdf')
export class PDFController {
  constructor(private readonly pdfService: PDFService) {}

  @Post()
  async generatePdf(@Body() data: generatePdfDTO) {
    await this.pdfService.generatePdf(data);
  }
}
