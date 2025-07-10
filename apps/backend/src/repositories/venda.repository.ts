import { prisma } from '../lib/db';
import { AddVendaDto } from '../dto/venda';

class VendaRepository {
  async findAll() {
    return await prisma.venda.findMany({
      orderBy: {
        id: 'desc',
      },
      include: {
        tipoPagamento: true,
        campanhaMarketing: true,
        pedidos: {
          include: {
            produto: { include: { categoria: true } },
            promocao: true,
          },
        },
      },
    });
  }

  async add(data: AddVendaDto) {
    return await prisma.venda.create({ data });
  }

  async findById(id: number) {
    return await prisma.venda.findUnique({
      where: { id },
    });
  }

  async removeById(id: number) {
    return await prisma.venda.delete({
      where: { id },
    });
  }
}

export default new VendaRepository();
