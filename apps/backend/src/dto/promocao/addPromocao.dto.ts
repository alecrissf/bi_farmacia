export interface AddPromocaoDto {
  nome: string;
  dataInicio: Date;
  dataFim: Date;
  tipo: 'Percentual' | 'Fixo';
  desconto: number;
  produtosAplicaveisIds?: number[];
  categoriasAplicaveisIds?: number[];
  marcasAplicaveisIds?: number[];
}
