import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'node:path';
import * as YAML from 'json-to-pretty-yaml';

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

  const data = YAML.stringify(docs);
  fs.writeFile(path.resolve('./doc', 'api.yaml'), data, (err) => {
    if (err) console.log(err);
    else {
      console.log('api.yaml file has been updated successfully');
    }
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);
}
bootstrap();
