"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const middleware_1 = require("./middleware");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const jsonParser = body_parser_1.default.json();
const urlencodedParser = body_parser_1.default.urlencoded({ extended: false });
app.use(jsonParser);
app.use(urlencodedParser);
app.use((0, cookie_parser_1.default)());
app.set("trust proxy", true);
// Middleware
app.use(middleware_1.bodyValidationMiddleware);
app.use(middleware_1.validateSessionMiddleware);
// Routers
app.use("/user", routes_1.userRouter);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
