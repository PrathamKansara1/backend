import mongoose, { ConnectOptions } from "mongoose";

const connectDB = async () => {
  try {
    const connectionString = process.env.MONGODB_URI as string; // Replace with your MongoDB connection string
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

export default connectDB;
