import express from "express";
import {
  userCreation,
  getuser,
  loginUser,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/", userCreation);

userRouter.get("/", getuser);

userRouter.post("/login", loginUser);

export default userRouter;
