## Backend

1. Navega a la carpeta del backend:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia la aplicación:
   ```bash
   npm start
   ```

## Frontend

1. Navega a la carpeta del frontend:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia la aplicación:
   ```bash
   npm start
   ```

## Base de datos

se puede usar docker compose o instalar postgresql en tu maquina
en la carpeta backend ejecutar el siguiente comando

```bash
docker-compose up
```

## Endpoints

- POST /api/v1/signup

```json
{
  "firstName": "Test",
  "lastName": "Test",
  "password": "E123456$",
  "username": "Test1",
  "identification": "1310234519"
}
```

- POST /api/v1/signin

```json
{
  "username": "Test1",
  "password": "E123456$"
}
```

- POST /api/v1/logout - requiere token

- GET /api/v1/usuarios - requiere token
- POST /api/v1/usuarios - requiere token
```json
{
  "firstName": "Test",
  "lastName": "Test",
  "password": "E123456$",
  "username": "Test1",
  "identification": "1310234519"
}
```
- DELETE /api/v1/usuarios/:id - requiere token
- GET /api/v1/usuarios/:id - requiere token
- PUT /api/v1/usuarios/:id - requiere token

- GET /api/v1/login-history/:userId - requiere token - solo para admin, el ususaio puede ver su historial de logins solo si es admin, para probar esto puede iniciar sesion luego en el navbar le saldra un boton My login history, si no es admin no podra verlo y le saldra un mensaje de error, caso contrario le mostrara el historial de logins y logouts
  Para probar esto puede loguearse como user, luego desloguearse y cambiar en la base de datos en la columna role a admin, luego loguearse nuevamente y podra ver el historial de logins y logouts
