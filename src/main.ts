import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'node:path';
import * as YAML from 'json-to-pretty-yaml';
import { CustomExceptionFilter } from './logger/exception.filter';
import { CustomLogger } from './logger/logs.service';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const docsConfig = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0.0')
    .addServer(`http://localhost:${PORT}`)
    .addBearerAuth()
    .build();
  const docs = SwaggerModule.createDocument(app, docsConfig);
  SwaggerModule.setup('/doc', app, docs);

  const data = YAML.stringify(docs);
  fs.writeFile(path.resolve('./doc', 'api.yaml'), data, (err) => {
    if (err) console.log(err);
    else {
      console.log('api.yaml file has been updated successfully');
    }
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new CustomExceptionFilter());

  listenErrors();

  await app.listen(PORT);
}
bootstrap();

function listenErrors() {
  const logger = new CustomLogger();

  process.on('uncaughtExceptionMonitor', () => {
    logger.error('There was an uncaught error');
    process.exit(1);
  });

  process.on('unhandledRejection', () => {
    logger.error('There was an unhandled promise rejection');
  });
}
