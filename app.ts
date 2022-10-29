import express from "express";
import { constructorMethod as configRoutes } from "./routes/index";

const app: express.Application = express();

app.use(express.json());

configRoutes(app);

const PORT: number = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
