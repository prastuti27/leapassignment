import express from "express";
import config from "./config";
import router from "./routes";
import { logger } from "./middleware/logger";
import { genericErrorHandler, notFoundError } from "./middleware/errorHandler";

const app = express();
app.use(express.json());
app.use(router);
app.use(logger);
app.use(genericErrorHandler);

app.use(notFoundError);

// app.get("/", (req, res) => {
//   res.json({ message: config.PORT });
// });

app.listen(config.PORT, () => {
  console.log("server started!");
});
