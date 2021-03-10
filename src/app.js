const express=require("express")
const bcrypt =require("bcryptjs")


const app=express();
const path=require("path")
const hbs=require("hbs")
require("./db/conn")
const Register=require("./models/registers")
const port=process.env.port||80
app.use(express.json())
app.use(express.urlencoded({extended:false}))
//Setting the path of CSS
const static_path=path.join(__dirname,"../public")
app.use(express.static(static_path))
app.set("view engine","hbs")
//Setting the path of HBS
app.set('views', path.join(__dirname, '../views'));


app.get("/",(req,res)=>{
    res.render("register")

})
app.get("/home",(req,res)=>{
    res.render("index")
})

app.get("/login",(req,res)=>{
    res.render("login")
})
app.post("/reg",async(req,res)=>{
    try{
        // console.log(req.body);
        // res.send(req.body)
const password=req.body.password;
const conpassword=req.body.conpassword;
if(password===conpassword)
{
const registerEmployee=new Register({
    fname:req.body.fname,
    lname:req.body.lname,
    email:req.body.email,
   gender:req.body.gender,
   phone:req.body.phone,
   age:req.body.age,
   password:req.body.password,
   conpassword:req.body.conpassword,


})

//Pasword Hash

const result=await registerEmployee.save();
res.send(`<script>alert("✅Registered Successfully✅"); window.location.href = "/"; </script>`);

}
else{
    res.send(`<script>alert("⚠️Passwords are Not Matching⚠️"); window.location.href = "/"; </script>`);
}

    }catch(e)
    {console.log(e)
        res.send(`<script>alert("⚠️Not Registered.Please Enter the Data Correctly⚠️"); window.location.href = "/"; </script>`);
    }
})
app.post("/log",async(req,res)=>{
try{const email=req.body.email;
    const password=req.body.password;
const result=await Register.findOne({email:email})
const isMatch=await bcrypt.compare(password,result.password)
if(isMatch)
{
    
    res.render("index",{fname:result.fname +" "+  result.lname,email:result.email,gender:result.gender,phone:result.phone,age:result.age})

}
else
{
res.send(`<script>alert("⚠️Invalid Email or Password⚠️"); window.location.href = "/login"; </script>`);


}

}catch(e)
{
    res.send(`<script>alert("⚠️Invalid Email or Password⚠️"); window.location.href = "/"; </script>`);
}
})
app.listen(port,()=>{
    console.log("App is Running")
})