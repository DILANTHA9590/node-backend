import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import studentRouter from "./routes/studentRouter.js";

import userRouter from "./routes/userRouter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();//meken .env eka run karagannava api meken venne .env kiyana file eka api lord karaganna me file eka athulata ita pass apata 

const app = express();

// const mongoUrl =
//   "mongodb+srv://myadmin:4321@cluster0.ktccj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
//kalinmethanima thama connection eka hadan thibbe dan uda config eken haduva me vidihata

const mongoUrl = process.env.MONGO_DB_URI //mekedi apata databse eke value import karala me veriable ekata daganna puluvan


mongoose.connect(mongoUrl, {});
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("database connetced");
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  // console.log(req.header("Authorization")); //methanadi apata tokern eka enava meka enne request eke hedader vala
  //mehana thama enne token eka meken apata token eka kiiyava gann a puluvan

  // e uda  ekama thama pahala thiyenne eka dam e token eka enavda balanna

  const token = req.header("Authorization")?.replace("Bearer ", ""); //uda token eka apata beaer kiyala kallk thiyenava api eka methanin his thanak thiayala replace karanava ain karagannava

  console.log(token); //ekae itapasse token function ekakata dala priont karama bear eka ain venava api meka ain karanne api evana token eke bearer kiyala ekk nane
  // e nisa eka ain karaganna

  // methanadi karanne evana token eka null nemei nam e taken eka verfy karala denna kiyala e kiyanne encrypt
  // token eka methanmdi decrypt kjaragannav
  if (token != null) {
    jwt.verify(token,process.env.SECRET_KEY, (erorr, decoded) => { //evagema scret key eka pena ekath prashnayak nisa api ekath daganna .env ekata
      //erorr ekak avoth mehama natham

      if (!erorr) {
        //METGHANDI UDA EROORR EKK AVE NATHHTAM decode karagaththa eka methanadinbalaganna puluvan
        // console.log(decoded); apita dan product eketh me deitails balaganna puluvan

        req.user = decoded; // itapasse api decode karapu user va request ekata ellaganava  , e kiaynne e decode karana eka reqest eke userge data kiyala meyava ellaganava
        //thavath videhakata kiuvoth request ekatama decode details ellananna
        //  decode vela
      }
    });
  }
  next();
});

/*(app.use((req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    // If no Authorization header is provided, skip user attachment but allow the request to continue
    return next();
  }

  // Ensure the header is in the correct format
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  const token = authHeader.replace("Bearer ", "");0

  try {
    const decoded = jwt.verify(token, "cbc-secret-key-7903");
    req.user = decoded; // Attach decoded payload to the request
    // console.log(req.user);
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  next(); // Proceed to the next middleware or route handler
});*/

app.use("/api/students", studentRouter);

app.use("/api/users", userRouter);

app.post("/", (req, res) => {
  console.log(req.body);

  console.log("this is a post request");

  res.json({
    Message: "this is post request response",

    Message: "good morning" + req.body.name,
  });
});

app.listen(3000, () => {
  console.log("Server is runnig port 3000");
});
