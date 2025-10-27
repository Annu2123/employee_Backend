const express =require('express')
const port=5000;
const cors=require('cors')

const configdb=require("./app/config/db")
configdb()
const app=express()

app.get("/getUser",(req,res)=>{
 const users= users.find()
    res.json(users)
})
app.listen(port,()=>{
 console.log("server is running in port 5000")
})
