import { Video, Resolution } from '../videos/types/video';


export const db = {
    videos: <Video[]>[
        {
            id: 1,
            title: 'Voina i mir',
            author: 'Tolstoi',
            canBeDownloaded: false,
            minAgeRestriction: 18,
            createdAt: '2023',
            publicationDate: '2024',
            availableResolutions: [],
        },
        {
            id: 2,
            title: 'Tihii Don',
            author: 'Sholohov',
            canBeDownloaded: false,
            minAgeRestriction: 16,
            createdAt: '2025',
            publicationDate: '2025',
            availableResolutions: [],
        },
        {
            id: 3,
            title: 'Master i Margarita',
            author: 'Bulgacov',
            canBeDownloaded: true,
            minAgeRestriction: 10,
            createdAt: '2023',
            publicationDate: '2023',
            availableResolutions: [],
        },
    ],
};