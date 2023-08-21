const mongoose=require("mongoose");

const doctorSchema=mongoose.Schema({
    name: String,
    image: String,
    specialization: String,
    experience: Number,
    location: String,
    date: String,
      slots : Number,
    fee: Number
},{
    versionKey:false
})
const doctorModel=mongoose.model("doctors",doctorSchema)

module.exports={
    doctorModel
}