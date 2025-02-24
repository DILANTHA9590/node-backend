import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import studentRouter from "./routes/studentRouter.js";

import userRouter from "./routes/userRouter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import productRouter from "./routes/productRouter.js";
import orderRouter from "./routes/orderRouter.js";
import cors from "cors";






dotenv.config();


const app = express();

app.use(cors())

const mongoUrl = process.env.MONGO_DB_URI 




mongoose.connect(mongoUrl, {});
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("database connetced");
});

app.use(bodyParser.json());

app.use((req, res, next) => {
 


  const token = req.header("Authorization")?.replace("Bearer ", ""); 

  


  
  if (token != null) {
    jwt.verify(token,process.env.SECRET_KEY, (erorr, decoded) => { 
      if (!erorr) {
     

        req.user = decoded;
   
      }
    });
  }
  next();
});



app.use("/api/students", studentRouter);

app.use("/api/users", userRouter);

app.use("/api/products",productRouter);
app.use("/api/orders",orderRouter);

app.post("/", (req, res) => {
  console.log(req.body);

  console.log("this is a post request");

  res.json({
    Message: "this is post request response",

    Message: "good morning" + req.body.name,
  });
});

app.listen(5000, () => {
  console.log("Server is runnig port 5000");
});
