import app from '../src/index';
import { NowRequest, NowResponse } from '@vercel/node'; // optional types

export default (req: any, res: any) => {
  app(req, res);
};
