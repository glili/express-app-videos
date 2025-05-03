import request from 'supertest';
import { setupApp } from '../../../../src/setup-app';
import express from 'express';
import { VideoInput } from '../../../../src/videos/dto/video.intput';
import { Resolution  } from '../../../videos/types/video';
import { HttpStatus } from '../../../../src/core/types/http-statuses';
import { ResourceType } from '../../../../src/core/types/resource-type';
import { describe } from 'node:test';

describe('Video API body validation check', () => {
  const app = express();
  setupApp(app);

  const correctTestVideoData: VideoInput = {
    type: ResourceType.Videos,
    attributes: {
        title: 'Master i Margarita',
        author: 'Bulgacov',
        canBeDownloaded: true,
        minAgeRestriction: 10,
        createdAt: '2023-08-01',
        publicationDate: '2023-08-02',
        availableResolutions: [Resolution.P360],
    },
  };

  beforeAll(async () => {
    await request(app)
      .delete('/api/testing/all-data')
      .expect(HttpStatus.NoContent);
  });

  it(`video should't be created when incorrect body passed; POST /api/videos'`, async () => {
    const invalidDataSet1 = await request(app)
      .post('/api/videos')
      .send({
        data: {
          ...correctTestVideoData,
          attributes: {
            ...correctTestVideoData.attributes,
            title: '   ',
            author: '    ',
            availableResolution: [' '],
          },
        },
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet1.body.errorMessages).toHaveLength(4);

    const invalidDataSet2 = await request(app)
      .post('/api/videos')
      .send({
        data: {
          ...correctTestVideoData,
          attributes: {
            ...correctTestVideoData.attributes,
            title: '', // empty string
            author: '', // empty string
            availableResolution: [], // empty array
          },
        },
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet2.body.errorMessages).toHaveLength(4);

    const invalidDataSet3 = await request(app)
      .post('/api/videos')
      .send({
        data: {
          ...correctTestVideoData,
          attributes: {
            ...correctTestVideoData.attributes,
            title: 'F', // to short
          },
        },
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet3.body.errorMessages).toHaveLength(1);

    // check nothing created
    const videoListResponse = await request(app).get('/api/videos');
    expect(videoListResponse.body.data).toHaveLength(0);
  });

  it('video shouldnt be created when incorrect data passed; PUT /api/videos/:id', async () => {
    const createdVideo= await request(app)
      .post('/api/videos')
      .send({ data: correctTestVideoData })
      .expect(HttpStatus.Created);

    const invalidDataSet1 = await request(app)
      .put(`/api/videos/${createdVideo.body.id}`)
      .send({
        data: {
          ...correctTestVideoData,
          attributes: {
            ...correctTestVideoData.attributes,
            title: '   ',
            author: '    ',
            availableResolution: [' '],
          },
        },
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet1.body.errorMessages).toHaveLength(4);

    const invalidDataSet2 = await request(app)
      .put(`/api/video/${createdVideo.body.id}`)
      .send({
        data: {
          ...correctTestVideoData,
          attributes: {
            ...correctTestVideoData.attributes,
            title: '', // empty string
            author: '', // empty string
            availableResolution: [], // empty array
          },
        },
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet2.body.errorMessages).toHaveLength(4);

    const invalidDataSet3 = await request(app)
      .put(`/api/videos/${createdVideo.body.id}`)
      .send({
        data: {
          ...correctTestVideoData,
          attributes: {
            ...correctTestVideoData.attributes,
            title: 'A', //too short
          },
        },
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet3.body.errorMessages).toHaveLength(1);

    const videoResponse = await request(app).get(
      `/api/videos/${createdVideo.body.id}`,
    );

    expect(videoResponse.body).toEqual({
      ...correctTestVideoData,
      id: createdVideo.body.id,
    });
  });

  it('video shoudnt when incorrect features passed; PUT /api/videos/:id', async () => {
    const {
      body: { id: createdVideoId },
    } = await request(app)
      .post('/api/videos')
      .send({ data: correctTestVideoData })
      .expect(HttpStatus.Created);

    await request(app)
      .put(`/api/videos/${createdVideoId}`)
      .send({
        data: {
          ...correctTestVideoData,
          attributes: {
            ...correctTestVideoData.attributes,
            availableResolutions: [
              Resolution,
              
            ],
          },
        },
      })
      .expect(HttpStatus.BadRequest);

    const videoResponse = await request(app).get(
      `/api/videos/${createdVideoId}`,
    );

    expect(videoResponse.body).toEqual({
      ...correctTestVideoData,
      id: createdVideoId,
    });
  });
});