import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import userRoutes from "./routes/User.js";
import createRoutes from "./routes/Create.js";

const app = express();
app.use(express.json());

const corsOption = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};
// app.use((err, req, res, next) => {
//   const status = err.statusCode || 500;
//   const message = err.message || "An unexpected error occurred.";
//   res.status(status).json({ message });
// });

app.use(cors(corsOption));
app.use("/users", userRoutes);
app.use("/create", createRoutes);
app.use("/uploads", express.static("uploads"));

const startServer = async () => {
  try {
    await connectDB();
    app.listen(3000, () => {
      console.log("App is running on port 3000");
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
