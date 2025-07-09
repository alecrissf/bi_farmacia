import { AddEnderecoDto } from "../dto/endereco";
import Repository from "../repositories/endereco.repository";

export async function findAll() {
  const result = await Repository.findAll();
  return result;
}

export async function add(data: AddEnderecoDto) {
  await Repository.add(data);
}

export async function findById(id: number) {
  const result = await Repository.findById(id);
  return result;
}

export async function removeById(id: number) {
  await Repository.removeById(id);
}
