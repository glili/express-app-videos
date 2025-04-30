import express from "express";
import { setupApp } from "./setup-app";
import serverless from 'serverless-http'; 
 
const app = express();
setupApp(app);

const PORT = process.env.PORT || 3000;

//@ts-ignore
//app.get("/", (req, res) => res.send("Express on Vercel"));
// запуск приложения
// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`);
// });

export const handler = serverless(app);