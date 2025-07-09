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

  async findByPayment(id: number) {
    return await prisma.tipo_pagamento.findUnique({
      where: { id }
    });
  }

  async removeByPayment(id: number) {
    return await prisma.tipo_pagamento.delete({
      where: { id }
    });
  }
}

export default new TipopagamentoRepository;
