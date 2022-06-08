import { Injectable } from '@nestjs/common';
import { YoutubeService } from 'src/youtube/youtube.service';

@Injectable()
export class PlaylistsService {
  constructor(private youtubeService: YoutubeService) {}

  async items(playlistId: string, pageToken?: string) {
    const response = await this.youtubeService.getPlaylistItems(
      playlistId,
      pageToken,
    );

    return response;
  }
}
