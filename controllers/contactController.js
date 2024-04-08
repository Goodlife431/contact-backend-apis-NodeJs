const express = require('express');
const router = express.Router();
//@desc get all contacts 
//@route GET /api/contacts
//access public 
const getContacts = (req, res) => {
    res.status(200).json({ message: "get all contacts"});
};

//desc crate new contacts 
//@route POST /api/contacts
const createContacts = (req, res) => {
    console.log("The request body", req.body);
    const {name, email, phone} = req.body;
    if (!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are required")
    }
    res.status(200).json({ message: "create contacts"});
};

const getContact = (req, res) => {
    res.status(200).json({ message: `get contacts for ${req.params.id}`});
};

const updateContacts = (req, res) => {
    res.status(200).json({ message: `Update contacts for ${req.params.id}`});
};

const deleteContacts = (req, res) => {
    res.status(200).json({ message: `delete contacts for ${req.params.id} `});
};

module.exports = {
    getContacts,
    createContacts,
    getContact,
    updateContacts,
    deleteContacts
}