import { prisma } from '../lib/db';
import { AddTipoPagamentoDto } from '../dto/tipopagamento';

class TipopagamentoRepository {
  async findAll() {
    return await prisma.tipoPagamento.findMany({
      orderBy: {
        descricao: 'desc',
      },
    });
  }

  async add(data: AddTipoPagamentoDto) {
    return await prisma.tipoPagamento.create({ data });
  }

  async findByPayment(id: number) {
    return await prisma.tipoPagamento.findUnique({
      where: { id },
    });
  }

  async removeByPayment(id: number) {
    return await prisma.tipoPagamento.delete({
      where: { id },
    });
  }
}

export default new TipopagamentoRepository();
