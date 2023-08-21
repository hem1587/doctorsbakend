const express=require("express");
const { connection } = require("./db");
const { userRouter } = require("./Routes/user.route");
const { doctorRouter } = require("./Routes/doctor.route");
require(`dotenv`).config();


const app=express();
app.use(express.json());
app.use("/users",userRouter);
app.use("/doctors",doctorRouter)

app.get("/",(req,res)=>{
    res.send("welcome to home")
})

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("connected to db")
        console.log("Running at 8080")
    
        
    } catch (error) {
        console.log(error)
    }
})