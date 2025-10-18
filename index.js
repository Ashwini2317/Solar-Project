const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const errorHandler = require("./middleware/errorHandler")

const app = express()
require("dotenv").config()

app.use(express.json())
app.use(express.static("dist"))

app.use(cookieParser())
app.use(cors({ origin: "http://localhost:5173", credentials: true }))

app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/admin", require("./routes/adminRoute"))
app.use("/api/contact", require("./routes/contactRoutes"))

app.use(errorHandler)

mongoose.connect(process.env.MONGO_URL, {
  serverSelectionTimeoutMS: 5000,
  family: 4
})
  .then(() => {
    console.log("✅ MongoDB connection successful");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    console.error("\n🔍 Troubleshooting tips:");
    console.error("1. Check your internet connection");
    console.error("2. Verify MongoDB Atlas cluster is active (not paused)");
    console.error("3. Check if your IP address is whitelisted in MongoDB Atlas");
    console.error("4. Verify the connection string in .env file");
    process.exit(1);
  });

