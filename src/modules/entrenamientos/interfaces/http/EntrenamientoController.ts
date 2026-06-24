import { Request, Response } from 'express';
import { getSupabaseClient } from '../../../../shared/config/supabaseClient';
import { SupabaseEntrenamientoRepository } from '../../infrastructure/SupabaseEntrenamientoRepository';
import { EntrenamientoMapper } from '../../infrastructure/EntrenamientoMapper';
import { CreateEntrenamientoUseCase } from '../../use-cases/CreateEntrenamientoUseCase';
import { DeleteEntrenamientoUseCase } from '../../use-cases/DeleteEntrenamientoUseCase';
import { GetEntrenamientoByIdUseCase } from '../../use-cases/GetEntrenamientoByIdUseCase';
import { GetEntrenamientosUseCase } from '../../use-cases/GetEntrenamientosUseCase';
import { UpdateEntrenamientoUseCase } from '../../use-cases/UpdateEntrenamientoUseCase';
import { GetJugadoresConAsistenciaUseCase } from '../../use-cases/GetJugadoresConAsistenciaUseCase';
import { GuardarAsistenciasBulkUseCase } from '../../use-cases/GuardarAsistenciasBulkUseCase';
import { GetReportesAsistenciaUseCase } from '../../use-cases/GetReportesAsistenciaUseCase';
import { GetRawAsistenciasUseCase } from '../../use-cases/GetRawAsistenciasUseCase';
import { GetAsistenciasPorJugadorUseCase } from '../../use-cases/GetAsistenciasPorJugadorUseCase';
import { GetJugadoresRegistradosCountUseCase } from '../../use-cases/GetJugadoresRegistradosCountUseCase';

function repo() {
  return new SupabaseEntrenamientoRepository(getSupabaseClient());
}

export const EntrenamientoController = {
  async list(req: Request, res: Response): Promise<void> {
    const categoria = typeof req.query.categoria === 'string' ? req.query.categoria : undefined;
    const entrenamientos = await new GetEntrenamientosUseCase(repo()).execute({ categoria });
    res.json(entrenamientos.map(EntrenamientoMapper.toDTO));
  },

  async getById(req: Request, res: Response): Promise<void> {
    const entrenamiento = await new GetEntrenamientoByIdUseCase(repo()).execute(req.params.id);
    res.json(EntrenamientoMapper.toDTO(entrenamiento));
  },

  async create(req: Request, res: Response): Promise<void> {
    const entrenamiento = await new CreateEntrenamientoUseCase(repo()).execute(req.body);
    res.status(201).json(EntrenamientoMapper.toDTO(entrenamiento));
  },

  async update(req: Request, res: Response): Promise<void> {
    const entrenamiento = await new UpdateEntrenamientoUseCase(repo()).execute(req.params.id, req.body);
    res.json(EntrenamientoMapper.toDTO(entrenamiento));
  },

  async remove(req: Request, res: Response): Promise<void> {
    await new DeleteEntrenamientoUseCase(repo()).execute(req.params.id);
    res.status(204).send();
  },

  async jugadoresConAsistencia(req: Request, res: Response): Promise<void> {
    const data = await new GetJugadoresConAsistenciaUseCase(repo()).execute(req.params.id);
    res.json(data);
  },

  async guardarAsistencias(req: Request, res: Response): Promise<void> {
    await new GuardarAsistenciasBulkUseCase(repo()).execute(req.params.id, req.body.asistencias ?? []);
    res.status(204).send();
  },

  async reportesAsistencia(_req: Request, res: Response): Promise<void> {
    const data = await new GetReportesAsistenciaUseCase(repo()).execute();
    res.json(data);
  },

  async rawAsistencias(_req: Request, res: Response): Promise<void> {
    const data = await new GetRawAsistenciasUseCase(repo()).execute();
    res.json(data);
  },

  async asistenciasPorJugador(req: Request, res: Response): Promise<void> {
    const data = await new GetAsistenciasPorJugadorUseCase(repo()).execute(req.params.jugadorId);
    res.json(data);
  },

  async jugadoresRegistradosCount(_req: Request, res: Response): Promise<void> {
    const count = await new GetJugadoresRegistradosCountUseCase(repo()).execute();
    res.json({ count });
  },
};
