import express, { NextFunction, Request, Response } from "express";
import { profileRouter, skillRouter, userRouter } from "./routes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { bodyValidationMiddleware, validateSessionMiddleware } from "./middleware";
import { HTTP_RESPONSE_CODE } from "./error-handling";
import { config } from "dotenv";
import cors from 'cors';

config();

const app = express();
const port = process.env.PORT;
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors());
app.use(jsonParser);
app.use(urlencodedParser);
app.use(cookieParser());
app.set("trust proxy", true);

// Middleware
app.use(bodyValidationMiddleware);
app.use(validateSessionMiddleware);

// Routers
app.use("/user", userRouter);
app.use("/profile", profileRouter);
app.use("/skill", skillRouter);

app.get("/ping", (req: Request, res: Response, next: NextFunction) => {
  res.status(HTTP_RESPONSE_CODE.SUCCESS).send("pong");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
