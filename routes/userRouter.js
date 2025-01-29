import express from "express";
import {
  userCreation,
 
  loginUser,
  googleLogin,
  getUser,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/", userCreation);

userRouter.get("/", getUser);

userRouter.post("/login", loginUser);
userRouter.post("/google", googleLogin);



export default userRouter;
