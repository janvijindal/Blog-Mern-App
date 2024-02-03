import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';
import user from './routes/user.js'
import auth from './routes/auth.js'
import post from './routes/post.js'
import comment from './routes/comment.js'
import cors from 'cors'
import path from 'path';

//crreating the app
const app=express();

//using cors
app.use(cors());

const __dirname = path.resolve();

//env file connection
dotenv.config();

//body parsing middleware
app.use(express.json());
app.use(cookieParser());

//connection to databse
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });


//port No
const PORT=1500;

//routers
app.use('/api/user',user);
app.use('/api/auth',auth);
app.use('/api/post',post);
app.use('/api/comment',comment);


//checking the route
app.get('/test',(req,res)=>{
         res.json({message:"everthing is fine.."});
})


app.listen(PORT,()=>{
       console.log(`The App is running at port: ${PORT}`);
})

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

//middleware
app.use((err, req, res, next) => {
       const statusCode = err.statusCode || 500;
       const message = err.message || 'Internal Server Error';
       res.status(statusCode).json({
         success: false,
         statusCode,
         message,
       });
     });