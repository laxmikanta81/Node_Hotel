const express=require('express');
const app = express()
const db=require('./db');
const Person=require('./models/Person');
const MenuItem=require('./MenuItem');
const bodyParser=require('body-parser');
app.use(bodyParser.json());//req.body

app.get('/', (req, res) => {
  res.send('how can i help you');
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


app.post('/person',async(req,res)=>{
  try{
  const data=req.body;
  const newPerson=new Person(data);
  const response=await newPerson.save();
  console.log('data saved successfully');
  res.status(200).json(response);
}
  catch(err){
      console.log(err);
      res.status(500).json({error:'internal server error'});
  }
})
//get method to get the person details
app.get('/person',async(req,res)=>{
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