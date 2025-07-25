import { AddClienteDto } from '../dto/cliente';
import Repository from '../repositories/cliente.repository';

export async function findAll() {
  const result = await Repository.findAll();
  return result;
}

export async function add(data: AddClienteDto) {
  await Repository.add(data);
}

export async function findByCpf(cpf: string) {
  const result = await Repository.findByCpf(cpf);
  return result;
}

export async function removeByCpf(cpf: string) {
  await Repository.removeByCpf(cpf);
}
