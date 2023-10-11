import { Injectable } from '@nestjs/common';
import * as ejs from 'ejs';
import * as fs from 'fs';
import * as pdf from 'html-pdf';
import { Payload } from 'src/Cards/dto/createCard.dto';

@Injectable()
export class PDFService {
  async generatePdf(data: Payload): Promise<string> {
    return new Promise(async (resolve) => {
      try {
        const ejsTemplatePath = 'src/Utils/templates/index.ejs';
        const imageFilePath = 'src/Utils/templates/logo_ICTS.jpg';

        // Certifique-se de que os arquivos existam
        if (!fs.existsSync(ejsTemplatePath) || !fs.existsSync(imageFilePath)) {
          return;
          new Error('O modelo EJS ou a imagem não foram encontrados.');
        }

        const imageBase64 = fs.readFileSync(imageFilePath, 'base64');

        data.imagePath = imageBase64;

        // Carregue o arquivo EJS
        const ejsTemplate = await ejs.renderFile(
          'src/Utils/templates/index.ejs',
          data
        );

        const options: pdf.CreateOptions = {
          format: 'Letter',
          orientation: 'portrait',
          border: '10mm'
        };

        // Converta o HTML para PDF
        pdf
          .create(ejsTemplate, options)
          .toFile('./uploads/pedido.pdf', (err, res) => {
            if (err) {
              return err;
            } else {
              resolve(res.filename);
            }
          });
      } catch (error) {
        return error;
      }
    });
  }
}
