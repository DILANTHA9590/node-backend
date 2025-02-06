import express from "express";
import {
  userCreation,
 
  loginUser,
  googleLogin,
  getUser,
  getUserData,
  updateUser,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/", userCreation);

userRouter.get("/getusers",getUserData)

userRouter.get("/", getUser);

userRouter.post("/login", loginUser);
userRouter.post("/google", googleLogin);

userRouter.put("/:email",updateUser);



export default userRouter;
