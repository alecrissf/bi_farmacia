import { prisma } from '../lib/db';
import { AddMarcaProdutoDto } from '../dto/marcaproduto';

class MarcaprodutoRepository {
  async findAll() {
    return await prisma.marcaProduto.findMany({
      orderBy: {
        nome: 'desc',
      },
    });
  }

  async add(data: AddMarcaProdutoDto) {
    return await prisma.marcaProduto.create({ data });
  }

  async findByName(nome: string) {
    return await prisma.marcaProduto.findUnique({
      where: { nome },
    });
  }

  async removeByName(nome: string) {
    return await prisma.marcaProduto.delete({
      where: { nome },
    });
  }
}

export default new MarcaprodutoRepository();
