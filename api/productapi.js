



const exp=require("express")
const productapp=exp.Router()

const expressAsyncHandler=require("express-async-handler")
//to extract body of request Object: converting to JS-predfined inbuilt func
productapp.use(exp.json())

const middleware1=(request,response,next)=>{
    console.log("middleware1 is executed")
    next()
}

//get products
productapp.get('/getproducts',expressAsyncHandler(async(req,res)=>{
    //get product collection object
    let productCollectionObject=req.app.get("productCollectionObject")
    //read all products
    let products=await productCollectionObject.find().toArray()
    //send response
    res.send({message:"All products",payload:products})
}))


//get products by id route
productapp.get("/getproduct/:id",expressAsyncHandler(async(req,res)=>{
    //get product collection object
    let productCollectionObject=req.app.get("productCollectionObject")
    //get id from url parameter
    let pid=(+req.params.id);
    //get product by id
    let product=await productCollectionObject.findOne({productId:{$eq:pid}});
    //if product does not exist
    if(product==null){
        res.send({message:"The product does not exist"})
    }
    else{
        res.send({message:"Product existed",payload:product})
    }
}))


//create route to create product
productapp.post("/create-product",expressAsyncHandler(async(req,res)=>{
    //get product collection object
   let productCollectionObject=req.app.get("productCollectionObject")
    //get product from req
   let productObj=req.body;
   //insert product object as it is blocking request await is used
   let result= await productCollectionObject.insertOne(productObj)

   let products=await productCollectionObject.find().toArray()
 
 
  //send response
  res.send({message:"created product",payload:products})
    
}))


//create route to update the product
productapp.put('/update-product',expressAsyncHandler(async(req,res)=>{
    //get product collection object
   let productCollectionObject=req.app.get("productCollectionObject")
   //get modified product object
   let modifiedProduct=req.body;
   //update
   await productCollectionObject.updateOne({productId:modifiedProduct.productId},{$set:{...modifiedProduct}})
   //send response
   res.send({message:"Product modified"})
}))

//create router to delete a product
productapp.delete('/delete-product/:id',expressAsyncHandler(async(req,res)=>{

     //get product collection object
   let productCollectionObject=req.app.get("productCollectionObject")
   //get id of product to bbe deleted
   let prodid=(+req.params.id);
   //find product with id
   let product=productCollectionObject.findOne({productId:prodid})
   console.log(product)
   if(product==null)
   res.send({message:"No product found!"})
   else
   {
       //delete product
    await productCollectionObject.deleteOne({product : productCollectionObject.prodid})
    res.send({message:"Successfully deleted!"})
   }
}))
//export productapp
module.exports=productapp;