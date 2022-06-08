import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';

@Injectable()
export class YoutubeService {
  private youtube = google.youtube('v3');
  private logger = new Logger(YoutubeService.name);

  constructor(private configService: ConfigService) {}

  async getVideoInfo(id: string) {
    try {
      const { data } = await this.youtube.videos.list({
        part: ['snippet'],
        id: [id],
        key: this.configService.get('YOUTUBE_API_KEY'),
      });

      const item = data.items[0];

      if (!item) {
        return undefined;
      }

      const { publishedAt, channelId, title, thumbnails, channelTitle } =
        item.snippet;

      return {
        id,
        channelId,
        title,
        thumbnails,
        channelTitle,
        publishedAt,
      };
    } catch (error) {
      this.logger.error(error);
      return undefined;
    }
  }

  async getPlaylistItems(playlistId: string, pageToken?: string) {
    try {
      const { data } = await this.youtube.playlistItems.list({
        part: ['snippet'],
        playlistId,
        key: this.configService.get('YOUTUBE_API_KEY'),
        pageToken,
        maxResults: 30,
      });

      const items = data.items.map((item) => {
        const {
          title,
          publishedAt,
          channelTitle,
          channelId,
          thumbnails,
          position,
          resourceId,
        } = item.snippet;

        return {
          id: resourceId.videoId,
          title,
          publishedAt,
          channelTitle,
          channelId,
          thumbnails,
          position,
        };
      });

      const { nextPageToken, prevPageToken } = data;

      return {
        items,
        nextPageToken,
        prevPageToken,
      };
    } catch (error) {
      this.logger.error(error);

      return { items: [] };
    }
  }
}
