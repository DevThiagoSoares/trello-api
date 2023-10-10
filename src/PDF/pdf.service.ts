import { Injectable } from '@nestjs/common';
import * as ejs from 'ejs';
import * as pdf from 'html-pdf';
import { Payload } from 'src/Cards/dto/createCard.dto';

@Injectable()
export class PDFService {
  async generatePdf(data: Payload): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        // Carregue o arquivo EJS
        const ejsTemplate = await ejs.renderFile(
          'src/Utils/templates/index.ejs',
          data
        );

        const options: pdf.CreateOptions = {
          format: 'Letter',
          orientation: 'portrait'
        };

        // Converta o HTML para PDF
        pdf
          .create(ejsTemplate, options)
          .toFile('./uploads/pedido.pdf', (err, res) => {
            if (err) {
              reject(err);
            } else {
              resolve(res.filename);
            }
          });
      } catch (error) {
        reject(error);
      }
    });
  }
}
