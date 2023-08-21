const express=require("express");
const { auth } = require("../Middleware/auth.middleware");
const { doctorModel } = require("../Model/doctor.model");

const doctorRouter=express.Router();
doctorRouter.use(auth);

doctorRouter.get("/",async(req,res)=>{
    try {
        const doctors=await doctorModel.find();
        console.log(doctors)
        if(doctors){
            res.status(200).json({doctors})
        }else{
            res.status(400).json({msg:"doctors not found"})
        }
    } catch (error) {
        res.status(400).json({error:error})
    }
})
doctorRouter.post("/appointments",async(req,res)=>{
    try {
        console.log(req.body);
        const appoint=new doctorModel(req.body);
        await appoint.save();
        res.json({msg:"created successfully"})

    } catch (error) {
        res.json(error)
    }
})
doctorRouter.patch("/update/:id",async(req,res)=>{
    try {
        const userID=req.body.userID;
        const docid=req.params.id;
        const doc=await doctorModel.find({_id:docid});
        const userIDinDoc=doc.userID;
        if(userID==userIDinDoc){
            await doctorModel.findByIdAndUpdate({_id:docid},req.body);
            res.status(200).json({msg:`${doc.name} has been updated`})
        }else{
            res.status(400).json({msg:"please auth"})
        }
    } catch (error) {
        res.status(400).json({error:error})
    }
})
doctorRouter.delete("/delete/:id",async(req,res)=>{
    try {
        const userID=req.body.userID;
        const docid=req.params.id;
        const doc=await doctorModel.find({_id:docid});
        const userIDinDoc=doc.userID;
        if(userID==userIDinDoc){
            await doctorModel.findByIdAndDelete({_id:docid});
            res.status(200).json({msg:`deleted`})
        }else{
            res.status(400).json({msg:"please auth"})
        }
    } catch (error) {
        res.status(400).json({error:error})
    }
})
module.exports={
    doctorRouter
}