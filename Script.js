const express=require('express')
const bodyParse=require('body-parser')
const mongoose=require('mongoose')
const{todoModel}=require('./model')


let app=express()
app.use(bodyParse.urlencoded({extended:true}))
app.use(bodyParse.json())

mongoose.connect("mongodb+srv://suryapp:suryapp@cluster0.qq01r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")


app.get('/contact',(req,res)=>{
  res.send("hello world")  
})

app.post('/add',async(req,res)=>{
  console.log(req.body)
  let todo=new todoModel(req.body)
  let result=await todo.save()
  res.json(result)
})  

app.get('/view',async(req,res)=>{
  try {
    var result=await todoModel.find()
    res.json(result)
  } 
  catch (error) {
    res.send(500).send(error)
    
  }
})

app.post('/delete',async(req,res)=>{
   
  try{
var result=await todoModel.findByIdAndDelete(req.body)
res.json({"status":"Succesfully Deleted"})

  }
  catch(error)
  {
      res.send(500).json({"status":error})

  }
  
})

app.post('/searchsingle',async (req,res)=>{
  try{
  
         var result=await todoModel.find(req.body)
          res.json(result)
  
  }
  catch(error)
  {
      res.status(500).send(error)
  
  }
  
  })

app.post('/update',async(req,res)=>{

  try{
   var result=await todoModel.findByIdAndUpdate(req.body._id,req.body)
   res.json({"status":"succesfully  Updated"})
  }
  catch(error)
  {
   res.send(500).json({"status":error})

  }

})



app.listen(8080,()=>{
    console.log('running.....')
})