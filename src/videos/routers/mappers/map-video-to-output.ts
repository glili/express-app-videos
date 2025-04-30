import { Video } from '../../types/video';
import { VideoOutput } from '../../dto/video.output';
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
      createdAt: video.createdAt,
      publicationDate: video.publicationDate,
      availableResolutions: video.availableResolutions,
    },
  };
};