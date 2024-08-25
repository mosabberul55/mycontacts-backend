const asyncHandler = require('express-async-handler');
const Contact = require('../models/ContactModel');

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id}).populate("user_id", "name email");
    res.status(200).json(contacts);
});
//@desc Create a contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler( async (req, res) => {
    const {name, email, phone} = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const contact = new Contact({
        name, email, phone, user_id: req.user.id
    });
    const createdContact = await contact.save();
    res.status(201).json(createdContact);
});
//@desc Get a contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
})
//@desc Update a contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const {name, email, phone} = req.body;
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Not authorized");
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, {name, email, phone}, {new: true});
    res.status(200).json(updatedContact);
})
//@desc Delete a contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Not authorized");
    }
    await contact.deleteOne();
    res.status(200).json({message: "Contact removed"});
})


module.exports = {getContacts, createContact, getContact, updateContact, deleteContact};