import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const MongoDb_Url = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MongoDb_Url);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};


export default connectDB;
