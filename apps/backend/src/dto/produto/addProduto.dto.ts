export interface AddProdutoDto {
  codBarras: string;
  nome: string;
  preco: number;
  qtdEstoque: number;
  categoriaId: number;
  marcaId: number;
}
