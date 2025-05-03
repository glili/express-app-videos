export enum Resolution {
    P144 = 'p144',
    P240 = 'p240',
    P360 = 'p360',
    P480 = 'p480',
    P720 = 'p720',
    P1080 = 'p1080',
    P1440 = 'p1440',
    P2160 = 'p2160',
  };

  export type Video = {
    id: number;
    title: string;
    author: string;
    canBeDownloaded: boolean;  // Default: false
    minAgeRestriction: number | null;
    createdAt: string;
    publicationDate: string;
    availableResolutions: Resolution[];
  };