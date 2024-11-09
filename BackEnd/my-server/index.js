import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import dotenv from "dotenv"
import userRoutes from "./routes/User.js";
import createRoutes from "./routes/Create.js";

const app = express();
app.use(express.json());
dotenv.config();


// const corsOption = {
//   origin: "http://localhost:5173",
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//   credentials: true,
// };
// app.use((err, req, res, next) => {
//   const status = err.statusCode || 500;
//   const message = err.message || "An unexpected error occurred.";
//   res.status(status).json({ message });
// });

const allowedOrigins = [
  "https://workforcepanel-1.onrender.com",
  "http://localhost:5173",
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
    const port = process.env.PORT || 3000,
    app.listen(port, () => {
      console.log("App is running on port 3000");
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
