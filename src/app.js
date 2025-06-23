import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport'
import './config/passport.js'
import userRoutes from './routes/users.routes.js'
import productRoutes from './routes/products.routes.js'
import cartRoutes from './routes/carts.routes.js'
import sessionRoutes from './routes/sessions.routes.js'
import mocksRoutes from './routes/mocks.router.js';
import { swaggerSpecs, swaggerUi } from './config/swagger.js';
import adoptionRouter from './routes/adoption.router.js';

dotenv.config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize())


app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/carts', cartRoutes)
app.use('/api/sessions', sessionRoutes)
app.use('/api/mocks', mocksRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/api/adoptions', adoptionRouter);

// Prueba inicial
app.get('/', (req, res) => {
    res.send('Conecta Bien API');
});

export default app;