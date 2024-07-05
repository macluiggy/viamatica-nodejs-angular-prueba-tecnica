// src/application/interfaces/IAuthService.ts
export interface IAuthService {
  signUp({ email, password }: { email: string; password: string }): Promise<any>;
  login(email: string, password: string): Promise<any>;
}
