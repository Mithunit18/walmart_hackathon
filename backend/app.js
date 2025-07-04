const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://walmart-hackathon-blue.vercel.app",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));


// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/stats", require("./routes/statsRoutes"));
app.use("/api/purchase", require("./routes/purchaseRoute"));
app.use("/api/requests", require("./routes/productRequestRoutes")); // ✅ NEW LINE ADDED
app.use('/api/offers', require("./routes/sellerOfferRoutes")); // adjust path if needed



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
