import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService)
  const PORT = config.get("configuration.PORT")
  app.enableVersioning({ type: VersioningType.URI })  

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('')
    .setDescription('')
    .setVersion('1.0')
    .addTag('Routes')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api-docs', app, document)
  
  app.enableCors({ origin: '*' })
  app.useGlobalPipes(new ValidationPipe({}))
  app.enableVersioning({ type: VersioningType.URI })

  app.setGlobalPrefix('api/v1')
  
  await app.listen(PORT, () => {
    console.log(`🚀 Application running at port ${PORT}`)
  })
}
bootstrap();
