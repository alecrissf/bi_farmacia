import { AddVendaDto } from "../dto/venda";
import Repository from "../repositories/venda.repository";

export async function findAll() {
  const result = await Repository.findAll();
  return result;
}

export async function add(data: AddVendaDto) {
  await Repository.add(data);
}

export async function findById(id: number) {
  const result = await Repository.findById(id);
  return result;
}

export async function removeById(id: number) {
  await Repository.removeById(id);
}
