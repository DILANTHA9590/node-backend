import User from "../modules/user.js ";
import jwt from "jsonwebtoken";
import  dotenv  from "dotenv";




import bcrypt, { hash } from "bcrypt";
import axios from "axios";

dotenv.config();





/// create user
export function userCreation(req, res) {
  

  const getUserNewData = req.body; 


  if(getUserNewData.type !== "admin"){ 
if(req.data !=null){
    if(req.user==null){


 
      res.status(403).json({
        
        
        message : "please login as administrator to create admin account " 
      })
      return

    }


    if(req.user.type != "admin"){
       res.status(403).json({
        message : "please login as administrator to create admin account " // nul nam api  kiyanava login vela enna kiyala admin  account eken
      })
      return

    }
  }
}





   

 

  getUserNewData.password = bcrypt.hashSync(getUserNewData.password, 10);

  
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
  
  User.find({ email: req.body.email }) 
    .then((users) => {
      if (users.length == 0) {
        res.json({
          message: "user not found",
        });
      } else {
        const user = users[0]; 
        // if(user.isBlock){
          
        //   res.json({
        //     message : "block user"
            
        //   })

        //   return

        // }
        const isPasswordCorrect = bcrypt.compareSync(
          req.body.password,
          user.password
        ); 
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
          console.log(token); 

          res.json({
            message: "user logging",
            token: token,
            user : {
              firstName : user.firstName,
              lastName : user.lastName,
              type : user.type,
              profilePic : user.profilePic,
              email : user.email  
            }
          });

    
        } else {
          res.json({
            message: "User not login, incorrect user name or password",
          });
        }
      }
    });
}



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




export async function getUser(req,res){


if(req.user==null){
  res.status(404).json({
    message : "Please login to view user details"
  })

  return
}

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







export async function updateUser(req, res) {
  console.log(req.user);
  console.log(req.body);

  const email = req.params.email;
    const userData = req.body;
    
  try {
    if(req.user.type=='customer'){
    

    const user = await User.findOne({ email });


    if (!user) {

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

    res.status(500).json({ message: "Error updating user status", error: error.message });
  }
}








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

    // Find the user by email
    const user = await User.findOne({ email });

    if (user) {
      // If user exists, create a JWT token with the user's details
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

    // If user doesn't exist, create a new user.
    // You might want to generate a random or a placeholder password for social logins
    const newUserData = {
      email,
      firstName: googleResponse.data.given_name,
      lastName: googleResponse.data.family_name,
      type: "customer",
      password: "#ggggg", // Consider a secure placeholder or random string here.
      profilePic: googleResponse.data.picture,
    };

    const newUser = new User(newUserData);
    await newUser.save();

    console.log("New user created:", newUser);

    // Optionally, you can sign a token right away after creation:
    const newUserToken = jwt.sign(
      {
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        isBlock: newUser.isBlock,
        type: newUser.type,
        profilePic: newUser.profilePic,
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    return res.json({ 
      message: "User created successfully", 
      token: newUserToken,
      user: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        type: newUser.type,
        profilePic: newUser.profilePic,
        email: newUser.email,
      }
    });

  } catch (error) {
    console.error("Google login error:", error);

    // If error comes from axios (Google API call), you might want to forward the status code
    if (error.response && error.response.data) {
      return res.status(error.response.status).json({
        message: error.response.data.error || "Error fetching Google user info"
      });
    }
    
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
  





