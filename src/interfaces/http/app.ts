import express, { Express } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import { errorHandler, notFoundHandler } from '../../shared/http/errorHandler';
import { requireAuth } from '../../shared/http/auth';

import { jugadorRouter } from '../../modules/jugadores/interfaces/http/jugador.routes';
import { categoriaRouter } from '../../modules/categorias/interfaces/http/categoria.routes';
import { convocatoriaRouter } from '../../modules/convocatorias/interfaces/http/convocatoria.routes';
import { entrenamientoRouter } from '../../modules/entrenamientos/interfaces/http/entrenamiento.routes';
import { estadisticaRouter } from '../../modules/estadisticas/interfaces/http/estadistica.routes';
import { finanzaRouter } from '../../modules/finanzas/interfaces/http/finanza.routes';
import { lesionRouter } from '../../modules/lesiones/interfaces/http/lesion.routes';
import { notificacionRouter } from '../../modules/notificaciones/interfaces/http/notificacion.routes';
import { okrRouter } from '../../modules/okr/interfaces/http/okr.routes';
import { partidoRouter } from '../../modules/partidos/interfaces/http/partido.routes';
import { torneoRouter } from '../../modules/torneos/interfaces/http/torneo.routes';
import { usuarioRouter } from '../../modules/usuarios/interfaces/http/usuario.routes';

export function createApp(): Express {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => res.json({ status: 'ok' }));

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (_req, res) => res.json(swaggerSpec));

  app.use('/api', requireAuth);

  app.use('/api/jugadores', jugadorRouter);
  app.use('/api/categorias', categoriaRouter);
  app.use('/api/convocatorias', convocatoriaRouter);
  app.use('/api/entrenamientos', entrenamientoRouter);
  app.use('/api/estadisticas', estadisticaRouter);
  app.use('/api/finanzas', finanzaRouter);
  app.use('/api/lesiones', lesionRouter);
  app.use('/api/notificaciones', notificacionRouter);
  app.use('/api/okr', okrRouter);
  app.use('/api/partidos', partidoRouter);
  app.use('/api/torneos', torneoRouter);
  app.use('/api/usuarios', usuarioRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
