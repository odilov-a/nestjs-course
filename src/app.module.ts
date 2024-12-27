import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PostsModule } from './posts/posts.module';
import { Counter } from './counter/schemas/counter.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    Counter,
    PostsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [MongooseModule],
})
export class AppModule { }