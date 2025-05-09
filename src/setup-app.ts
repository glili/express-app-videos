import express, { Express, Request, Response } from "express";
import { videosRouter } from "./videos/routers/videos.router";
import { testingRouter } from "./videos/routers/testing.routers";

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Video App!');
  });

  app.use("/videos", videosRouter);
  app.use("/testing", testingRouter);
  
  return app;

};