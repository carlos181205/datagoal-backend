import { NextFunction, Request, Response } from 'express';
import { getSupabaseClient } from '../config/supabaseClient';
import { AppError } from '../errors/AppError';

export interface AuthenticatedUser {
  id: string;
  email: string | null;
  rol: string | null;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export async function requireAuth(req: Request, _res: Response, next: NextFunction): Promise<void> {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    next(new AppError('Token de autenticación faltante. Envía Authorization: Bearer <jwt>.', 401));
    return;
  }

  const token = header.slice('Bearer '.length).trim();

  try {
    const { data, error } = await getSupabaseClient().auth.getUser(token);
    if (error || !data.user) {
      next(new AppError('Token inválido o expirado.', 401));
      return;
    }

    req.user = {
      id: data.user.id,
      email: data.user.email ?? null,
      rol: (data.user.user_metadata?.rol as string | undefined) ?? null,
    };
    next();
  } catch {
    next(new AppError('No fue posible validar el token.', 401));
  }
}

export function requireRol(...rolesPermitidos: string[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new AppError('Token de autenticación faltante.', 401));
      return;
    }
    if (!req.user.rol || !rolesPermitidos.includes(req.user.rol)) {
      next(new AppError('No tienes permisos para realizar esta acción.', 403));
      return;
    }
    next();
  };
}
