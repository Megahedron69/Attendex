import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import cors from "cors";
import csurf from "tiny-csrf";
import fs from "fs";
import https from "https";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";
import mongoRoutes from "./routes/mongoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connectToMyDB } from "./config/mongoConfig.js";
import { generalLimiter, authLimiter } from "./middleware/rateLimiter.js";
import passport from "./config/passport.js";
dotenv.config();

const port = process.env.portKey || 5000;
const app = express();
const options = {
  key: fs.readFileSync("cert.key"),
  cert: fs.readFileSync("cert.crt"),
  ca: fs.readFileSync("ca.crt"),
};
app.use(helmet());
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("cookie-parser-secret"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.session_key,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: "auto" },
  })
);
// app.use(csurf(process.env.csrf_token, ["POST"]));
app.use(compression());
app.use(mongoSanitize());
app.use(cors());
app.options("*", cors());
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", generalLimiter);
app.use("/auth", authLimiter);
app.use("/mongo", mongoRoutes);
app.use("/auth", authRoutes);
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});
app.use((req, res, next) => {
  if (req.originalUrl.includes("favicon.ico")) {
    res.status(204).end();
  }
  next();
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.name === "HTTPError") {
    return res.status(err.statusCode).send(err.message);
  }
  res.status(500).send("Something broke!");
});

connectToMyDB();
const server = https.createServer(options, app);
server.listen(port, () => {
  console.log(`All hands on port ${port}`);
});
