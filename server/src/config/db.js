import mongoose from 'mongoose';

export const connectDB = async (mongoUri) => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(mongoUri, {
      autoIndex: true
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Mongo connection error', error.message);
    process.exit(1);
  }
};
