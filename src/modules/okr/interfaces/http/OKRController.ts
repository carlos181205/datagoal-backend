import { Request, Response } from 'express';
import { getSupabaseClient } from '../../../../shared/config/supabaseClient';
import { SupabaseOKRRepository } from '../../infrastructure/SupabaseOKRRepository';
import { GetOKRsUseCase } from '../../use-cases/GetOKRsUseCase';
import { UpsertOKRUseCase } from '../../use-cases/UpsertOKRUseCase';
import { AddKRUseCase } from '../../use-cases/AddKRUseCase';
import { DeleteOKRUseCase } from '../../use-cases/DeleteOKRUseCase';

function repo() {
  return new SupabaseOKRRepository(getSupabaseClient());
}

function toJSON(objetivo: { id: string; titulo: string; descripcion: string | null; tipo: string; periodo: string | null; krs: readonly unknown[]; getProgresoPromedio(): number }) {
  return {
    id: objetivo.id,
    titulo: objetivo.titulo,
    descripcion: objetivo.descripcion,
    tipo: objetivo.tipo,
    periodo: objetivo.periodo,
    krs: objetivo.krs,
    progresoPromedio: objetivo.getProgresoPromedio(),
  };
}

export const OKRController = {
  async list(_req: Request, res: Response): Promise<void> {
    const objetivos = await new GetOKRsUseCase(repo()).execute();
    res.json(objetivos.map(toJSON));
  },

  async upsert(req: Request, res: Response): Promise<void> {
    const objetivo = await new UpsertOKRUseCase(repo()).execute(req.body);
    res.status(req.body.id ? 200 : 201).json(toJSON(objetivo));
  },

  async addKR(req: Request, res: Response): Promise<void> {
    const kr = await new AddKRUseCase(repo()).execute({ ...req.body, objetivoId: req.params.objetivoId });
    res.status(201).json(kr);
  },

  async remove(req: Request, res: Response): Promise<void> {
    await new DeleteOKRUseCase(repo()).execute(req.params.id);
    res.status(204).send();
  },
};
