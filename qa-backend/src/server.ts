require("dotenv").config();
import express from "express";
import cors from "cors";
import { myDataSource } from "./data-source";
import { logger } from "./lib";
import { api } from "./routes/api.routes";
import path from "path";

const app = express();
app.use(cors());

app.use(
  express.static(path.join(__dirname, "..", "..", "qa-frontend", "build"))
);

app.use(express.json());

// routes => domain.com/api/dynamicRoutes
app.use("/", api);

app.get("/*", (_, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "qa-frontend", "build", "index.html")
  );
});

const PORT = process.env.PORT || 1111;
myDataSource
  .initialize()
  .then(() => {
    // start application after connection with database!
    app.listen(PORT, () => {
      logger.info(`🚀 app is running on PORT => ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error("Error while connecting with database", err);
  });

export { app };
