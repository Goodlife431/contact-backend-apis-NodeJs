const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt")
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");


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
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }
    const user = await User.findOne({email});
    if (user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                _id: user._id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: 3600,
        }
        );
        res.status(200).json({ accessToken});
    }else {
        res.status(401);
        throw new Error("Email or password is not valid")
    }
    res.json({ message: 'login  user. '});
});

const currentUser = expressAsyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser}