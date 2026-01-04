const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const recordsRoutes = require("./routes/records");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/records", recordsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on the port ${PORT}`));
