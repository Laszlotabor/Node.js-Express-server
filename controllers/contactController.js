const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
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
  const { id } = req.params;
  console.log("Requested ID:", id);

  // Check if ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid ID format");
  }

  const contact = await Contact.findById(id);
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
  const contact = await Contact.findById(req.params.id);
 

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

// @desc delete contact
// @route DELETE/api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  await Contact.deleteOne({ _id: req.params.id });

  res.status(200).json({ message: `Deleted contact with id ${req.params.id}` });
});


module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
