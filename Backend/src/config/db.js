const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;
    
    // Check if we should use memory server (e.g. if URI is local)
    if (uri.includes('localhost') || uri.includes('127.0.0.1')) {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
      console.log('Using in-memory MongoDB because local MongoDB is not available.');
    }

    const conn = await mongoose.connect(uri, {
      // Options are no longer required in Mongoose 6+, but good for backwards compatibility if needed
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
