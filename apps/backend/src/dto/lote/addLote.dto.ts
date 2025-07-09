export interface AddLoteDto {
  codigo: string;
  produtoId: number;
  dataValidade: Date;
  dataRecebimento: Date;
  qtdOriginal: number;
}
