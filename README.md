🌤️ Aplicación del Clima
Aplicación web full stack que permite consultar el clima en tiempo real de cualquier ciudad del mundo. Incluye sistema de autenticación con registro e inicio de sesión de usuarios.
🔗 Demo en vivo: lui-max.github.io/app-clima

🏗️ Arquitectura
Frontend (React)          Backend (Node/Express)       Base de datos
GitHub Pages        →     Railway                  →   MySQL (Railway)
lui-max.github.io         mi-backend-production             ↑
                          -dfcf.up.railway.app          Usuarios registrados
                               ↓
                        OpenWeatherMap API

✨ Funcionalidades

🔐 Registro e inicio de sesión de usuarios
🌡️ Consulta del clima actual por ciudad
📅 Pronóstico de los próximos días
🌬️ Datos de temperatura, humedad y viento
🔄 Cambio entre °C y °F
🚪 Cierre de sesión


🛠️ Stack tecnológico
Frontend
TecnologíaUsoReactLibrería principal de UIJavaScriptLenguaje baseCSSEstilos y diseño responsiveGitHub PagesDeploy del frontend
Backend
TecnologíaUsoNode.jsEntorno de ejecuciónExpressFramework HTTPbcryptHash seguro de contraseñasJWTAutenticación con tokensMySQLBase de datos relacionalRailwayDeploy del backend y DB
API Externa
ServicioUsoOpenWeatherMapDatos del clima en tiempo real

🔒 Seguridad

Contraseñas hasheadas con bcrypt (salt rounds: 10)
Autenticación mediante JSON Web Tokens (JWT)
Variables de entorno para credenciales sensibles
Validación de campos en frontend y backend


🚀 Correr localmente
Frontend
bashgit clone https://github.com/lui-max/app-clima
cd app-clima
npm install
npm start
Backend
bashgit clone https://github.com/lui-max/mi-backend
cd mi-backend
npm install
Crea un archivo .env con:
DB_HOST=tu_host
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=tu_base_de_datos
JWT_SECRET=tu_secreto
bashnode index.js

📡 Endpoints del API
MétodoEndpointDescripciónPOST/registroRegistra un nuevo usuarioPOST/loginInicia sesión y devuelve JWT

👤 Autor
Luis Angel Alvarez Quijandria — github.com/lui-max