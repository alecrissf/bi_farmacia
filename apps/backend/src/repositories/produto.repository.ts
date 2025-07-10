import { prisma } from '../lib/db';
import { AddProdutoDto } from '../dto/produto';

class ProdutoRepository {
  async findAll() {
    return await prisma.produto.findMany({
      orderBy: {
        codBarras: 'desc',
      },
    });
  }

  async add(data: AddProdutoDto) {
    return await prisma.produto.create({ data });
  }

  async findByCodBarras(codBarras: string) {
    return await prisma.produto.findUnique({
      where: { codBarras },
    });
  }

  async removeByCodBarras(codBarras: string) {
    return await prisma.produto.delete({
      where: { codBarras },
    });
  }
}

export default new ProdutoRepository();
