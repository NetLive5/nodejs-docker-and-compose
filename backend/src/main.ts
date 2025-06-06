import * as dotenv from 'dotenv';
dotenv.config();

import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			forbidNonWhitelisted: true,
		})
	);

	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

	app.enableCors({
		origin: process.env.FRONTEND_URL || '*',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true,
	});

	await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
