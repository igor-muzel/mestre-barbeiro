export interface CadastroDados {
  name: string;
  email: string;
  telefone: string;
  senha: string;
}

export interface LoginRequest{
  email: string;
  senha: string;
}

export interface LoginResponse{
  sucesso: boolean;
  message: string;
  token?: string;
  role?: string;
}