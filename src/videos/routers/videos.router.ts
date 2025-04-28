import { Request, Response, Router } from 'express';
import { VideoInput } from '../vto/video.intput';
import { videoInputVtoValidation } from '../validation/videoInputVtoValidation';
import { HttpStatus } from '../../core/types/http-statuses';
import { createErrorMessages } from '../../core/utils/error.utils';
import { Video } from '../types/video';
import { db } from '../../db/in-memory.db';
import { mapToVideoListOutput } from './mappers/map-list-video-to-output';
import { mapToVideoOutput } from './mappers/map-video-to-output';
import { VideoUpdateInput } from '../vto/video-update.input';
import { VideoListOutput } from '../vto/video-list.output';
import { VideoCreateInput } from '../vto/video-create.input';

export const videosRouter = Router({});

videosRouter
  .get('', (req: Request, res: Response<VideoListOutput>) => {
    const videos = mapToVideoListOutput(db.videos);
    res.status(200).send(videos);
  })

  // .get("/videos", (req: Request, res: Response) => {
  //   console.log('GET /videos endpoint hit')
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
    const errors = videoInputVtoValidation(req.body.data);

    if (errors.length > 0) {
      res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
      return;
    }

    const { title, author, canBeDownloaded, minAgeRestriction, createdAt, publicationDate, availableResolutions } = req.body.data.attributes;
    const newVideo: Video = {
      id: new Date().getTime(),
      title: req.body.data.attributes.title,
      author: req.body.data.attributes.author,
      canBeDownloaded: req.body.data.attributes.canBeDownloaded,
      minAgeRestriction: req.body.data.attributes.minAgeRestriction,
      availableResolutions: req.body.data.attributes.availableResolutions,
      createdAt: req.body.data.attributes.createdAt,
      publicationDate: req.body.data.attributes.publicationDate,
    };
    db.videos.push(newVideo);
    const mappedVideo = mapToVideoOutput(newVideo);
    res.status(HttpStatus.Created).send(mappedVideo);
  })

  .put(
    '/:id',
    (req: Request<{ id: string }, {}, VideoUpdateInput>, res: Response) => {
      console.log('in put: ', req.body.data);
      const id = parseInt(req.params.id);
      const index = db.videos.findIndex((v) => v.id === id);

      if (index === -1) {
        res
          .status(HttpStatus.NotFound)
          .send(
            createErrorMessages([
              { field: 'id', message: 'Vehicle not found' },
            ]),
          );
        return;
      }

      const errors = videoInputVtoValidation(req.body.data);

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
          createErrorMessages([{ field: 'id', message: 'Vehicle not found' }]),
        );
      return;
    }

    db.videos.splice(index, 1);
    res.sendStatus(HttpStatus.NoContent);
  });