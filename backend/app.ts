import { NotFoundError } from "@common/exceptions";
import { asyncHandler, checkJwt, errorHandler } from "@common/middlewares";
import config from "@config";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as express from "express";
import helmet from "helmet";
import * as morgan from "morgan";
import * as swaggerUI from "swagger-ui-express";
import * as YAML from "yamljs";

import { authRouter } from "@auth";
import { tasksRouter } from "@tasks";
import { usersRouter } from "@user";
import * as path from "path";

const app = express();

app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(morgan("dev"));
app.use(helmet());

app.use(express.json());
app.use(cookieParser());

// Load the OpenAPI specification file
const openApiDocument = YAML.load(path.join(__dirname, "docs", "openapi.yaml"));
// Serve the Swagger
// UI at /docs
app.use("/docs", swaggerUI.serve, swaggerUI.setup(openApiDocument));
// misc routes
app.get("/healthz", (req, res) => {
  return res.json({
    version: "1.0.0",
    status: "ok",
    message: "Server is running",
    docs: "/docs",
  });
});

// routes
app.use(config.api.prefixPath + "/auth", authRouter);
app.use(config.api.prefixPath + "/tasks", [checkJwt], tasksRouter);
app.use(config.api.prefixPath + "/users", [checkJwt], usersRouter);

// handler for unknown route paths
app.use(
  "*",
  asyncHandler(async (req, res) => {
    throw new NotFoundError(`Route doesn't exists: ${req.path}`);
  })
);
// error handler routes
app.use(errorHandler);

export default app;
