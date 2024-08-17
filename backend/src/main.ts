import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PATH_TO_DOCS, TONPROOF_PAYLOAD_SIGNATURE_KEY } from './constants';

async function bootstrap() {
    const PORT = process.env.PORT || 5000;
    console.log(TONPROOF_PAYLOAD_SIGNATURE_KEY)
    
    const app = await NestFactory.create(AppModule, );
    app.enableCors({
      origin: "*", 
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 200,
      allowedHeaders: "*",
    });

    const config = new DocumentBuilder()
      .setTitle("Valton")
      .setDescription("Маркетплейс-НФТ")
      .setVersion('0.0.1')
      .build()
    const document = SwaggerModule.createDocument(app, config);
    
    SwaggerModule.setup(PATH_TO_DOCS, app, document)
    
    await app.listen(PORT);
}
bootstrap();