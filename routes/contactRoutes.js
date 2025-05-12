const express = require("express");
const router = express.Router();
const { getContacts,createContact,getContact, updateContact, deleteContact } = require("../controllers/contactController");

// GET all contacts & create new
router.route("/").get(getContacts).post(createContact);

// GET a contact by ID, update or delete contact
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
