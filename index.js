const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const dotenv = require('dotenv').config();
// const ToDoRouter = require('./routes/TodoRoutes');
const app = express();
const ProductRouter = require('./route/productroute');
const multer = require("multer");

app.use(express.json());
app.use(cors());
app.use('/product',ProductRouter);

let PORT = process.env.PORT || 5000;

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now()+path.parse(file.originalname).name  + path.extname(file.originalname));
//   },
 
// });
// const upload = multer({ storage: storage, fileFilter: (req, file, cb) => {
//   console.log(file.mimetype);
//   if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//       cb(null, true);
//   } else {
//       cb(null, false);
//       const err = new Error('Only .png, .jpg and .jpeg format allowed!')
//       err.name = 'ExtensionError'
//       return cb(err);
//   }
// }, });
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));