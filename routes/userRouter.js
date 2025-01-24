import express from "express";
import {
  userCreation,
  getuser,
  loginUser,
  googleLogin,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/", userCreation);

userRouter.get("/", getuser);

userRouter.post("/login", loginUser);
userRouter.post("/google", googleLogin);


export default userRouter;
