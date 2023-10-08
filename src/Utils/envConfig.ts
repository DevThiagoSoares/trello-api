import { z } from 'zod';

// Defina o esquema de validação para suas variáveis de ambiente
const envSchema = z.object({
  BACKEND_PORT: z.string().min(1, { message: 'Porta do backend' }),
  KEY: z.string().min(1, { message: 'Chave API do Trello' }),
  TOKEN: z.string().min(1, { message: 'Token API do Trello' }),
  API_TRELLO_URL: z.string().min(1, { message: 'URL API do Trello' }),
});
console.log(process.env.BACKEND_PORT);
// Função para carregar e validar as variáveis de ambiente
export function loadAndValidateEnv() {
  const env = {
    BACKEND_PORT: process.env.BACKEND_PORT,
    KEY: process.env.KEY,
    TOKEN: process.env.TOKEN,
    API_TRELLO_URL: process.env.API_TRELLO_URL,
  };

  try {
    const validatedEnv = envSchema.parse(env);
    console.log('Ambiente válido:', validatedEnv);
    return validatedEnv;
  } catch (error) {
    const errors = JSON.parse(error.message);
    throw new Error(
      `\n\nAs seguintes variáveis de ambiente não foram definidas no arquivo .env: \n${errors
        .map((e: any) => {
          return `\n${e.path} = <${
            e.unionErrors !== undefined
              ? e.unionErrors
                  .map((item: any) => item.issues.map((i: any) => i.expected))
                  .join(' | ')
              : e.expected ?? e.message
          }>`;
        })
        .join('')}\n`,
    );
  }
}
// export const env = loadAndValidateEnv();
