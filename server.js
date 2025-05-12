const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Import and use router
const contactRoutes = require("./routes/contactRoutes"); // adjust path if needed
app.use("/api/contacts", contactRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
