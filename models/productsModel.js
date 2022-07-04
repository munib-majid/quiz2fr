const mongoose = require('mongoose');

const productschema = new mongoose.Schema({
    text :{
        type:String,
        required:true 
    },
    details :{
        type:String,
        required:true 
    },
    
 
})

module.exports= mongoose.model("Product", productschema);