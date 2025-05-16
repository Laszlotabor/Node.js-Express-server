const express = require("express");
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

connectDB();

const app = express();
const port = process.env.PORT || 5000;

const contactRoutes = require("./routes/contactRoutes"); // adjust path if needed

// Middleware to parse JSON
app.use(express.json());

// Import and use router

app.use("/api/contacts", contactRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

