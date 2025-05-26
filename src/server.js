import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import { connectDB } from './config/db.js';
import './config/passport.js'; // Solo esto alcanza

import userRoutes from './routes/users.routes.js';
import productRoutes from './routes/products.routes.js';
import cartRoutes from './routes/carts.routes.js';
import sessionRoutes from './routes/sessions.routes.js';
import mocksRoutes from './routes/mocks.router.js';

dotenv.config();

const app = express();

// Middlewares base
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/mocks', mocksRoutes);

// Ruta de prueba
app.get('/ping', (req, res) => {
    res.send('🏓 Pong desde Conecta Bien API');
});

// Conexión y arranque
const PORT = process.env.PORT || 8080;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
};

startServer();