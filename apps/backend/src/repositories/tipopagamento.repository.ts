import prisma from "../database/prisma";
import { AddTipoPagamentoDto } from "../dto/tipopagamento";

class TipopagamentoRepository {
  async findAll() {
    return await prisma.tipo_pagamento.findMany({
      orderBy: {
        descricao: 'desc'
      }
    });
  }

  async add(data: AddTipoPagamentoDto) {
    return await prisma.tipo_pagamento.create({ data });
  }

  async findByDescricao(descricao: string) {
    return await prisma.tipo_pagamento.findUnique({
      where: { descricao }
    });
  }

  async removeByDescricao(descricao: string) {
    return await prisma.tipo_pagamento.delete({
      where: { descricao }
    });
  }
}

export default new TipopagamentoRepository;
