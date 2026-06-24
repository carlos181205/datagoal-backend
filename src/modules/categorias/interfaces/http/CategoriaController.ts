import { Request, Response } from 'express';
import { getSupabaseClient } from '../../../../shared/config/supabaseClient';
import { SupabaseCategoriaRepository } from '../../infrastructure/SupabaseCategoriaRepository';
import { GetCategoriasYEquiposParaSelectoresUseCase } from '../../use-cases/GetCategoriasYEquiposParaSelectoresUseCase';
import { UpsertCategoriaMaestraUseCase } from '../../use-cases/UpsertCategoriaMaestraUseCase';
import { UpsertEquipoUseCase } from '../../use-cases/UpsertEquipoUseCase';

function repo() {
  return new SupabaseCategoriaRepository(getSupabaseClient());
}

export const CategoriaController = {
  async selectores(_req: Request, res: Response): Promise<void> {
    const result = await new GetCategoriasYEquiposParaSelectoresUseCase(repo()).execute();
    res.json(result);
  },

  async upsertMaestra(req: Request, res: Response): Promise<void> {
    const result = await new UpsertCategoriaMaestraUseCase(repo()).execute(req.body);
    res.status(result.created ? 201 : 200).json(result);
  },

  async upsertEquipo(req: Request, res: Response): Promise<void> {
    const result = await new UpsertEquipoUseCase(repo()).execute(req.body);
    res.status(result.created ? 201 : 200).json(result);
  },
};
