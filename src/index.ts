import express from "express";
import { sessionRouter } from "./routes";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 3000;
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(jsonParser);
app.use(urlencodedParser);
app.use(cookieParser());
app.set('trust proxy', true)

// Middleware
// app.use(validateSession);

// Routers
app.use("/session", sessionRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});