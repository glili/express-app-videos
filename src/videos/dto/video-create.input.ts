import { Resolution } from '../types/video';

export type VideoCreateInput = {
    title: string;
    author: string;
    availableResolutions: Resolution[];
};
    // this is data we will be sent  