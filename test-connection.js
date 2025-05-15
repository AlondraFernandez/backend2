import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conexión a MongoDB Atlas exitosa');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error conectando a MongoDB Atlas:', err);
    process.exit(1);
  });
