import { Resolution } from '../types/video';
import { ResourceType } from '../../core/types/resource-type';

export type VideoInput = {
  type: ResourceType.Videos;
  attributes: {
    title: string;
    author: string;
    canBeDownloaded: boolean;  // Default: false
    minAgeRestriction: number | null;
    createdAt: string;
    publicationDate: string;
    availableResolutions: Resolution[];
  };
};
    // this is data we will be sent 