import { Video } from '../../types/video';
import { VideoOutput } from '../../vto/video.output';
import { ResourceType } from '../../../core/types/resource-type';

export const mapToVideoOutput = (video: Video): VideoOutput => {
  return {
    type: ResourceType.Videos,
    id: video.id.toString(),
    attributes: {
      title: video.title,
      author: video.author,
      canBeDownloaded: video.canBeDownloaded,
      minAgeRestriction: video.minAgeRestriction
        ? video.minAgeRestriction
        : null,
      createdAt: new Date(video.createdAt).toISOString(),
      publicationDate: new Date(video.publicationDate).toISOString(),
      availableResolutions: video.availableResolutions,
    },
  };
};