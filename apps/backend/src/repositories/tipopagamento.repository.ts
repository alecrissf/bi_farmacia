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

  async findByDescricao(descricao: string) {
    return await prisma.tipoPagamento.findUnique({
      where: { descricao },
    });
  }

  async removeByDescricao(descricao: string) {
    return await prisma.tipoPagamento.delete({
      where: { descricao },
    });
  }
}

export default new TipopagamentoRepository();
