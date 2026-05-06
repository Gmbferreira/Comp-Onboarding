import * as z from "zod";

export const usuarioBaseSchema = z.object({
  id: z.number().optional(),
  nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  telefone: z.string().min(10, "Telefone inválido"),
  endereco: z.string().optional(),
});

export type Usuario = z.infer<typeof usuarioBaseSchema>;

export type Cliente = Usuario; 

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