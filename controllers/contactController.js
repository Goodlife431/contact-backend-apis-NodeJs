const express = require('express');
const router = express.Router();
const Contact = require("../models/contactModel");
const asyncHandler = require('express-async-handler');
//@desc get all contacts 
//@route GET /api/contacts
//access public 
const getContacts = asyncHandler( async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id});
    res.status(201).json(contacts);
});

//desc crate new contacts 
//@route POST /api/contacts
const createContacts = asyncHandler(async (req, res) => {
    console.log("The request body", req.body);
    const {name, email, phone} = req.body;
    if (!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are required")
    }
    const newContact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    res.status(201).json(newContact);
});

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(201).json(contact);
});

const updatedContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update contact");
    }
})

const updateContacts = asyncHandler(async (req, res) => {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body,
         { new: true }
    );
    res.status(201).json(updatedContact);
});

const deleteContacts = asyncHandler(async (req, res) => {
    const deleteContacts = await Contact.findByIdAndDelete(req.params.id);
    if (!deleteContacts){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(deleteContacts.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update contact");
    }
    res.status(201).json(deleteContacts);
});

module.exports = {
    getContacts,
    createContacts,
    getContact,
    updateContacts,
    deleteContacts
}