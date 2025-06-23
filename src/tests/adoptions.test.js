import request from 'supertest';
import app from '../server.js'; // Asegúrate de que la ruta al archivo del servidor sea correcta
let uid = 'user123';
let pid = 'pet456';
let aid;

describe('Adoption Routes', () => {
    test('GET /api/adoptions/ debe devolver todas las adopciones', async () => {
        const res = await request(app).get('/api/adoptions');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('POST /api/adoptions/:uid/:pid debe crear una adopción', async () => {
        const res = await request(app).post(`/api/adoptions/${uid}/${pid}`);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('adoptionId');
        aid = res.body.adoptionId;
    });

    test('GET /api/adoptions/:aid debe devolver una adopción por ID', async () => {
        const res = await request(app).get(`/api/adoptions/${aid}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('_id');
    });
});