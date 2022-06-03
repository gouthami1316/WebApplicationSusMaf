//create route to handle user api requests
const exp=require("express")
const userapp=exp.Router()
const expressAsyncHandler=require("express-async-handler")
//import bycryptjs  for password hashing
const bcryptjs = require("bcryptjs")
//import jsonwebtoken to return if username and password matches
const jsonwebtoken=require("jsonwebtoken")

require("dotenv").config()


//const verifyToken=require('./middlewares/verifyToken')

var cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

//configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

//config cloudinary storage
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "imgsProj",
      public_id: file.fieldname + "-" + Date.now(),
    };
  },
});

//configure multer :multer is to store the images int cloudinary
var upload = multer({ storage: cloudinaryStorage });

//to get body of request object
userapp.use(exp.json())
userapp.use(exp.urlencoded())
//console.log("user-api")
//USER API'S
//create route to handle getusers path
userapp.get('/getusers',expressAsyncHandler(async(req,res)=>{
    //get userCollectionobject
    let userCollectionObject=req.app.get("userCollectionObject")
    //get all users
    let users=await userCollectionObject.find().toArray()
    //send response
    res.send({message:"user list",payload:users})
}))

//console.log("user-api--2")
//create route to user login
userapp.post("/login",expressAsyncHandler(async(req,res)=>{
    //get usercollectionobject
    let userCollectionObject=req.app.get("userCollectionObject")
    //get user credentials obj from client
    let userCredObj=req.body
    //serach for user by username
    let userOfDB=await userCollectionObject.findOne({username:userCredObj.username})
    //if user does not exist
    if(userOfDB==null){
        res.send({message:"User doesn't exist"})
    }
    else{
        //compare passwords
       let status=await bcryptjs.compare(userCredObj.password,userOfDB.password)
       //if passwords didn't match
       if(status==false)
       {
           res.send({message:"Invalid Password"})
       }
       else
       {
           //abcdef is secret key
           let token=jsonwebtoken.sign({username:userOfDB.username},process.env.SECRET_KEY,{expiresIn:60})
           //send token to client
           res.send({message:"Login success",payload:token,userObj:userOfDB})
       }
    }
}))




//create route to create user
userapp.post("/create-user",upload.single("photo"),expressAsyncHandler(async(req,res)=>{
    //console.log("user-api,createuser")
    //console.log("singup-cloudinary")
    //console.log(req)
    console.log(req.file.path)
    //get userCollectionobject
    let userCollectionObject=req.app.get("userCollectionObject")
    //get userobject as string  from client(string to JSON) conerting into object
    let userObj=JSON.parse(req.body.userObj)
    //console.log(userObj)
    //check if username already exists
    let userOfDB=await userCollectionObject.findOne({username:userObj.username})
    //if user existed
    if(userOfDB!==null)
    {
        res.send({message:"Username already exists"})
    }
    else{
        //has*h the password
       let hashedPassword=await bcryptjs.hash(userObj.password,6)
       //replace plain test password by hashed passsword
       userObj.password=hashedPassword
       //add profile image link
       userObj.profileImg=req.file.path; 
       //console.log(userObj)
       //insert new user to database
       await userCollectionObject.insertOne(userObj)
       console.log(userObj)
       //send response
       res.send({message: "New User Created", payload:userObj})
    }
}))




//create route to update user
userapp.put("/update-user",expressAsyncHandler(async(req,res)=>{
     //get userCollectionobject
     let userCollectionObject=req.app.get("userCollectionObject")
     //get userobject from client
     let modifiedUser=req.body
      //update
     await userCollectionObject.updateOne({username:modifiedUser.username},{$set:{...modifiedUser}})
     res.send({message:"user details successfully modified"})
}))
    

//create rout to delete user
userapp.delete('/delete-user/:username',function(req,res){
    //get product collection object
    let userCollectionObject=req.app.get("userCollectionObject")
    //get id of product to bbe deleted
    let username1=(req.params.username);
    console.log(username1)
    let userObj = userCollectionObject.findOne({username1 : userCollectionObject.username})
    console.log(userObj)
    //find product with id
    if(userObj==null)
    res.send({message:"No user found!"})
    else
    {
        //delete product
     userCollectionObject.deleteOne({userObj: userCollectionObject.username})
     res.send({message:"Successfully deleted!"})
    }
})

//export userapp
module.exports=userapp