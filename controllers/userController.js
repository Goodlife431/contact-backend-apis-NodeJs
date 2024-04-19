const expressAsyncHandler = require("express-async-handler");

const registerUser = expressAsyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const availableUser = await User.findOne( {email});
    if(availableUser){
        res.status(400);
        throw new Error("User already exists");
    }
    res.json({ message: 'Register the user. '})
});

const loginUser = expressAsyncHandler(async (req, res) => {
    res.json({ message: 'login  user. '})
});

const currentUser = expressAsyncHandler(async (req, res) => {
    res.json({ message: 'Current user information. '})
});

module.exports = { registerUser, loginUser, currentUser}