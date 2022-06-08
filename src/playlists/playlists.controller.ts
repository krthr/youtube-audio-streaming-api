import { Controller, Get, Param, Query } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';

@Controller('playlists/:id')
export class PlaylistsController {
  constructor(private playlistsService: PlaylistsService) {}

  @Get('/')
  items(@Param('id') id: string, @Query('pageToken') pageToken?: string) {
    return this.playlistsService.items(id, pageToken);
  }
}
