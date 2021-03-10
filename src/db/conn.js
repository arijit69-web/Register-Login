const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/YoutubeRegistration",{
useNewUrlParser:true,
useCreateIndex:true,
useUnifiedTopology:true
}).then(()=>{
    console.log("DB connected")
}).catch((e)=>
{
    console.log("DB Connection Failed")
})
