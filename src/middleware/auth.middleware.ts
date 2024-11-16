// import { NextFunction, Request, Response } from "express";
// import { UserSessionController } from "../controllers/UserSessionController";

// export const validateSession = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   console.log(req.url);
//   const userSessionController = new UserSessionController();
//   if (req.url === "/user/login" || req.url === "/user/register") {
//     next();
//     return;
//   }
//   next();
//   // userSessionController.retrieveSession(req, res, next);
// };

// export const setCookies = (req: Request, res: Response, next: NextFunction) => {
//   const sessionKey = "hello";

//   res.cookie("sessionKey", sessionKey, {
//     secure: process.env.NODE_ENV !== "development",
//     httpOnly: true,
//     expires: new Date("11/8/2024"),
//   });

//   next();
// };
