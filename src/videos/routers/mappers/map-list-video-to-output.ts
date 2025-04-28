import { Video } from '../../types/video';
import { ResourceType } from '../../../core/types/resource-type';
import { VideoListOutput } from '../../vto/video-list.output';

export const mapToVideoListOutput = (videos: Video[]): VideoListOutput => {
  return {
    meta: {},
    data: videos.map((video: Video) => ({
      type: ResourceType.Videos,
      id: video.id.toString(),
      attributes: {
        title: video.title,
        author: video.author,
        canBeDownloaded: video.canBeDownloaded,
        minAgeRestriction: video.minAgeRestriction
          ? video.minAgeRestriction
          : null,
        createdAt: video.createdAt,
        publicationDate: video.publicationDate,
        availableResolutions: video.availableResolutions,
        },
    })),
  };
};