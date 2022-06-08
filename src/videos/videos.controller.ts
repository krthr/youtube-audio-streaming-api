import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { VideosService } from './videos.service';

@Controller('videos/:id')
export class VideosController {
  constructor(private videosService: VideosService) {}

  @ApiOkResponse({
    description: 'The stream started',
    headers: {
      'Transfer-Encoding': {
        schema: {
          type: 'string',
        },
        description: 'chunked',
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Video not found' })
  @Get('stream')
  stream(@Param('id') id: string, @Res() res: Response) {
    return this.videosService.stream(id, res);
  }

  @Get('info')
  info(@Param('id') id: string) {
    return this.videosService.info(id);
  }
}
