const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const employeeSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  conpassword: {
    type: String,
    required: true,
  },
});
employeeSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // console.log(`The current Password is ${this.password}`)
    this.password = await bcrypt.hash(this.password, 10);
    this.conpassword = await bcrypt.hash(this.conpassword, 10);

    // console.log(`The current Password is ${this.password}`)
  }
  next();
});

//Now we need to create a Collection

const Register = new mongoose.model("Register", employeeSchema);
module.exports = Register;
