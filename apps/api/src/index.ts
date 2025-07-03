import cors from "cors";
import express from "express";

const app = express();
app
  .use(cors())
  .use(express.urlencoded({ extended: true }))
  .use(express.json())

  .get("/", (_, res) => {
    return res.json({ message: "서버 실행 완료" });
  });

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`백엔드 서버 ${port}포트`);
});
