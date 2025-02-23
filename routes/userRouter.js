import express from "express";
import {
  userCreation,
 
  loginUser,
  googleLogin,
  getUser,
  getUserData,
  updateUser,
  updateUserStatus,
  usersCount,
  deleteUser,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/", userCreation);

userRouter.get("/getusers",getUserData)

userRouter.get("/", getUser);

userRouter.post("/login", loginUser);
userRouter.post("/google", googleLogin);

userRouter.put("/:email",updateUser);
// userRouter.put("/:id",updateUser);


userRouter.put("/updateStatus/:userId", updateUserStatus);

userRouter.get("/usercount" ,usersCount);
userRouter.delete("/:_id",deleteUser);


export default userRouter;
