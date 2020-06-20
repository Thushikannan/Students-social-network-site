const express=require('express');
const app=express();
const morgan=require('morgan');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');


const userRoutes=require('./API/routes/UserRoutes');
const postRoutes=require('./API/routes/post');


const VideoRoutes=require('./API/routes/postVideo');

mongoose.connect('mongodb://localhost/ssm',{useNewUrlParser:true});
mongoose.connection.once('open',function(){
    console.log('connection Success!');
})

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use('/posts', express.static('posts'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });
  



app.use('/Video',VideoRoutes);

//USER ROUTS
app.use('/User',userRoutes);
app.use('/Postt',postRoutes);
//error handling
app.use((req,res,next)=>{
const error=new Error('Not Found');
error.status(404);
next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
            error:{
                message:error.message
            }
    });
});

module.exports=app;