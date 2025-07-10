import { AddPedidoDto } from '../dto/pedido';
import Repository from '../repositories/pedido.repository';

export async function findAll() {
  const result = await Repository.findAll();
  return result;
}

export async function add(data: AddPedidoDto) {
  await Repository.add(data);
}

export async function findById(id: number) {
  const result = await Repository.findById(id);
  return result;
}

export async function removeById(id: number) {
  await Repository.removeById(id);
}
