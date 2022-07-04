const express = require('express');


const ProductController =require('../controller/productcontroller');
const controller = new ProductController();

const Router = express.Router();

Router.get("/",controller.get);

Router.get("/:id",controller.getById);

Router.delete("/:id",controller.delete);

Router.post("/",controller.create);

Router.put("/:id",controller.update);


    

// Router.get("/",controller.getAll);

module.exports = Router;