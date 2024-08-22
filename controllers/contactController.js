//@desc Get all contacts
//@route GET /api/contacts
//@access Public

const getContacts = (req, res) => {
    res.status(200).json({ message: "GET request to the homepage" });
}

const createContact = (req, res) => {
    res.status(201).json({ message: "POST request to the homepage" });
}

const getContact = (req, res) => {
    res.status(200).json({ message: `GET request to the homepage with id ${req.params.id}` });
}

const updateContact = (req, res) => {
    res.status(200).json({ message: `PUT request to the homepage with id ${req.params.id}` });
}

const deleteContact = (req, res) => {
    res.status(200).json({ message: `DELETE request to the homepage with id ${req.params.id}` });
}
module.exports = {getContacts, createContact, getContact, updateContact, deleteContact};