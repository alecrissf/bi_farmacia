import { AddEnderecoDto } from "../dto/endereco";
import Repository from "../repositories/endereco.repository";

export async function findAll() {
  const result = await Repository.findAll();
  return result;
}

export async function add(data: AddEnderecoDto) {
  await Repository.add(data);
}

export async function findByName(name: string) {
  const result = await Repository.findByName(name);
  return result;
}

export async function removeByName(name: string) {
  await Repository.removeByName(name);
}
