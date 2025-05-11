import { Resolution } from '../types/video';

export type VideoOutput = {

    title: string;
    author: string;
    canBeDownloaded: boolean;  // Default: false
    minAgeRestriction: number | null;
    createdAt: string;
    publicationDate: string;
    availableResolutions: Resolution[];
};