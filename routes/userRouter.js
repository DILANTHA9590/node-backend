import express from "express";
import {
  userCreation,
 
  loginUser,
  googleLogin,
  getUser,
  getUserData,
  updateUser,
  updateUserStatus,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/", userCreation);

userRouter.get("/getusers",getUserData)

userRouter.get("/", getUser);

userRouter.post("/login", loginUser);
userRouter.post("/google", googleLogin);

userRouter.put("/:email",updateUser);
userRouter.put("/:id",updateUser);


userRouter.put("/updateStatus/:userId", updateUserStatus);



export default userRouter;
