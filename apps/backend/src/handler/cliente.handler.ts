import { AddClienteDto } from "../dto/cliente";
import Repository from "../repositories/cliente.repository";

export async function findAll() {
  const result = await Repository.findAll();
  return result;
}

export async function add(data: AddClienteDto) {
  await Repository.add(data);
}

export async function findByName(name: string) {
  const result = await Repository.findByCpf(name);
  return result;
}

export async function removeByName(name: string) {
  await Repository.removeByCpf(name);
}
