import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import passport from './config/passport.js';
import { connectDB } from './config/db.js';

import sessionsRouter from './routes/sessions.js';
import productRouter from './routes/products.js';
import cartRouter from './routes/carts.js';

dotenv.config(); // Muy importante que esté antes de usar process.env

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize()); // Aquí se inicializa passport

// Rutas
app.use('/api/sessions', sessionsRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

// Conectar a la base de datos y levantar el servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
  });
});

