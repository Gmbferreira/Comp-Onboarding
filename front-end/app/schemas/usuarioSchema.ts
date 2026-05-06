import * as z from "zod";

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

export const usuarioBaseSchema = z.object({
  id: z.number().optional(),
  nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  telefone: z.string().min(10, "Telefone inválido (mínimo 10 dígitos)"),
  endereco: z.string().optional(),
});


export const cadastroSchema = usuarioBaseSchema.pick({
  nome: true,
  email: true,
  telefone: true,
  senha: true,
});

export type CadastroData = z.infer<typeof cadastroSchema>;

export const loginSchema = usuarioBaseSchema.pick({
  email: true,
  senha: true,
});

export type LoginData = z.infer<typeof loginSchema>;