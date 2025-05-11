import { Request, Response, Router } from 'express';
import { VideoInput } from '../dto/video.intput';
import { videoInputDtoValidation } from '../validation/videoInputDtoValidation';
import { HttpStatus } from '../../core/types/http-statuses';
import { createErrorMessages } from '../../core/utils/error.utils';
import { Video } from '../types/video';
import { db } from '../../db/in-memory.db';
import { VideoUpdateInput } from '../dto/video-update.input.ts';
import { VideoCreateInput } from '../dto/video-create.input';
import { videoUpdateDtoValidation } from '../validation/videoUpdateDtoValidation';

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

  .post('', (req: Request<{}, {}, VideoCreateInput>, res: Response) => {
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
    '/:id',(req: Request<{id:string}, {}, VideoUpdateInput>, res: Response) => {
      const id = Number(req.params.id);
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

      const errors = videoUpdateDtoValidation(req.body);

      if (errors.length > 0) {
        res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
        return;
      }

      const video = db.videos[index];

      video.title = req.body.title;
      video.author = req.body.author;
      video.canBeDownloaded = req.body.canBeDownloaded;
      video.minAgeRestriction = req.body.minAgeRestriction;
      video.publicationDate = new Date(Date.now() + 86400000).toISOString()
      video.availableResolutions = req.body.availableResolutions;

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