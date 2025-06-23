# 🐶 Conecta Bien API

Este proyecto es una API para gestionar adopciones de mascotas, usuarios y carritos de productos. Implementa autenticación JWT, documentación con Swagger, tests funcionales y está dockerizado para despliegue inmediato.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB + Mongoose
- Passport (JWT & Local Strategy)
- Swagger para documentación
- Jest / Supertest para testing
- Docker

---

## 🧪 Comandos útiles

```bash
# Instalar dependencias
npm install

# Ejecutar servidor en desarrollo
npm run dev

# Ejecutar tests
npm test
📦 Endpoints principales
POST /api/sessions/register

POST /api/sessions/login

GET /api/sessions/current (con JWT en cookies)

GET /api/products

GET /api/carts (con JWT)

y más...

La documentación completa está disponible en:

bash
Copiar código
http://localhost:3000/api-docs
🐳 Docker
🔨 Construcción manual
bash
Copiar código
docker build -t alofernandez/conecta-bien-api .
▶️ Ejecución local
bash
Copiar código
docker run -p 3000:3000 alofernandez/conecta-bien-api
☁️ Imagen en DockerHub
🔗 Link a la imagen Docker pública:
👉 https://hub.docker.com/r/alofernandez/conecta-bien-api

🔐 Variables de entorno (.env)
env
Copiar código
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/conectabien
JWT_SECRET=tu_clave_secreta
🧪 Tests disponibles
Incluye pruebas funcionales para los endpoints del router adoption.router.js utilizando Supertest.

📚 Documentación Swagger
La documentación de todos los endpoints del módulo Users está disponible mediante Swagger en la ruta /api-docs.

🐙 GitHub Actions
Este repositorio contiene un workflow en .github/workflows/docker-publish.yml que:

Construye la imagen automáticamente

La sube a DockerHub en cada push al branch main