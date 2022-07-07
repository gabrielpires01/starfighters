import cors from "cors";
import express, { json } from "express";
import "express-async-errors";
import "./config/config.js"
import handleErrors from "./handleError.js";
import router from "./router.js";

const app = express();
app.use(cors())
app.use(json());
app.use(router);
app.use(handleErrors);

const port: number = +process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
