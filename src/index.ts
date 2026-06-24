import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './interfaces/http/app';

const PORT = Number(process.env.PORT) || 4000;

createApp().listen(PORT, () => {
  console.log(`Datagoal Backend API escuchando en http://localhost:${PORT}`);
  console.log(`Swagger UI disponible en http://localhost:${PORT}/api-docs`);
});
