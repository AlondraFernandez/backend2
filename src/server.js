import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 8080;

const startServer = async () => {
    try {
        if (process.env.NODE_ENV !== 'test') {
            await connectDB();
            app.listen(PORT, () => {
                console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
            });
        }
    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

startServer();