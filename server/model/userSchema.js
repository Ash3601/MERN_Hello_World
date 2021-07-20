const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
        type: Number,
        required: true,
    },
    work: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
})


// hashing the password
userSchema.pre('save', async function(next) {
    const SALT_LENGTH = 12;
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, SALT_LENGTH);
        //this.cpassword = await bcrypt.hash(this.cpassword, SALT_LENGTH);
    }
    next();
})

const User = mongoose.model('User', userSchema);
module.exports = User;
