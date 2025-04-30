import { VideoOutput } from './video.output';
import { ResourceType } from '../../core/types/resource-type';
import { Resolution } from '../types/video';

export type VideoListOutput = {
  meta: {};
  data: {
    type: ResourceType.Videos;
    id: string;
    attributes: {
        title: string;
        author: string;
        canBeDownloaded: boolean;  // Default: false
        minAgeRestriction: number | null;
        createdAt: string;
        publicationDate: string;
        availableResolutions: Resolution[];
    };
  }[];
};