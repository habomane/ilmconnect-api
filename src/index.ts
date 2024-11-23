import express, { NextFunction, Request, Response } from "express";
import { userRouter } from "./routes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { bodyValidationMiddleware, validateSessionMiddleware } from "./middleware";
import { HTTP_RESPONSE_CODE } from "./error-handling";
import { config } from "dotenv";

config();

const app = express();
const port = process.env.PORT;
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(jsonParser);
app.use(urlencodedParser);
app.use(cookieParser());
app.set("trust proxy", true);

// Middleware
app.use(bodyValidationMiddleware);
app.use(validateSessionMiddleware);

// Routers
app.use("/user", userRouter);

app.get("/ping", (req: Request, res: Response, next: NextFunction) => {
  res.status(HTTP_RESPONSE_CODE.SUCCESS).send("pong");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
