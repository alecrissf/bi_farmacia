import { AddProdutoDto } from "../dto/produto";
import Repository from "../repositories/produto.repository";

export async function findAll() {
  const result = await Repository.findAll();
  return result;
}

export async function add(data: AddProdutoDto) {
  await Repository.add(data);
}

export async function findByCodBarras(id: string) {
  const result = await Repository.findByCodBarras(id);
  return result;
}

export async function removeByCodBarras(id: string) {
  await Repository.removeByCodBarras(id);
}
