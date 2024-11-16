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
// app.use(cors(corsOption));
app.use("/users", userRoutes);
app.use("/create", createRoutes);
app.use("/uploads", express.static("uploads"));

const startServer = async () => {
  try {
    await connectDB();
    const port = process.env.PORT || 3000; 
    app.listen(port, () => {
      console.log("App is running on port 3000");
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
