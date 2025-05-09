import { Request, Response, Router } from 'express';
import { VideoInput } from '../dto/video.intput';
import { videoInputDtoValidation } from '../validation/videoInputDtoValidation';
import { HttpStatus } from '../../core/types/http-statuses';
import { createErrorMessages } from '../../core/utils/error.utils';
import { Video } from '../types/video';
import { db } from '../../db/in-memory.db';

export const videosRouter = Router({});

videosRouter
  .get('', (req: Request, res: Response) => {
    res.status(200).send(db.videos);
  })

  .get('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const video = db.videos.find((d) => d.id === id);

    if (!video) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ message: 'Video not found', field: 'id'  }]),
        );
      return;
    }
    res.status(200).send(video);
  })

  .post('', (req: Request<{}, {}, VideoInput>, res: Response) => {
    const errors = videoInputDtoValidation(req.body);

    if (errors.length > 0) {
      res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
      return;
    }

    const newVideo: Video = {
      id: db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 1,
      title: req.body.title,
      author: req.body.author,
      canBeDownloaded: false,
      minAgeRestriction: null,
      availableResolutions: req.body.availableResolutions,
      createdAt: new Date(Date.now()).toISOString(),
      publicationDate: new Date(Date.now() + 86400000).toISOString(),
    };
    db.videos.push(newVideo);
    res.status(HttpStatus.Created).send(newVideo);
  })

  .put(
    '/:id',(req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const index = db.videos.findIndex((v) => v.id === id);

      if (index === -1) {
        res
          .status(HttpStatus.NotFound)
          .send(
            createErrorMessages([
              { message: 'Video not found', field: 'id' },
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
      video.publicationDate = new Date().toISOString(),
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
          createErrorMessages([{ message: 'Video not found', field: 'id' }]),
        );
      return;
    }

    db.videos.splice(index, 1);
    res.sendStatus(HttpStatus.NoContent);
  });