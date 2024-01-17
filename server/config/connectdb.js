import mongoose from "mongoose";

const connectDb = async (DATABASE_URL) => {
  try {
    const DB_OPTION = {
      dbName: "BaBaShop",
    };
    await mongoose.connect(DATABASE_URL, DB_OPTION);
    console.log("Database connected....");
  } catch (error) {
    console.log(error);
  }
};

// module.exports = connectDb
export default connectDb;
