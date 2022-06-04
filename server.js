
const exp=require("express")
const mclient=require("mongodb").MongoClient
const app=exp()
app.use(exp.json())

//import path(core) module
const path=require("path")

//connect build of react-app with node js
app.use(exp.static(path.join(__dirname,'./build' )))

//importing userapp,productapp
const userapp=require("./api/userapi")
const productapp=require("./api/productapi")



//console.log("in server")
//forwading client req depending on url to the apis
app.use('/user-api',userapp)
app.use('/product-api',productapp)


//import dotenv
require("dotenv").config() //returns process obj

//db url
const DBurl=process.env.DATABASE_CONNNECTION_URL
//Connect with MongoDB server
mclient.connect(DBurl)
.then((client)=>{
   
  //create db obj
  let dbObj=client.db("firstdb")
  let userCollectionObject=dbObj.collection("usercollection");
  let domainCollectionObject=dbObj.collection("domainCollection")
  //sharing collection objects to api's

  app.set("userCollectionObject",userCollectionObject);
  app.set("domainCollectionObject",domainCollectionObject)
  console.log("DB connection success")
})
.catch(err=>console.log("Error in DB connection",err))



//dealing with refreshing pages
app.use('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'./build/index.html'))
})






//Invalid Path
app.use((req,res,next)=>{
    res.send({Message:"Invalid path"})

})
//Error handling
app.use((error,req,res,next )=>{
  res.send({Message:`${error.message}`})
})


port=process.env.PORT
app.listen(port,()=>console.log(`Listening on ...${port}`)) 