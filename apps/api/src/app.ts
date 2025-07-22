import cors from "cors";
import express from "express";

import { errorHandler } from './middlewares/errorHandler';
import authRoute from './routes/authRoute';
import roadRoute from './routes/roadRoute';
import searchRoute from './routes/searchRoute';
import userRoute from './routes/userRoute';
import reviewRoute from './routes/reviewRoute';
import spotRoute from './routes/spotRoute';

const app = express();

app
  .use(cors())
  .use(express.urlencoded({ extended: true }))
  .use(express.json())

  .get("/", (_, res) => {
    return res.json({ message: "서버 실행 완료" });
  })

  .use('/login', authRoute)
  .use('/users', userRoute)
  .use('/road', roadRoute)
  .use('/search', searchRoute)
  .use('/review', reviewRoute)
  .use('/spot', spotRoute)

  .use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`백엔드 서버 ${port}포트`);
});