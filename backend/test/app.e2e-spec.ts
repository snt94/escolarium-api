import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Escolarium e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService; // TEMPORÁRIO -- Retirar quando implementar volume Docker de teste

  const authDto = { // Objeto de usuário fictício
    email: 'teste@email.com',
    password: '123456',
    schoolId: '6e4be9d1-a84e-4fc7-98c9-8add04f2729c',
  };

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

    await app.init();
    await app.listen(3000);

    prisma = app.get(PrismaService);

    pactum.request.setBaseUrl('http://localhost:3000');
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Auth - Signup', () => {
    it('deve cadastrar um novo usuário', async () => {
      await pactum
        .spec()
        .post('/auth/signup')
        .withBody(authDto)
        .expectStatus(201)
        .stores('userAccessToken', 'access_token') // armazena token para próximos testes
        .expectJsonLike({
          access_token: /.*/,
        });
    });

    it('deve falhar ao tentar cadastrar com email já existente', async () => {
      await pactum
        .spec()
        .post('/auth/signup')
        .withBody(authDto)
        .expectStatus(403)
        .expectBodyContains('Este email já está sendo usado');
    });

    it('deve falhar ao enviar dados inválidos', async () => {
      await pactum
        .spec()
        .post('/auth/signup')
        .withBody({ email: 'a', password: '' }) // faltando schoolId
        .expectStatus(400);
    });
  });

  describe('Auth - Signin', () => {
    it('deve fazer login com sucesso', async () => {
      await pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          email: authDto.email,
          password: authDto.password,
        })
        .expectStatus(201)
        .stores('userAccessToken', 'access_token') // reusa token mais adiante se quiser
        .expectJsonLike({
          access_token: /.*/,
        });
    });

    it('deve falhar com senha errada', async () => {
      await pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          email: authDto.email,
          password: 'senha_errada',
        })
        .expectStatus(403)
        .expectBodyContains('Credenciais incorretas');
    });

    it('deve falhar com email inexistente', async () => {
      await pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          email: 'naoexiste@email.com',
          password: '123456',
        })
        .expectStatus(403)
        .expectBodyContains('Credenciais incorretas');
    });
  });

  // Exemplo: rota protegida
  describe('Users - /me', () => {
    it('deve retornar os dados do usuário autenticado', async () => {
      await pactum
        .spec()
        .get('/users/me')
        .withBearerToken('$S{userAccessToken}')  // token armazenado anteriormente
        .expectStatus(200);
    });

    it('deve falhar sem token', async () => {
      await pactum
        .spec()
        .get('/users/me')
        .expectStatus(401);
    });
  });

  describe('Cleanup - Usuário de teste', () => {
    it('deve deletar o usuário criado no teste', async () => {
      await prisma.user.delete({
        where: { email: authDto.email },
      });
    });
  });
});