import { Video, Resolution } from '../videos/types/video';


export const db = {
    videos: <Video[]>[
        {
            id: 1,
            title: 'Voina i mir',
            author: 'Tolstoi',
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: '2023-07-01T00:00:00.000Z',
            publicationDate: '2023-07-02T00:00:00.000Z',
            availableResolutions: [Resolution.P144],
        },
        {
            id: 2,
            title: 'Tihii Don',
            author: 'Sholohov',
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: '2023-07-01T00:00:00.000Z',
            publicationDate: '2023-07-02T00:00:00.000Z',
            availableResolutions: [Resolution.P360],
        },
        {
            id: 3,
            title: 'Master i Margarita',
            author: 'Bulgacov',
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: '2023-07-01T00:00:00.000Z',
            publicationDate: '2023-07-02T00:00:00.000Z',
            availableResolutions: [Resolution.P1080],
        },
    ],
};