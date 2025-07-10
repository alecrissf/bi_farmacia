import { prisma } from '../lib/db';
import { AddPedidoDto } from '../dto/pedido';

class PedidoRepository {
  async findAll() {
    return await prisma.pedido.findMany({
      orderBy: {
        id: 'desc',
      },
    });
  }

  async add(data: AddPedidoDto) {
    return await prisma.pedido.create({ data });
  }

  async findById(id: number) {
    return await prisma.pedido.findUnique({
      where: { id },
    });
  }

  async removeById(id: number) {
    return await prisma.pedido.delete({
      where: { id },
    });
  }
}

export default new PedidoRepository();
