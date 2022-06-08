import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { YoutubeModule } from 'src/youtube/youtube.module';

@Module({
  imports: [YoutubeModule],
  providers: [VideosService],
  controllers: [VideosController],
})
export class VideosModule {}
