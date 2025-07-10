import { AddProdutoDto } from '../dto/produto';
import Repository from '../repositories/produto.repository';

export async function findAll() {
  const result = await Repository.findAll();
  return result;
}

export async function add(data: AddProdutoDto) {
  await Repository.add(data);
}

export async function findByCodBarras(cod: string) {
  const result = await Repository.findByCodBarras(cod);
  return result;
}

export async function removeByCodBarras(cod: string) {
  await Repository.removeByCodBarras(cod);
}
