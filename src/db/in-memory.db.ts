import { Video, Resolution } from '../videos/types/video';


export const db = {
    videos: <Video[]>[
        {
            id: 1,
            title: 'Voina i mir',
            author: 'Tolstoi',
            canBeDownloaded: false,
            minAgeRestriction: 18,
            createdAt: '2023-07-01',
            publicationDate: '2023-07-02',
            availableResolutions: [Resolution.P144],
        },
        {
            id: 2,
            title: 'Tihii Don',
            author: 'Sholohov',
            canBeDownloaded: false,
            minAgeRestriction: 16,
            createdAt: '2023-09-01',
            publicationDate: '2023-09-02',
            availableResolutions: [Resolution.P360],
        },
        {
            id: 3,
            title: 'Master i Margarita',
            author: 'Bulgacov',
            canBeDownloaded: true,
            minAgeRestriction: 10,
            createdAt: '2023-08-01',
            publicationDate: '2023-08-02',
            availableResolutions: [Resolution.P1080],
        },
    ],
};