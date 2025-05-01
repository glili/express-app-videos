import express, { Express, Request, Response } from "express";
import { videosRouter } from "./videos/routers/videos.router";
import { testingRouter } from "./videos/routers/testing.routers";
import { setupSwagger } from './core/swagger/setup-swagger';
import { HttpStatus } from "./core/types/http-statuses";
// import { db } from "./db/in-memory.db";
// import { mapToVideoListOutput } from "./videos/routers/mappers/map-list-video-to-output";



export const setupApp = (app: Express) => {
  app.use(express.json());

  app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Video App!');
  });

  // app.get('/videos', (req: Request, res: Response) => {
  //  // console.log('GET /videos endpoint hit')

  //   const videos = mapToVideoListOutput(db.videos);
  //   res.status(200).json(videos);
  // });

  // app.get('/testing', (req: Request, res: Response) => {
  //   res.status(200).send('Testing route');
  // });

  // app.delete("/testing/all-data", (req, res) => {
  //   db.videos = [];
  //   res.sendStatus(HttpStatus.NoContent);
  // });


  app.use("/api/videos", videosRouter);
  app.use("/api/testing", testingRouter);

  setupSwagger(app);
  return app;

};