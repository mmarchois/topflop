import 'dotenv/config';
import * as helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './AppModule';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('TopFlop')
    .addBearerAuth()
    .setDescription('Top or flop your work colleagues')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('_doc', app, document);

  await app.listen(process.env.PORT, process.env.HOST);
}
bootstrap();
