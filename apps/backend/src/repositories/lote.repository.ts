import prisma from "../database/prisma";
import { AddLoteDto } from "../dto/lote";

class LoteRepository {
  async findAll() {
    return await prisma.lote.findMany({
      orderBy: {
        codigo: 'desc'
      }
    });
  }

  async add(data: AddLoteDto) {
    return await prisma.lote.create({ data });
  }

  async findByCodigo(codigo: number) {
    return await prisma.lote.findUnique({
      where: { codigo }
    });
  }

  async removeByCodigo(codigo: number) {
    return await prisma.lote.delete({
      where: { codigo }
    });
  }
}

export default new LoteRepository;
