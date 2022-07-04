const ProductModel = require('../models/productsModel');

class ProductController {
    async get(req,res,next) {
        try{
            let product = await ProductModel.find();
            return res.status(200).json({success:true,message:'sucessfull get',data:product});
        }catch(err){
            return res.status(422).json({success:false,message:err.message});
        }

    }
    async getById(req,res,next){
       try{
        let {id} = req.params;
        let product= await ProductModel.findOne({_id:id});
        return res.status(200).json({success:true,message:'sucessfull get by id',data:product});
       }catch(err){
        return res.status(422).json({success:false,message:err.message});
       }
    }
    async create(req, res,next){
        try{ 
            let{text,details}=req.body; 
            let product= await ProductModel.create({text,details});
            return res.status(200).json({success:true,message:'sucessfull created product',data:product});
        }
        catch(err){
            return res.status(422).json({success:false,message:err.message});
        }
    }
    async delete(req,res,next){
        try{
            let {id} = req.params;
            let product= await ProductModel.findByIdAndDelete({_id:id});
            return res.status(200).json({success:true,message:'sucessfull deleted todo',data:product});
        }catch(err){
            return res.status(422).json({success:false,message:err.message});

        }
        
    }
    async update(req,res,next){
        try{
            let {id} = req.params;
            let{text,details}=req.body; 
            let product= await ProductModel.findOneAndUpdate({_id:id},{text,details},{new:true});
            return res.status(200).json({success:true,message:'sucessfull updated prodcut',data:product});
        }catch(err){
            return res.status(422).json({success:false,message:err.message});

        }
    }

}
module.exports=ProductController;
