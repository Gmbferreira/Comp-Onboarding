export type CategoriaPrato = "REFEICAO" | "SOBREMESA" | "ACOMPANHAMENTO";

export interface Prato {
  id: number;
  nome: string;
  descricao: string;
  nota: number;
  preco: number;
  imagem: string;
  categoria: CategoriaPrato;
}
