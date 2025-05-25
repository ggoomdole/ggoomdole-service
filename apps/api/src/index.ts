import cors from "cors";
import express from "express";

const app = express();
app
  .use(cors())
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .get("/", (_, res) => {
    return res.json({ message: "Hello World" });
  });

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`api running on ${port}`);
});
