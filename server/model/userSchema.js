const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  work: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// hashing the password
userSchema.pre("save", async function (next) {
  const SALT_LENGTH = 12;
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, SALT_LENGTH);
    //this.cpassword = await bcrypt.hash(this.cpassword, SALT_LENGTH);
  }
  next();
});

// method is as sort of a session we used this property in auth while generating token
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    const isSaved = await this.save();
    if (isSaved) {
      return token;
    } else {
      console.error("An error occurred while generating token");
    }
  } catch (err) {
    console.log(err);
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
