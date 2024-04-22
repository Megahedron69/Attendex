import express from "express";
import dotenv from "dotenv";
import spdy from "spdy";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import csurf from "tiny-csrf";
import permissionsPolicy from "permissions-policy";
import easyWaf from "easy-waf";
import fs from "fs";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";
import dbRoutes from "./routes/dbRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import smartRoutes from "./routes/smartRoutes.js";
import { generalLimiter, authLimiter } from "./middleware/rateLimiter.js";
import loggerMiddleware from "./middleware/logger.js";
import { enforceHTTPS } from "./middleware/secRedirects.js";
import { charset } from "./middleware/charEncoding.js";
dotenv.config();

const port = process.env.portKey || 5000;
const app = express();

const options = {
  key:
    process.env.NODE_ENV === "development"
      ? fs.readFileSync("attendex.shop.key")
      : fs.readFileSync("privkey2.pem"),
  cert:
    process.env.NODE_ENV === "development"
      ? fs.readFileSync("attendex.shop.pem")
      : fs.readFileSync("cert2.pem"),
  ca:
    process.env.NODE_ENV === "development"
      ? fs.readFileSync("attendex.shop.crt")
      : fs.readFileSync("fullchain2.pem"),
  spdy: {
    plain: false,
    protocols: ["h2", "spdy/3.1", "spdy/2", "spdy/3", "http/1.1"],
    "x-forwarded-for": true,
    connection: {
      windowSize: 1024 * 1024, // Server's window size
      autoSpdy31: false,
    },
  },
};
app.use(
  helmet.hsts({
    maxAge: 15552000,
    includeSubDomains: true,
    preload: true,
  })
);
app.use(
  easyWaf({
    allowedHTTPMethods: ["GET", "POST", "OPTIONS"], //ALLOW MORE METHODS
    customBlockedPage: "<h1>REQUEST BLOCKED</h1>",
    ipBlacklist: [],
    dryMode: true,
  })
);
app.use(enforceHTTPS);
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
app.use(
  permissionsPolicy({
    features: {
      displayCapture: ["none"],
      serial: ["none"],
      usb: ["none"],
      executionWhileNotRendered: ["none"],
      executionWhileOutOfViewport: ["none"],
      syncScript: ["none"],
      syncXhr: ["none"],
      unsizedMedia: ["none"],
      interestCohort: ["none"],
      unoptimizedImages: ["none"],
      unoptimizedLosslessImages: ["none"],
      unoptimizedLossyImages: ["none"],
      accelerometer: ["self"],
      autoplay: ["self"],
      camera: ["self"],
      microphone: ["self"],
      geolocation: ["self"],
      notifications: ["self"],
    },
  })
);
// app.use(csurf(process.env.csrf_token, ["POST"]));
app.use(charset);
app.use(loggerMiddleware);
app.use(compression());
app.use(cors());
app.options("*", cors());
app.use("/api/V1", generalLimiter);
app.use("/api/V1/auth", authLimiter);
app.use(`/api/${process.env.API_V}`, dbRoutes);
app.use(`/api/${process.env.API_V}/auth`, authRoutes);
app.use(`/api/${process.env.API_V}/smart`, smartRoutes);
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

const server = spdy.createServer(options, app);
server.listen(port, () => {
  console.log(`All hands on port ${port}`);
});
