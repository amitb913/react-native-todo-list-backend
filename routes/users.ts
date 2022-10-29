import express from "express";
import { userMethods } from "../data";
import bcrypt from "bcrypt";

export const router = express.Router();

router
  .route("/")
  .get(async (req: express.Request, res: express.Response) => {
    console.log("received");
    try {
      const user = await userMethods.authenticateUser(
        req.query.username?.toString(),
        req.query.password?.toString()
      );
      res.json(user);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  })
  .post(async (req: express.Request, res: express.Response) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = await userMethods.createUser(
        req.body.username,
        hashedPassword
      );
      res.json(newUser);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  });
