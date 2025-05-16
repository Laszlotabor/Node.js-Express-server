const asyncHandler = require("express-async-handler");

const Contact = require("../models/contactModel");

// @desc Get all contacts
// @route GET/api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});
// @desc create new contact
// @route POST/api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
  console.log("The requested body is: ", req.body);
  const { name, email, phone } = req.body;
  if (!email || !name || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  res.status(201).json(contact);
});

// @desc get contact
// @route GET/api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
  console.log("Requested ID:", req.params.id);
  const contact = await Contact.findById(req.params.id);
  console.log("Found contact:", contact);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});


// @desc update contact
// @route UPDATE/api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Update contact" });
});

// @desc delete contact
// @route DELETE/api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Delete contact" });
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
