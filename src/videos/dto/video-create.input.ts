import { Resolution } from '../types/video';
import { ResourceType } from '../../core/types/resource-type';

export type VideoCreateInput = {
  data: {
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
};