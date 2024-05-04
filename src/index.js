import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';

dotenv.config({
  path: './.env',
});

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.on('error', (error) => {
      console.log("Erorr in sever!!", error);
      throw error;
    });
    app.listen(PORT, () => {
      console.log(`Server is running on`, PORT);
    });
  })
  .catch((error) => {
    console.log('MongoDB connection failed!!', error);
  });

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
