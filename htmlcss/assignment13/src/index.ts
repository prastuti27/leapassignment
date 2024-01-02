import express from "express";
import config from "./config";
import router from "./routes";
import { requestLogger } from "./middleware/logger";

const app = express();
app.use(express.json());
app.use(router);
app.use(requestLogger);

// app.get("/", (req, res) => {
//   res.json({ message: config.PORT });
// });

app.listen(config.PORT, () => {
  console.log("server started!");
});
