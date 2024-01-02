import express from "express";
import config from "./config";
import router from "./routes";

const app = express();
app.use(express.json());
app.use(router);

// app.get("/", (req, res) => {
//   res.json({ message: config.PORT });
// });

app.listen(config.PORT);
