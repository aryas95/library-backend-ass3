const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://mongo:librarybooks@cluster0.s3kdf.mongodb.net/library");
const schema =mongoose.Schema;
const blogschema = new schema({
    name:String,
    authorname:String,
    image:String,
    price:String,
    starRating:String
});
var blog =mongoose.model("books",blogschema);
module.exports=blog;








