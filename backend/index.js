const express=require('express');
const cors=require('cors');
require('dotenv').config();
const connectDB=require('./config/db');
const router=require('./routes/index');
const cookieParser=require('cookie-parser');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const app=express();
const corsOptions ={
    origin:process.env.FRONTEND_URL, 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

const PORT=8080 || process.env.PORT

let gfs;

connectDB().then(()=>{
    const conn = mongoose.connection;
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('pdfs');
    app.listen(PORT, ()=>{
        console.log("Server is running");
    });
});

app.get('/api/product/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await ProductModel.findById(productId).lean();
      if(!product) return res.status(404).json({error: 'Produs inexistent'});
      res.json(product);
    } catch (error) {
      res.status(500).json({error: 'Server error'});
    }
  });

  app.get('/api/pdf/:id', (req, res) => {
    try {
      const fileId = req.params.id;
  
      gfs.files.findOne({ _id: mongoose.Types.ObjectId(fileId) }, (err, file) => {
        if (err || !file) {
          return res.status(404).json({ error: 'File not found' });
        }
  
        if (file.contentType === 'application/pdf') {
          res.set('Content-Type', 'application/pdf');
  
          const readstream = gfs.createReadStream({
            _id: file._id
          });
  
          readstream.on('error', function (err) {
            console.log('Readstream error', err);
            res.status(500).send('Error reading file');
          });
  
          readstream.pipe(res);
        } else {
          res.status(400).json({ error: 'Not a PDF file' });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });


