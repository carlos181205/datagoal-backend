export interface IAuthCredentialsRepository {
  login(
    email: string,
    password: string
  ): Promise<{
    userId: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }>;
}
