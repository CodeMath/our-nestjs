import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerService } from './logger/logger.service';
// import { MyLogger } from './custom-logger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule , {
    bufferLogs: true,
  });
  app.useLogger(app.get(LoggerService));
  
  const config = new DocumentBuilder()
  .setTitle("Users API")
  .setDescription("This is Users REST API")
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.listen(3000);
}
bootstrap();
