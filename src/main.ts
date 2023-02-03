import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const docsConfig = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0.0')
    .build();
  const docs = SwaggerModule.createDocument(app, docsConfig);
  SwaggerModule.setup('/doc', app, docs);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);
}
bootstrap();
