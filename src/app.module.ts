import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { VideosModule } from './videos/videos.module';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
import { PlaylistsModule } from './playlists/playlists.module';
import { YoutubeModule } from './youtube/youtube.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'client') }),

    PlaylistsModule,
    VideosModule,
    YoutubeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
