import * as dotenv from "dotenv";

dotenv.config();

const config = {
  server: {
    port: +(process.env.PORT || 5000),
    host: process.env.HOST || "localhost",
  },
  log: {
    level: process.env.LOG_LEVEL || "debug",
    filepath: process.env.LOG_FILE_PATH || "./logs/",
    filename: process.env.LOG_FILE_NAME || "workflo_server.log",
  },
  db: {
    url: process.env.MONGODB_URL || "mongodb://localhost:27017/workflo",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  cookie: {
    maxAge: +(process.env.COOKIE_MAX_DAYS || 30) * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  },
  api: {
    prefixPath: "/api",
  },
  bcrypt: {
    saltRounds: 10,
  },
};

export default config;
