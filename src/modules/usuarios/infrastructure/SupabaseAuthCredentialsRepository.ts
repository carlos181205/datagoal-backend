import { IAuthCredentialsRepository } from '../domain/ports/IAuthCredentialsRepository';
import { AppError } from '../../../shared/errors/AppError';

export class SupabaseAuthCredentialsRepository implements IAuthCredentialsRepository {
  constructor(
    private readonly supabase: {
      auth: {
        signInWithPassword: (credentials: any) => Promise<any>;
      };
    }
  ) {}

  async login(
    email: string,
    password: string
  ): Promise<{
    userId: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data?.session) {
      throw new AppError('Credenciales inválidas.', 401);
    }

    return {
      userId: data.session.user.id,
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      expiresIn: data.session.expires_in,
    };
  }
}
