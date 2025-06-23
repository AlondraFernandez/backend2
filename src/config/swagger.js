import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Conecta Bien API',
            version: '1.0.0',
            description: 'Documentación de la API para el módulo Users',
        },
        servers: [
            {
                url: 'http://localhost:8080', 
            },
        ],
    },
    apis: ['./src/routes/*.js'], 
};

export const swaggerSpecs = swaggerJSDoc(swaggerOptions);
export { swaggerUi };