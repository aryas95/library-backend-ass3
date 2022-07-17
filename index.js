const express=require("express");
const app = new express;
const cors = require("cors");
const jwt =require("jsonwebtoken");
const blog=require("./src/model/mongo")
const PORT = process.env.PORT || 3002;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

email= "any"
password="any"

app.post("/login",(req,res)=>{
let userdata= req.body


if(!email ){
    res.status(401).send("invalid");
    console.log(invalid);
    }
    else
if(!password){
         res.status(401).send("invalid password");
         console.log("inavlid p");
    }else
    {
       let payload ={subject:email+password}
       let token =jwt.sign(payload,'secretkey')
       
        res.status(200).send({token})
    }

})
app.get("/book",(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    blog.find()
    .then(function(book){
        res.send(book)
    })
    
})

app.post("/addbook",(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    console.log(req.body);

    var products = {
        image:req.body.item.image,
        name:req.body.item.name,
        authorname:req.body.item.authorname,
        price:req.body.item.price,
        starRating:req.body.item.starRating
    }
   var product = new blog(products)
   product.save();
})

app.get('/:id',  (req, res) => {
  
    const id = req.params.id;
      blog.findOne({"_id":id})
      .then((product)=>{
          res.send(product);
      });
  })

  app.put('/update',(req,res)=>{
    console.log(req.body)
    id=req.body._id,
    
    name = req.body.name,
    authorname = req.body.authorname,
    image = req.body.image,
    price = req.body.price,
    starRating = req.body.starRating,
    
   blog.findByIdAndUpdate({"_id":id},
                                {$set:{
                                "name":name,
                                "authorname":authorname,
                                "image":image,
                                "price":price,
                                "starRating":starRating,
                                }})
   .then(function(){
       res.send();
   })
 })

 app.delete('/remove/:id',(req,res)=>{
   
    id = req.params.id;
    blog.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
  })



app.listen(PORT,()=>{
    console.log("server is running");
});