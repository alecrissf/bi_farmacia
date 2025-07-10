import { prisma } from '../lib/db';
import { AddPromocaoDto } from '../dto/promocao';

class PromocaoRepository {
  async findAll() {
    return await prisma.promocao.findMany({
      orderBy: {
        nome: 'desc',
      },
    });
  }

  async add(data: AddPromocaoDto) {
    return await prisma.promocao.create({ data });
  }

  async findByName(nome: string) {
    return await prisma.promocao.findUnique({
      where: { nome },
    });
  }

  async removeByName(nome: string) {
    return await prisma.promocao.delete({
      where: { nome },
    });
  }
}

export default new PromocaoRepository();
