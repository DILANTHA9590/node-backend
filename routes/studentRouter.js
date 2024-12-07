import express from "express";
// import Student from "../modules/students.js";
import {
  getStudent,
  createStudent,
  deleteStudent,
} from "../controller/studentController.js";

const studentRouter = express.Router();

studentRouter.get("/", getStudent);

studentRouter.post("/", createStudent);

studentRouter.delete("/", deleteStudent);

export default studentRouter;
