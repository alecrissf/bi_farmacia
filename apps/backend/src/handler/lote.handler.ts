import { AddLoteDto } from "../dto/lote";
import Repository from "../repositories/lote.repository";

export async function findAll() {
  const result = await Repository.findAll();
  return result;
}

export async function add(data: AddLoteDto) {
  await Repository.add(data);
}

export async function findByCodigo(id: number) {
  const result = await Repository.findByCodigo(id);
  return result;
}

export async function removeByCodigo(id: number) {
  await Repository.removeByCodigo(id);
}
