import { Request, Response, Router } from 'express';
import { VideoInput } from '../dto/video.intput';
import { videoInputDtoValidation } from '../validation/videoInputDtoValidation';
import { HttpStatus } from '../../core/types/http-statuses';
import { createErrorMessages } from '../../core/utils/error.utils';
import { Video } from '../types/video';
import { db } from '../../db/in-memory.db';
import { mapToVideoListOutput } from './mappers/map-list-video-to-output';
import { mapToVideoOutput } from './mappers/map-video-to-output';
import { VideoUpdateInput } from '../dto/video-update.input';
import { VideoListOutput } from '../dto/video-list.output';
import { VideoCreateInput } from '../dto/video-create.input';

export const videosRouter = Router({});

videosRouter
  .get('', (req: Request, res: Response<VideoListOutput>) => {
    const videos = mapToVideoListOutput(db.videos);
    res.status(200).send(videos);
  })

  // .get("/videos", (req: Request, res: Response) => {
  //   const videos = mapToVideoListOutput(db.videos);
  //   res.status(200).json(videos);
  // })

  .get('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const video = db.videos.find((d) => d.id === id);

    if (!video) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: 'id', message: 'Video not found' }]),
        );
      return;
    }
    res.status(200).send(mapToVideoOutput(video));
  })

  .post('', (req: Request<{}, {}, VideoCreateInput>, res: Response) => {
    const errors = videoInputDtoValidation(req.body.data);

    if (errors.length > 0) {
      res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
      return;
    }

    const newVideo: Video = {
      id: db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 1,
      title: req.body.data.attributes.title,
      author: req.body.data.attributes.author,
      canBeDownloaded: req.body.data.attributes.canBeDownloaded,
      minAgeRestriction: req.body.data.attributes.minAgeRestriction,
      availableResolutions: req.body.data.attributes.availableResolutions,
      createdAt: new Date().toISOString(),
      publicationDate: new Date(Date.now() + 86400000).toISOString(),
    };
    db.videos.push(newVideo);
    const mappedVideo = mapToVideoOutput(newVideo);
    res.status(HttpStatus.Created).send(mappedVideo);
  })

  .put(
    '/:id',
    (req: Request<{ id: string }, {}, VideoUpdateInput>, res: Response) => {
      // console.log('in put: ', req.body.data);
      const id = parseInt(req.params.id);
      const index = db.videos.findIndex((v) => v.id === id);

      if (index === -1) {
        res
          .status(HttpStatus.NotFound)
          .send(
            createErrorMessages([
              { field: 'id', message: 'Video not found' },
            ]),
          );
        return;
      }

      const errors = videoInputDtoValidation(req.body.data);

      if (errors.length > 0) {
        res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
        return;
      }

      const video = db.videos[index];

      video.title = req.body.data.attributes.title;
      video.author = req.body.data.attributes.author;
      video.canBeDownloaded = req.body.data.attributes.canBeDownloaded;
      video.minAgeRestriction = req.body.data.attributes.minAgeRestriction;
      video.availableResolutions = req.body.data.attributes.availableResolutions;

      res.sendStatus(HttpStatus.NoContent);
    },
  )

  .delete('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);


    const index = db.videos.findIndex((v) => v.id === id);

    if (index === -1) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: 'id', message: 'Video not found' }]),
        );
      return;
    }

    db.videos.splice(index, 1);
    res.sendStatus(HttpStatus.NoContent);
  });