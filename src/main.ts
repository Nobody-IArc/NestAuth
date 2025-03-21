import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // 유효성 검증을 위한 파이프 모듈
import cookieParser from 'cookie-parser'; // 요청 헤더의 쿠키를 읽기 위한 모듈

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 전역 파이프 설정
  app.use(cookieParser()); // cookie-parser 사용
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
