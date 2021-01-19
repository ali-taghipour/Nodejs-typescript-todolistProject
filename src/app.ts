import express from "express";
import todosRouter from "./routes/todos";
import bodyParseer from "body-parser";

const app = express();
app.use(bodyParseer.json())

app.use(todosRouter);

app.listen(3000);