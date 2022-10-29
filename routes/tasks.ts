import express from "express";
import { taskMethods } from "../data";

export const router = express.Router();

router
  .route("/")
  .get(async (req: express.Request, res: express.Response) => {
    try {
      if (!req.query.id) throw "User id not provided";
      const taskList = await taskMethods.getAllTasks(req.query.id.toString());
      res.json(taskList);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .post(async (req: express.Request, res: express.Response) => {
    try {
      const newTask = await taskMethods.createTask(
        req.body.id,
        req.body.taskName
      );
      res.json(newTask);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .put(async (req: express.Request, res: express.Response) => {
    try {
      const updatedTask = await taskMethods.updateTask(
        req.body.id,
        req.body.taskName
      );
      res.json(updatedTask);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .delete(async (req: express.Request, res: express.Response) => {
    try {
      const deletedTask = await taskMethods.removeTask(req.body.id);
      res.json(deletedTask);
    } catch (e) {
      res.status(500).send(e);
    }
  });
