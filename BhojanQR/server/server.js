const dotenv = require("dotenv");
dotenv.config(); // Moved up, only needs to be called once

const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const connectDb = require("./config/dataBase");
const cookieParser = require("cookie-parser");
const path = require("path")


const adminRoutes = require("./routes/adminRoutes");
const menuRoutes = require('./routes/menuRoutes');
const contactRoutes = require('./routes/contactRoutes');
const orderRoutes = require("./routes/orderRoutes");
const orderReceivedRoutes = require("./routes/orderReceiveRoutes");
const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Default Route
app.get("/", (req, res) => {
  res.send("BhojanQR API is Running...");
});

// Routes
app.use("/api/admin", adminRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/contact', contactRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/orderreceived", orderReceivedRoutes);



// Connect to DB
connectDb();

// Server Listening
const server = app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
