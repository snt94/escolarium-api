import { INestApplication, ValidationPipe } from "@nestjs/common"
import { AppModule } from "../src/app.module";
import { Test } from '@nestjs/testing'

describe('Escolarium e2e', () => {

  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),

    );
    await app.init()
  });
  
  afterAll(() => {
    app.close();
  });
  
  it.todo('Teste completo com sucesso');
});