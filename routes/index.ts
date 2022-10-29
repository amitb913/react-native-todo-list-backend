import express from "express";

import { router as tasksRoutes } from "./tasks";
import { router as usersRoutes } from "./users";

export const constructorMethod = (app: express.Application): void => {
  app.use("/tasks", tasksRoutes);
  app.use("/users", usersRoutes);
  app.use("*", (req: express.Request, res: express.Response) => {
    res.sendStatus(404);
  });
};
