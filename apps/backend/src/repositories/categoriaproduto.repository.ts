import prisma from "../database/prisma";
import {addCategoria} from "../dto/categoriaproduto"

class CategoryRepository {
  async findAll() {
    return await prisma.categoria_produto.findMany({
      orderBy: {
        nome: 'desc'
      }     
    });
  }
  async add(data: addCategoria) {
    return await prisma.categoria_produto.create({data});
  }
  async findByName(nome: string) {
    return await prisma.categoria_produto.findUnique({
      where: {
        nome,
      }
    });
  }

  async removeByName(nome: string) {
    return await prisma.categoria_produto.delete({
      where: {
        nome,
      }
    });
  }
}

export default new CategoryRepository;