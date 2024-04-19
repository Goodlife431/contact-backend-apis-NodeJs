const expressAsyncHandler = require("express-async-handler");

const registerUser = expressAsyncHandler(async (req, res) => {
    res.json({ message: 'Register the user. '})
});

const loginUser = expressAsyncHandler(async (req, res) => {
    res.json({ message: 'login  user. '})
});

const currentUser = expressAsyncHandler(async (req, res) => {
    res.json({ message: 'Current user information. '})
});

module.exports = { registerUser, loginUser, currentUser}