import { prisma } from '../lib/db';
import { AddEnderecoDto } from '../dto/endereco';

class EnderecoRepository {
  async findAll() {
    return await prisma.endereco.findMany({
      orderBy: {
        id: 'desc',
      },
    });
  }

  async add(data: AddEnderecoDto) {
    return await prisma.endereco.create({ data });
  }

  async findById(id: number) {
    return await prisma.endereco.findUnique({
      where: { id },
    });
  }

  async removeById(id: number) {
    return await prisma.endereco.delete({
      where: { id },
    });
  }
}

export default new EnderecoRepository();
