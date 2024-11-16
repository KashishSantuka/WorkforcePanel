import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/User.js";
import createRoutes from "./routes/Create.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Logging middleware to see incoming requests
app.use((req, res, next) => {
  console.log(`Incoming request origin: ${req.headers.origin}`); // Logs request origin
  console.log(`Request URL: ${req.url}`); // Logs request URL
  next();
});

// CORS Middleware
const allowedOrigins = [
  "https://workforcepanel-1.onrender.com",
  "http://localhost:5173",
  "https://workforcepanel.onrender.com",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`Blocked by CORS: ${origin}`);
        callback(
          new Error("CORS policy does not allow access from this origin."),
          false
        );
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Serve static files from the frontend build folder
app.use(express.static("/opt/render/project/src/FrontEnd/dist"));

// Catch-all route for React Router
app.get("*", (req, res) => {
  res.sendFile("/opt/render/project/src/FrontEnd/dist/index.html");
});

// Start the server
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
