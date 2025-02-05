import User from "../modules/user.js ";
import jwt from "jsonwebtoken";
import  dotenv  from "dotenv";




import bcrypt, { hash } from "bcrypt";
import axios from "axios";

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
// export function getuser(req, res) {
//   User.find().then((usersList) => {
//     res.json({
//       ulist: usersList,
//     });
//   });
// }


export async function getUser(req,res){


if(req.user==null){
  res.status(404).json({
    message : "Please login to view user details"
  })

  return
}
// null naththam api eka yavanava front enad ekata
//api meka methana mehema haduve apata front end eke di meka decode karaganna ba mokada apata frontt end ekedi thiyenne token 
// //ekk vitharai apata eka balaganna ba admin kenektada user kenektad a kiyala balagannma ba
//e hinda aparta me userge information tia agannma venama api ekak hadanavas user token ekk dunnoth eyata puluavan methanin 
// e tika  read karala ganna
res.json(req.user);


}





export async function getUserData(req,res){


  console.log("getuser req",req.user);

  if(req.user==null){
    res.json({
      message: " Please login to view users data"
      
    })

    return;
  }

  try {


    if(isadmin(req)){
      const users = await User.find({})
  
     return res.status(200).json({
        users
      })

    }
  
  
    
  
    
  } catch (error) {

    res.json({
      error
    })
    
  }


 
    

  



  



}



export async function updateUser(req, res){//kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk


  

  const email= req.params.email;

  const userData = req.body
    

  userData.password = bcrypt.hashSync(userData.password, 10);
  console.log(req.body.profilePic);


  user.find({})






  try {

    
  
  
    await User.updateOne(
      {email:email},
    userData

    )
    res.status(200).json({
      message : " User Update succsessFull"
    })
  
  
    
  
    
  } catch (error) {
    res.json({
      message: "Fail to update user"
    })
    
    
  }

 



  

}







// export async function googleLogin(req,res){

  
//   const token = req.body.token 
//   console.log("mytoken",token);

//   try {
//     const response = await axios.get(
//       'https://www.googleapis.com/oauth2/v3/userinfo',{
       
//         headers : {
//           Authorization : `Bearer ${token}`
//         }

//     })

    
    
//     // api  res eke email eke ena email ek a vble ekkata degena eka balanava db eke mail ekai samanda kiyala kiyala
//     console.log("Google endpoint response:", response.data); 
//     const email = response.data.email

//     //check if user exist
    
//     const usersList = await User.find({email:email})

   
//     if(usersList.length > 0){
//      const user = usersList[0]
//      const token = jwt.sign({
//       email : user.email,
//       firstName :user.firstName,
//       lastName : user.lastName,
//       isBlock : user.isBlock,
//       type :user.type,
//       profilePic : user.profilePic

//     }, process.env.SECRET_KEY)
//     console.log("db return email", user);

   
//     res.json({
//       message : " User logged in",
//       token : token,
//       user : {
//         firstName :user.firstName,
//         lastName : user.lastName,
//         type : user.type,
//         profilePic : user.profilePic,
//         email : user.email
//       }


//     })

//     console.log("user gioogle login token"+token);
//     console.log(user);
//     }else{
//       //create new user
//     const newUserData = {
      
     
//       email : email,
//       firstName : response.data.given_name,
//       lastName : response.data.family_name,
//       type : "customer", 
//       password : "#ggggg",
//       profilePic : response.data.picture

// }

// const user = new User(newUserData)
// user.save().then(()=>{
//   res.json({
//     message : "User created"
//   })


// }).catch((error)=>{

//   res.json({
//     message : "User not created"
//   })
 

// })



//     }






    
//   } catch (error) {
//     console.log(error);

//     res.json({
//       message : "Google login failed"
      
//     })
    
//   }

 
// }



//api meka saralava vada karana hati therum ganna balamu advanced karanna kalin api hithamu dan meka enne ape req eke body
//  eka kiyala ehema avoth api  eka gnnava token vble ekkeata mehema
export async function googleLogin(req,res){

  //dan apita siida venava userge visthara tika token ekata adla va danaganna
    //mekata apata googla api api url ekata apita siida venav get ekk gahal details ganna
    // apta mulinm a front end ekedi thama api calll gahanna oni axios dan apata backend eke idalath 
    // dan  apata axios oni venava mokda dan apita backe nd eken googl e api ekkata
    // api ekk gahala google token eka dta tika ganna oni e nisa apita back ekakath axios install 
    //kraganna oni venava
  
  const token = req.body.token 
  console.log("mytoken",token);

  try {
    const response = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',{
        //api front end eken back ekata headr eka athule token eka euva vgema api 
        //MEKETH TOKEN EKA YAVANA E VGEMA GOOGLE API END POINT EKATA YAVALA ENA RES TIKA
        // RESPONSE  V BLE EKAT GANNAV 
        headers : {
          Authorization :` Bearer ${token}`
        }

    })

    // apita  dan mehema evala hariyanne na google api eken apva data verify karaganna oni
    // console.log("Google endpoint response:", response.data); meken apata json data ballana puluvan
    // apata  ape token eka yavuvma google end point keta eyala methanata api datta
    // ena ahti mama yatin  ma dala athi
    //denava apata e token ekata adla user ge all details tika response eke

    // res.json({
    //   message:"Google login successful",
    
    // api  res eke email eke ena email ek a vble ekkata degena eka balanava db eke mail ekai samanda kiyala kiyala
    console.log("Google endpoint response:", response.data); 
    const email = response.data.email

    //check if user exist
    // api  ilagat balanava user log venna hdana email ekai db mail ekai samanda kiyala

    //   user : response.data // ita passe uda response v ble eke ena data tika api balana res eeke ena data
    // vala user kenek  innvda kiyala
    //saralavama kiuvoth ekaparak hari eya google eken log vela naththam api e google apiekata token eka yavala 
    // ena user ge details api db eke save vena vidihata hadaganna yanne
    //ethakota devani para eya log venakota e email eka ape db eke save vela nisa  eya log una user kenek ekai methanin ppahala karanna yanne ekata
    // api dam methanin iiiselama check akrala balanava user genamin mail ekk denata math mail eke thiyenavad  kiyala

    // })

    const usersList = await User.find({email:email})

   // iota passe api balanava eken ena email ekata adala ena userlist arrey eka eka userkenek hari innavda kiyala
   //emtyda kiyala vge thama balanna ehema innavanam e user object arrey eke 0 veni ekkenav a gannava
   //kojhomath methanata ekkani thamai enne

  //  iinavanam  api index eke jwt webtoken  ekk hadagaththa vge

  //ita passe e adala userta web token ekk geanarate karanava mokada 
  //jwt token ken thama ape user va identyfy karaganne
  //token ekk naththma userta aii log venna venava mokda token eken thama ape site eka userva mathaka thiyagena
  // inne 

    if(usersList.length > 0){
     const user = usersList[0]
     const token = jwt.sign({
      email : user.email,
      firstName :user.firstName,
      lastName : user.lastName,
      isBlock : user.isBlock,
      type :user.type,
      profilePic : user.profilePic

    }, process.env.SECRET_KEY)
    console.log("db return email", user);

    //ita passe eadala genarate unu token ekai userta adla visthra tikai api yavanava front end ekata
    // The JWT token that was just generated. This token is used for subsequent authentication requests.
// The user's data (first name, last name, email, etc.) to confirm the logged-in user’s details.
    res.json({
      message : " User logged in",
      token : token,
      user : {
        firstName :user.firstName,
        lastName : user.lastName,
        type : user.type,
        profilePic : user.profilePic,
        email : user.email
      }


    })

    console.log("user gioogle login token"+token);
    console.log(user);
    }else{
      //create new user
    const newUserData = {
      
      // mevge dala   _ dala dala thiyenne g oogle eken ena userge data enne oyavge vbl e vaala   // .data.given_name
      // api athana user kenek naththam, methanata acvilla
      // object ekkak hadagannava e gle api eken userge  details valin 
      // api ape user create db ekata e adla data tika savae karagena usrva ceate karagannava

    
      email : email,
      firstName : response.data.given_name,
      lastName : response.data.family_name,
      type : "customer", 
      password : "#ggggg",
      profilePic : response.data.picture

}

const user = new User(newUserData)
user.save().then(()=>{
  res.json({
    message : "User created"
  })


}).catch((error)=>{

  res.json({
    message : "User not created"
  })
 

})



    }






    
  } catch (error) {
    console.log(error);

    res.json({
      message : "Google login failed"
      
    })
    
  }

 
}




// response eka click karama data goole eken adata json eka enne mehema 

// Server is runnig port 5000
// [nodemon] starting node index.js
// Server is runnig port 5000
// Server is runnig port 5000
// database connetced
// google endpoint res[object Object]
// [nodemon] restarting due to changes...
// [nodemon] restarting due to changes...
// [nodemon] starting node index.js
// Server is runnig port 5000
// [nodemon] starting node index.js
// Server is runnig port 5000
// database connetced
// database connetced
// Google endpoint response: {
//   sub: '103470880460796436729',
//   name: 'dilantha nayanajith',
//   given_name: 'dilantha',
//   name: 'dilantha nayanajith',
//   given_name: 'dilantha',
//   given_name: 'dilantha',
//   family_name: 'nayanajith',
//   family_name: 'nayanajith',
//   family_name: 'nayanajith',
//   family_name: 'nayanajith',
//   family_name: 'nayanajith',
//   family_name: 'nayanajith',
//   family_name: 'nayanajith',
//   picture: 'https://lh3.googleusercontent.com/a/ACg8ocLNyPBCWrKH1LrW7XJN1OoxgRhyVhyb_E5Ez9u3wQ6sxaDClj0=s96-c',
//   email: 'dilantha9590@gmail.com',
//   email_verified: true
// }








//   family_name: 'nayanajith',
//   picture: 'https://lh3.googleusercontent.com/a/ACg8ocLNyPBCWrKH1LrW7XJN1OoxgRhyVhyb_E5Ez9u3wQ6sxaDClj0=s96-c',
//   email: 'dilantha9590@gmail.com',
//   email_verified: true
// }





//   family_name: 'nayanajith',
//   picture: 'https://lh3.googleusercontent.com/a/ACg8ocLNyPBCWrKH1LrW7XJN1OoxgRhyVhyb_E5Ez9u3wQ6sxaDClj0=s96-c',
//   email: 'dilantha9590@gmail.com',
//   email_verified: true
// }


//   family_name: 'nayanajith',
//   picture: 'https://lh3.googleusercontent.com/a/ACg8ocLNyPBCWrKH1LrW7XJN1OoxgRhyVhyb_E5Ez9u3wQ6sxaDClj0=s96-c',
//   email: 'dilantha9590@gmail.com',
//   email_verified: true
// }
//   family_name: 'nayanajith',
//   picture: 'https://lh3.googleusercontent.com/a/ACg8ocLNyPBCWrKH1LrW7XJN1OoxgRhyVhyb_E5Ez9u3wQ6sxaDClj0=s96-c',
//   family_name: 'nayanajith',
//   picture: 'https://lh3.googleusercontent.com/a/ACg8ocLNyPBCWrKH1LrW7XJN1OoxgRhyVhyb_E5Ez9u3wQ6sxaDClj0=s96-c',
//   email: 'dilantha9590@gmail.com',
//   email_verified: true
// }



// response eka click karama data goole eken adata json eka enne mehema 

// Server is runnig port 5000
// [nodemon] starting `node index.js`
// Server is runnig port 5000
// Server is runnig port 5000
// database connetced
// google endpoint res[object Object]
// [nodemon] restarting due to changes...
// [nodemon] restarting due to changes...
// [nodemon] starting `node index.js`
// Server is runnig port 5000
// [nodemon] starting `node index.js`
// Server is runnig port 5000
// database connetced
// database connetced
// Google endpoint response: {
//   sub: '103470880460796436729',
//   name: 'dilantha nayanajith',
//   given_name: 'dilantha',
//   name: 'dilantha nayanajith',
//   given_name: 'dilantha',
//   given_name: 'dilantha',
//   family_name: 'nayanajith',
//   family_name: 'nayanajith',
//   family_name: 'nayanajith',
//   family_name: 'nayanajith',
//   family_name: 'nayanajith',
//   family_name: 'nayanajith',
//   family_name: 'nayanajith',
//   picture: 'https://lh3.googleusercontent.com/a/ACg8ocLNyPBCWrKH1LrW7XJN1OoxgRhyVhyb_E5Ez9u3wQ6sxaDClj0=s96-c',
//   email: 'dilantha9590@gmail.com',
//   email_verified: true
// }








//   family_name: 'nayanajith',
//   picture: 'https://lh3.googleusercontent.com/a/ACg8ocLNyPBCWrKH1LrW7XJN1OoxgRhyVhyb_E5Ez9u3wQ6sxaDClj0=s96-c',
//   email: 'dilantha9590@gmail.com',
//   email_verified: true
// }





//   family_name: 'nayanajith',
//   picture: 'https://lh3.googleusercontent.com/a/ACg8ocLNyPBCWrKH1LrW7XJN1OoxgRhyVhyb_E5Ez9u3wQ6sxaDClj0=s96-c',
//   email: 'dilantha9590@gmail.com',
//   email_verified: true
// }


//   family_name: 'nayanajith',
//   picture: 'https://lh3.googleusercontent.com/a/ACg8ocLNyPBCWrKH1LrW7XJN1OoxgRhyVhyb_E5Ez9u3wQ6sxaDClj0=s96-c',
//   email: 'dilantha9590@gmail.com',
//   email_verified: true
// }
//   family_name: 'nayanajith',
//   picture: 'https://lh3.googleusercontent.com/a/ACg8ocLNyPBCWrKH1LrW7XJN1OoxgRhyVhyb_E5Ez9u3wQ6sxaDClj0=s96-c',
//   family_name: 'nayanajith',
//   picture: 'https://lh3.googleusercontent.com/a/ACg8ocLNyPBCWrKH1LrW7XJN1OoxgRhyVhyb_E5Ez9u3wQ6sxaDClj0=s96-c',
//   email: 'dilantha9590@gmail.com',
//   email_verified: true
// }












