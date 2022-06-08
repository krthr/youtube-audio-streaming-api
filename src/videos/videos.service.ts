import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { YoutubeService } from 'src/youtube/youtube.service';
import ytAudioStream from 'youtube-audio-stream';
import { validateID } from 'ytdl-core';

@Injectable()
export class VideosService {
  private logger = new Logger(VideosService.name);

  constructor(private youtubeService: YoutubeService) {}

  async stream(id: string, res: Response) {
    const validId = validateID(id);

    if (!validId) {
      throw new BadRequestException();
    }

    try {
      const youtubeLink = `http://www.youtube.com/watch?v=${id}`;
      const stream: any = ytAudioStream(youtubeLink);

      this.logger.log(`streaming video ${id}`);

      for await (const chunk of stream) {
        res.write(chunk);
      }
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException();
    }

    res.end();
  }

  async info(id: string) {
    const videoInfo = await this.youtubeService.getVideoInfo(id);

    if (!videoInfo) {
      throw new NotFoundException();
    }

    return videoInfo;
  }
}
