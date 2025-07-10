import { AddTipoPagamentoDto } from '../dto/tipopagamento';
import Repository from '../repositories/tipopagamento.repository';

export async function findAll() {
  const result = await Repository.findAll();
  return result;
}

export async function add(data: AddTipoPagamentoDto) {
  await Repository.add(data);
}

export async function findByDescricao(desc: string) {
  const result = await Repository.findByDescricao(desc);
  return result;
}

export async function removeByDescricao(desc: string) {
  await Repository.removeByDescricao(desc);
}
