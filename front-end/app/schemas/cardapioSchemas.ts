import * as z from "zod";

export const categoriaPratoEnum = z.enum(["REFEICAO", "SOBREMESA", "BEBIDA"]);
export type CategoriaPrato = z.infer<typeof categoriaPratoEnum>;

export const pratoSchema = z.object({
  id: z.number().int(),
  nome: z.string().min(2, "Nome muito curto"),
  descricao: z.string().min(5, "Descrição muito curta"),
  nota: z.coerce.number().min(0).max(5).default(5),
  preco: z.coerce.number().positive("O preço deve ser maior que zero"),
  imagem: z.string().nullable().optional(),
  categoria: categoriaPratoEnum,
  ativo: z.boolean().default(true),
});

export type Prato = z.infer<typeof pratoSchema>;

export const pratoFormSchema = pratoSchema.omit({ id: true }).extend({
  id: z.number().optional(),
  arquivoImagem: z.instanceof(File).optional(),
});

export type PratoFormData = z.infer<typeof pratoFormSchema>;
