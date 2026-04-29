export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
  telefone: string;
}

export interface Cliente extends Usuario {
  endereco?: string;
}

export interface LoginDTO {
  email: string;
  senha: string;
}
