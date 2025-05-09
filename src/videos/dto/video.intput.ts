import { Resolution } from '../types/video';

export type VideoInput = {

    title: string;
    author: string;
    // canBeDownloaded: boolean;  // Default: false
    // minAgeRestriction: number | null;
    // createdAt: string;
    // publicationDate: string;
    availableResolutions: Resolution[];
};
    // this is data we will be sent  