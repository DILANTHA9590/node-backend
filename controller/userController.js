import User from "../modules/user.js ";
import jwt from "jsonwebtoken";
import  dotenv  from "dotenv";




import bcrypt, { hash } from "bcrypt";

dotenv.config();

/// create user
export function userCreation(req, res) {
  //API TA DAN ONI user ge email password hash karala secure karaganna

  //kelinma  me vidihata userge details db eke save karanna ba api passw2ord eka hash karaggana oni enisa

  // const user = new User(req.body)

  const getUserNewData = req.body; // dan api uda vidihata eka parama usr details danna ba api eka hash kara aganna oni e nisa userge details venama
  // veriable  ekkata dagannava it basse0

// meka api passe dagaththe 
  if(getUserNewData.type !== "admin"){ //api methandi balana admin account ekk acreate karannada  hadanne kiyala ethakota  get new eke type eka
    //adminta samanan api balanava 

    if(req.user==null){//request eke nullda kiyala methandi ape token eka decode karala details enava login vela naththam methanata data enne na\

      console.log(req.user);
      res.json({
        
        
        message : "please login as administrator to create admin account " // nul nam api  kiyanava login vela enna kiyala admin  account eken
      })
      return

    }


    if(req.user.type != "admin"){//methanadi api decode karala evana token eke type eka admin da kiyala balanava admin nemenam

       res.json({
        message : "please login as administrator to create admin account " // nul nam api  kiyanava login vela enna kiyala admin  account eken
      })
      return

    }
  }

   

  // api  methanadi balanava meka passe damme melkata kalin thibbe pahala password hash karana eke idala

  //methna krnne req bdy eke ena detils valin password ekavitahrak aran eka hash karala
  //e ena eka 10 parak hash karanava

  getUserNewData.password = bcrypt.hashSync(getUserNewData.password, 10);

  // console.log(getUserNewData.password);

  // metahnida api uda venasa karagaththu evath password ekath ekka ana ookoma data  eka databse ekata pass karanava

  const user = new User(getUserNewData);

  user
    .save()
    .then(() => {
      res.json({
        message: "User created Successfully",
      });
    })
    .catch((erorr) => {
      console.log(erorr);
      res.json({
        message: "all ready  use this mail",
      });
    });
}

export function loginUser(req, res) {
  // const email = req.body.email
  // const password = req.body.password

  User.find({ email: req.body.email }) //mail eke user saha req eke user details samanda balanava
    .then((users) => {
      if (users.length == 0) {
        res.json({
          message: "user not found",
        });
      } else {
        const user = users[0]; // e user innvbanam eyava user me user veriable kata dagannava
        const isPasswordCorrect = bcrypt.compareSync(
          req.body.password,
          user.password
        ); // ita appse parword samanda kiyala check karanva

        if (isPasswordCorrect) {
          const token = jwt.sign(
            {
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              password: user.password,
              isBlock: user.isBlock,
              type: user.type,
              profilePic: user.profilePic,
            },

            process.env.SECRET_KEY
          );
          console.log(token); //meken thamnai json webtoken eka genarate karanne

          res.json({
            message: "user logging",
            token: token,
            user : {//me tika api haduve front end eke login eka hadanakota mokda token ekk vitharai ynne 
              // mehema karma user details tikath lassnata pennava apiata meka type eka aran userlava e e page valata redirect karanna lesi
              firstName : user.firstName,
              lastName : user.lastName,
              type : user.type,
              profilePic : user.profilePic,
              email : user.email  ///api metahana passwor d kea yavanne  na e va balla yuavanna pni pasword eka yauvama
              //eka okotama penava evath thorala berala thama yavanna oni
            }
          });

          // })
        } else {
          res.json({
            message: "User not login, incorrect user name or password",
          });
        }
      }
    });
}


//methandi apata adminta vitharai product ekk create karanna avsathva hadala denne
//api e vadeta methana function dekk hadagannava mokada apata natham nitharaMA MEKA AVSHAYA THAN HAMA THANAMA ADMIN DA CUSTEMR DA KIYALA
// code karala balanna venava mehema karama avshaya thaniun apta cl karganna pulvn
//evna request eke user null saha evan user type eka admin nemeida kiyala
// ehema num false  ehema naththam true
export function isadmin(req){
  if(req.user == null){
    return false
  }

  if(req.user.type != "admin"){
    return false
  }


  return true
}


export function  isCustomer(req){

  if(req.user == null){
    return false
  }

  if(req.user.type != "customer"){
    return false

  }

  return true

}

//get databse have all user details
export function getuser(req, res) {
  User.find().then((usersList) => {
    res.json({
      ulist: usersList,
    });
  });
}


export function createnewstudent(){

  console.log("relearn");

}

