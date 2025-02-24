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
if(req.data !=null){
    if(req.user==null){//request eke nullda kiyala methandi ape token eka decode karala details enava login vela naththam methanata data enne na\


      console.log(req.user);
      res.status(403).json({
        
        
        message : "please login as administrator to create admin account " // nul nam api  kiyanava login vela enna kiyala admin  account eken
      })
      return

    }


    if(req.user.type != "admin"){//methanadi api decode karala evana token eke type eka admin da kiyala balanava admin nemenam

       res.status(403).json({
        message : "please login as administrator to create admin account " // nul nam api  kiyanava login vela enna kiyala admin  account eken
      })
      return

    }
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
      res.status(200).json({
        message: "User created Successfully",
      });
    })
    .catch((erorr) => {
      console.log(erorr);
      res.status(400).json({
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
        // if(user.isBlock){
          
        //   res.json({
        //     message : "block user"
            
        //   })

        //   return

        // }
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



// export async function updateUser(req, res){//kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk

// try {


//   const email= req.params.email;

//   const userData = req.body

//   const user= await User.find({email});
//   if(!user){
//     res.status(404).json({
//       message: "User Not Found "
//     })
//   }

//   const HashPassword = user.password
//   if(password !==user.password){
//     const saltRounds = 10;
//     HashPassword = await bcrypt.hash(password, saltRounds);
//   }


//   const updateUser = await User.updateOne(
//       {email:email},
//     userData

//     )
//     res.status(200).json({
//       message : " User Update succsessFull"
//     }
   
//   )
  
// } catch (error) {

//   res.json({
//     message : " User Update Unsuccesfully"
//   })

  
 
  
// }
  

  
// }



export async function updateUser(req, res) {
  console.log(req.user);
  console.log(req.body);

  const email = req.params.email;
    const userData = req.body;
    console.log("userrrrrrrrrrrrrrrrrrr",userData)
  try {
    if(req.user.type=='customer'){
    

    const user = await User.findOne({ email });

    console.log("find user",user);
    if (!user) {

      console.log("user not found")
      return res.status(404).json({ message: "User Not Found" });

  
    }

    // Check if the password is different and hash it if it is

    if (userData.password && userData.password !== user.password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
      userData.password = hashedPassword; // Replace plain password with hashed one
    }

    // Update user data in the database
    await User.updateOne({ email: email }, userData);

    res.status(200).json({ message: "User updated successfully" });

  }

  else{

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }


    else{
      res.status(400).json({
        message : " please login first"
      })
    }

  }

  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "User update failed" });
  }
}



// export async function updateUserStatus(req, res) {
//   try {
//     const userId = req.params.userId; // Get user ID from URL
//     const { isBlock } = req.body; // Get block status from request body

//     // Find user and update block status
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { isBlock: isBlock }, // Update block status
//       { new: true } // Return updated document
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({
//       message: `User ${isBlock ? "Blocked" : "Unblocked"} successfully`,
//       user: updatedUser,
//     });
//   } catch (error) {
//     console.error("Error updating user status:", error);
//     res.status(500).json({ message: "Error updating user status", error: error.message });
//   }
// }

export async function updateUserStatus(req, res) {
  try {
    const userId = req.params.userId; // Get user ID from URL
    const { isBlock } = req.body; // Get block status from request body
    console.log(req.body);

    // Find user by ID and update the block status
    const user = await User.findOne({ _id: userId }); // Find the user with the given userId

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's block status manually
    user.isBlock = isBlock;

    // Save the updated user
    await user.save();

    res.status(200).json({
      message: `User ${isBlock ? "Blocked" : "Unblocked"} successfully`,
      user: user,
    });
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ message: "Error updating user status", error: error.message });
  }
}




// Update user block status






    

//   userData.password = bcrypt.hashSync(userData.password, 10);
//   console.log(req.body.profilePic);


//   user.find({})






//   try {

    
  
  
//     await User.updateOne(
//       {email:email},
//     userData

//     )
//     res.status(200).json({
//       message : " User Update succsessFull"
//     })
  
  
    
  
    
//   } catch (error) {
//     res.json({
//       message: "Fail to update user"
//     })
    
    
//   }

 



  

// }







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
export async function googleLogin(req, res) {
  if (!req.body.token) {
    return res.status(400).json({ message: "Token is required" });
  }

  const token = req.body.token;
  console.log("Received Token:", token);

  try {
    // Fetch user details from Google
    const googleResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log("Google API Response:", googleResponse.data);

    const email = googleResponse.data.email;

    // Check if user already exists
    const usersList = await User.find({ email: email });
    console.log("User lookup result:", usersList);

    if (usersList.length > 0) {
      const user = usersList[0];

      const userToken = jwt.sign(
        {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isBlock: user.isBlock,
          type: user.type,
          profilePic: user.profilePic,
        },
        process.env.SECRET_KEY,
        { expiresIn: "7d" }
      );

      console.log("User logged in with token:", userToken);

      return res.json({
        message: "User logged in",
        token: userToken,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          type: user.type,
          profilePic: user.profilePic,
          email: user.email,
        }
      });
    }

    // Create a new user if not found
    const newUserData = {
      email: email,
      firstName: googleResponse.data.given_name,
      lastName: googleResponse.data.family_name,
      type: "customer",
      password: "#ggggg",
      profilePic: googleResponse.data.picture,
    };

    const newUser = new User(newUserData);
    await newUser.save();

    console.log("New user created:", newUser);

    return res.json({ message: "User created successfully" });

  } catch (error) {
    console.error("Google login error:", error);
    return res.status(500).json({ message: "Google login failed" });
  }
}
export async function usersCount(req,res){

  try {
  let customerCount=[];
  let adminCount = [];
    let  users = await User.find();
    for(let i=0; i<users.length; i++){
      if(users[i].type!=="admin" ){
        customerCount[i] =users[i]
  
      }
      else{
        adminCount[i] =users[i];

      }
    }
  

    customerCount= customerCount.filter(item => item !== null && item !== undefined);

    
   customerCount=customerCount.length





    adminCount = adminCount.filter(item => item !== null && item !== undefined);
    

    adminCount=adminCount.length


    res.json({
      customerCount,
      adminCount
    })

  
  } catch (error) {
    
  }
  
  
  
    
  
  
  
  
  
  
  }
  
  
  export async function deleteUser(req,res){

    console.log("inside delete users");
  
    if(!isadmin){
    res.status(400).json({
      message : " Please login to admin account"
      
      
    })
  
    return
  
    }
  
    try {
  
      const user = req.params._id
      console.log(user);



      await User.deleteOne({_id : req.params._id});

      res.status(200).json({
        message : "Deleted Succesfully"
      })

    

      
      
    } catch (error) {
      
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












