import { Request, Response } from 'express';
import { getSupabaseClient } from '../../../../shared/config/supabaseClient';
import { SupabaseAuthCredentialsRepository } from '../../infrastructure/SupabaseAuthCredentialsRepository';
import { SupabaseUsuarioRepository } from '../../infrastructure/SupabaseUsuarioRepository';
import { LoginUseCase } from '../../use-cases/LoginUseCase';

function repos() {
  const client = getSupabaseClient();
  return {
    authCredentialsRepo: new SupabaseAuthCredentialsRepository(client),
    usuarioRepo: new SupabaseUsuarioRepository(client),
  };
}

export const AuthController = {
  async login(req: Request, res: Response): Promise<void> {
    const { authCredentialsRepo, usuarioRepo } = repos();
    const useCase = new LoginUseCase(authCredentialsRepo, usuarioRepo);
    const result = await useCase.execute(req.body);
    res.json(result);
  },
};
