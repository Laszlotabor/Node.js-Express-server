// @desc Get all contacts
// @route GET/api/contacts
//@access public
const getContacts = (req, res) => {
  res.status(200).json({ message: "Get all contacts" });
};
// @desc create new contact
// @route POST/api/contacts
//@access public
const createContact = (req, res) => {
    res.status(201).json({ message: "Create new contact" });
};
  
// @desc get contact
// @route GET/api/contacts/:id
//@access public
const getContact = (req, res) => {
    res.status(200).json({ message: "Get contact" });
};
  
// @desc update contact
// @route UPDATE/api/contacts/:id
//@access public
const updateContact = (req, res) => {
    res.status(200).json({ message: "Update contact" });
};

// @desc delete contact
// @route DELETE/api/contacts/:id
//@access public
const deleteContact = (req, res) => {
    res.status(200).json({ message: "Delete contact" });
};

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact}