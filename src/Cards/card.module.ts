import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { PDFModule } from 'src/PDF/pdf.module';
import { MulterModule } from '@nestjs/platform-express';

// CardModule
@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Diretório onde os arquivos serão salvos temporariamente
    }),
    PDFModule,
  ], // Certifique-se de que PDFModule está importado aqui
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
