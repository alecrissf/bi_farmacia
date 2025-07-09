
import { addCategoria } from "../dto/categoriaproduto";
import CategoryRepository from "../repositories/categoriaproduto.repository";
export async function findAll() {
  const categoria = await CategoryRepository.findAll();
  return categoria;
}
export async function add(data: addCategoria) {
  await CategoryRepository.add(data);
}
export async function findByName(name: string) {
  const categoria = await CategoryRepository.findByName(name);
  return categoria;
}

export async function removeByName(name: string) {
 await CategoryRepository.removeByName(name);
}