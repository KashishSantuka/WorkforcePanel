import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import dotenv from "dotenv"
import userRoutes from "./routes/User.js";
import createRoutes from "./routes/Create.js";
import path from "path";
import { fileURLToPath } from 'url';

const app = express();
app.use(express.json());
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the correct frontend dist folder
app.use(express.static(path.join(__dirname, "../FrontEnd/dist"))); // Adjust this path

// Catch-all route for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd/dist", "index.html")); // Adjust this path
});


const allowedOrigins = [
  "https://workforcepanel-1.onrender.com",
  "http://localhost:5173",
  "https://workforcepanel.onrender.com",
  "http://localhost:3000",
];    

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

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
