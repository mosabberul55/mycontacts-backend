//@desc Get all contacts
//@route GET /api/contacts
//@access Public

const getContacts = (req, res) => {
    res.status(200).json({ message: "GET request to the homepage" });
}
//@desc Create a contact
//@route POST /api/contacts
//@access Public
const createContact = (req, res) => {
    console.log(req.body);
    const {name, email, phone} = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    res.status(201).json({ message: "POST request to the homepage" });
}
//@desc Get a contact
//@route GET /api/contacts/:id
//@access Public
const getContact = (req, res) => {
    res.status(200).json({ message: `GET request to the homepage with id ${req.params.id}` });
}
//@desc Update a contact
//@route PUT /api/contacts/:id
//@access Public
const updateContact = (req, res) => {
    res.status(201).json({ message: `PUT request to the homepage with id ${req.params.id}` });
}
//@desc Delete a contact
//@route DELETE /api/contacts/:id
//@access Public
const deleteContact = (req, res) => {
    res.status(200).json({ message: `DELETE request to the homepage with id ${req.params.id}` });
}


module.exports = {getContacts, createContact, getContact, updateContact, deleteContact};