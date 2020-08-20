import {NestFactory} from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {ValidationPipe} from '@nestjs/common';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import {AppModule} from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();

  app.use(
    rateLimit({
      windowMs: 10 * 60 * 100, // 1 minute
      max: 100
    })
  );
  app.useGlobalPipes(new ValidationPipe({transform: true}));

  const options = new DocumentBuilder()
    .setTitle('TopFlop')
    .addBearerAuth()
    .setDescription('Top or flop your work colleagues')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('_doc', app, document);

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
