const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const app=express();

app.use(express.urlencoded({ extended: true }));


const url="mongodb://127.0.0.1:27017/AppointmentScheduler";
mongoose.connect(url);

const con=mongoose.connection;
con.on('open',()=>{
  console.log('connected');
});




app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,"Public","views","register.html"));
});

const registerRouter=require('./routes/register.js');
app.use('/register',registerRouter);

app.listen(3000,()=>{
  console.log(`Server is listening on port 3000`);
})