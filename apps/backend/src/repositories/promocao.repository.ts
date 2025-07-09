import prisma from "../database/prisma";
import { AddPromocaoDto } from "../dto/promocao";

class PromocaoRepository {
  async findAll() {
    return await prisma.promocao.findMany({
      orderBy: {
        nome: 'desc'
      }
    });
  }

  async add(data: AddPromocaoDto) {
    return await prisma.promocao.create({ data });
  }

  async findByNome(nome: string) {
    return await prisma.promocao.findUnique({
      where: { nome }
    });
  }

  async removeByNome(nome: string) {
    return await prisma.promocao.delete({
      where: { nome }
    });
  }
}

export default new PromocaoRepository;
