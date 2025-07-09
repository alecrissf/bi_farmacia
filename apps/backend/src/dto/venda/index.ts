export interface AddVendaDto {
  dataVenda: Date;
  clienteId: number;
  tipoPagamentoId: number;
  campanhaMarketingId?: number;
}
