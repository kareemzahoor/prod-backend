import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { DB_NAME } from './constants.js';
import express from 'express';
import connectDB from './db/index.js';

dotenv.config({
  path: './.env',
});

connectDB();

// const app = express();
// ;(async () => {
//   try {
//     const connection = await mongoose.connect(`${process.env.MONOGODB_URI}/${DB_NAME}`);
//     console.log("🚀 ~ ; ~ connection:", connection.connection.host)
//     app.on('error', (error) => {
//       console.log('ERROR IN DATABASE CONNNECTION-->', error);
//       throw error;
//     });
//     app.listen(process.env.PORT, () => {
//       console.log(`App is running on Port ${process.env.PORT} `);
//     });
//   } catch (error) {
//     console.log('🚀 ~ error in database connection-->:', error);
//   }
// })();
