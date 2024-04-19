const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt")
const User = require("../models/userModel");


const registerUser = expressAsyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const availableUser = await User.findOne({email});
    if(availableUser){
        res.status(400);
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password:", hashedPassword);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log("User created", user);
    if (user){
        res.status(201).json({_id: user._id, email: user.email});
    }else {
        res.status(400);
        throw new Error("User data is not found");
    }
    res.json({ message: 'User has been registered.'})
});

const loginUser = expressAsyncHandler(async (req, res) => {
    res.json({ message: 'login  user. '})
});

const currentUser = expressAsyncHandler(async (req, res) => {
    res.json({ message: 'Current user information. '})
});

module.exports = { registerUser, loginUser, currentUser}