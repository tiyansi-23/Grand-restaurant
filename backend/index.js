import express from "express";
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

const users=[
    {
        email:"tiyansi",
        password:"12345"
    }
]


app.get('/remove',(req,res)=>{
    const {email,password} = req.body

    const e=users.push({email:email,password:password})

    console.log(e,"    ",users)
    res.json(users)
})

app.post('/add',(req,res)=>{
    const {email,password} = req.body

    console.log(email,"    ",password);
    res.send({email,password})
})

app.get('/',(req,res)=>{
    console.log("root started");
    res.send("API Working")
})

app.listen(5000,()=>{
    console.log("server started");
    
})