import { prisma } from '../lib/db';
import { addCategoria } from '../dto/categoriaproduto';

class CategoryRepository {
  async findAll() {
    return await prisma.categoriaProduto.findMany({
      orderBy: {
        nome: 'desc',
      },
    });
  }
  async add(data: addCategoria) {
    return await prisma.categoriaProduto.create({ data });
  }
  async findByName(nome: string) {
    return await prisma.categoriaProduto.findUnique({
      where: {
        nome,
      },
    });
  }

  async removeByName(nome: string) {
    return await prisma.categoriaProduto.delete({
      where: {
        nome,
      },
    });
  }
}

export default new CategoryRepository();
