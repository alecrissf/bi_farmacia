import { AddTipoPagamentoDto } from '../dto/tipopagamento';
import Repository from '../repositories/tipopagamento.repository';

export async function findAll() {
  const result = await Repository.findAll();
  return result;
}

export async function add(data: AddTipoPagamentoDto) {
  await Repository.add(data);
}

export async function findByPayment(id: number) {
  const result = await Repository.findByPayment(id);
  return result;
}

export async function removeByPayment(id: number) {
  await Repository.removeByPayment(id);
}
