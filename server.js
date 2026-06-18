const express=require('express');
const app = express()
const db=require('./db');
const Person=require('./models/Person');
const MenuItem=require('./models/MenuItem');
const bodyParser=require('body-parser');
const passport = require('./auth');
const bcrypt = require('bcrypt');
const{jwtAuthMiddleware,geneateToken}=require('./jwt');
app.use(bodyParser.json());//req.body
 
//middleware funtion

// Middleware Function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next(); // Move on to the next phase
}
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false})
app.get('/',localAuthMiddleware,(req, res) => {
  res.send('WELCOME TO HOTEL');
})
app.post('/menu',async(req,res)=>{
  try{
    const data=req.body;
    const NewMenu=new MenuItem(data);
    const response=await NewMenu.save();
    console.log('data saved successfully');
    res.status(200).json(response);
  }catch(err){
      console.log(err);
      res.status(500).json({error:'internal server error'});
  }
})
//get method to get the Menu Item details
app.get('/menu',async(req,res)=>{
  try{
    const data=await MenuItem.find();
    console.log('data fatched successfully');
    res.status(200).json(data);
  } catch(err){
      console.log(err);
      res.status(500).json({error:'internal server error'});
  }
})


app.post('/signup', async (req, res) => {
  try {
    const data = req.body; // taking data directly from request body
    const newPerson = new Person(data); // creating new Person document
    await newPerson.save(); // saving to database
    console.log('data saved');
    const payload={
      id:newPerson.id,
      username:newPerson.username
    }
    const token=geneateToken(payload);
    console.log("Token is :",token);
    res.status(200).json({newPerson:newPerson,token:token}); // sending back saved document
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/login',async(req,res)=>{
  try{
    const{username,password}=req.body;
    const user =await Person.findOne({username:username});
    if(!user ||!(await user.comparePassword(password))){
      return res.status(401).json({error:'Invalid Username or Password'});
    }
    const payload={
      id:user.id,
      username:user.username
    }
    const token=geneateToken(payload);
     res.status(200).json({ token });

    //return token as response
  }catch(err){
    console.error(err);
    res.status(500).json({error:'Internal Server Error'});
  }
});
//get method to get the person details
app.get('/person',jwtAuthMiddleware,async(req,res)=>{
  try{
    const data=await Person.find();
    console.log('data fatched successfully');
    res.status(200).json(data);
  }catch(err){
      console.log(err);
      res.status(500).json({error:'internal server error'});
  }
}) 
  
// app.get('/hi', (req, res) => {
//   res.send('how can i help you');
// })
// app.get('/whoareyou',(req,res) => {
//     res.send("i am server and here to help you to bring data.");
// })
// app.post('/items',(req,res)=>{
//   res.send('saved');
//   console.log("data is saved");`h`
// });
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
})