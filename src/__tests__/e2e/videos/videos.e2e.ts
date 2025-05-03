import request from 'supertest';
import express from 'express';
import { setupApp } from '../../../../src/setup-app';
import { VideoInput } from '../../../../src/videos/dto/video.intput';
import { HttpStatus } from '../../../../src/core/types/http-statuses';
import { Video, Resolution } from '../../../../src/videos/types/video';
import { ResourceType } from '../../../../src/core/types/resource-type';
import { VideoUpdateInput } from '../../../../src/videos/dto/video-update.input';
import { VideoOutput } from '../../../../src/videos/dto/video.output';
import { describe } from 'node:test';

describe('Video API', () => {
  const app = express();
  setupApp(app);

  const testVideoData: VideoInput = {
    type: ResourceType.Videos,
    attributes: {
        title: 'Master i Margarita',
        author: 'Bulgacov',
        canBeDownloaded: true,
        minAgeRestriction: 10,
        createdAt: '2023-08-01',
        publicationDate: '2023-08-01',
        availableResolutions: [],
    },
  };

  beforeAll(async () => {
    await request(app)
      .delete('/api/testing/all-data')
      .expect(HttpStatus.NoContent);
  });

  it('should create video; POST /api/videos', async () => {
    const newVideo: VideoInput = {
      ...testVideoData,
      attributes: {
        ...testVideoData.attributes,
        title: 'Fedor',
      },
    };

    await request(app)
      .post('/api/videos')
      .send({ data: newVideo })
      .expect(HttpStatus.Created);
  });

  it('should return videos list; GET /api/videos', async () => {
    const newVideo: VideoInput = {
      ...testVideoData,
      attributes: {
        ...testVideoData.attributes,
        title: 'Another Video1',
      },
    };
    const newVideo2: VideoInput = {
      ...testVideoData,
      attributes: {
        ...testVideoData.attributes,
        title: 'Another Video2',
      },
    };
    await request(app)
      .post('/api/videos')
      .send({ data: newVideo })
      .expect(HttpStatus.Created);

    await request(app)
      .post('/api/videos')
      .send({ data: newVideo2 })
      .expect(HttpStatus.Created);

    const videoListResponse = await request(app)
      .get('/api/videos')
      .expect(HttpStatus.Ok);

    expect(videoListResponse.body.data).toBeInstanceOf(Array);
    expect(videoListResponse.body.data.length).toBeGreaterThanOrEqual(2);
  });

  it('should return video by id; GET /api/videos/:id', async () => {
    const newVideo: VideoInput = {
      ...testVideoData,
      attributes: {
        ...testVideoData.attributes,
        title: 'Another Video3',
      },
    };
    const createResponse = await request(app)
      .post('/api/videos')
      .send({ data: newVideo })
      .expect(HttpStatus.Created);

    const getResponse = await request(app)
      .get(`/api/videos/${createResponse.body.id}`)
      .expect(HttpStatus.Ok);

    expect(getResponse.body).toEqual({
      ...createResponse.body,
    });
  });

  it('should update video; PUT /api/videos/:id', async () => {
    const newVideo: VideoInput = {
      ...testVideoData,
      attributes: {
        ...testVideoData.attributes,
        title: 'Another Video3',
      },
    };
    const createResponse = await request(app)
      .post('/api/videos')
      .send({ data: newVideo })
      .expect(HttpStatus.Created);
    console.log('createResponse:', createResponse.body);

    const videoUpdateData: VideoUpdateInput = {
      data: {
        id: createResponse.body.id,
        type: ResourceType.Videos,
        attributes: {
            title: 'Master i Margarita',
            author: 'Bulgacov',
            canBeDownloaded: true,
            minAgeRestriction: 10,
            createdAt: '2023-08-01',
            publicationDate: '2023-08-01',
            availableResolutions: [],
        },
      },
    };

    await request(app)
      .put(`/api/videos/${createResponse.body.id}`)
      .send(videoUpdateData)
      .expect(HttpStatus.NoContent);

    const videoResponse = await request(app).get(
      `/api/videos/${createResponse.body.id}`,
    );

    expect(videoResponse.body).toEqual({
      ...videoUpdateData.data,
    });
  });

  it('DELETE /api/videos/:id and check after NOT FOUND', async () => {
    const newVideo: VideoInput = {
      ...testVideoData,
      attributes: {
        ...testVideoData.attributes,
        title: 'Another Video4',
      },
    };
    const createResponse = await request(app)
      .post('/api/videos')
      .send({ data: newVideo })
      .expect(HttpStatus.Created);

    await request(app)
      .delete(`/api/videos/${createResponse.body.id}`)
      .expect(HttpStatus.NoContent);

    const videoResponse = await request(app).get(
      `/api/videos/${createResponse.body.id}`,
    );
    expect(videoResponse.status).toBe(HttpStatus.NotFound);
  });
});