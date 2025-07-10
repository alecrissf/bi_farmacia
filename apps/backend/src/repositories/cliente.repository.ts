import { prisma } from '../lib/db';
import { AddClienteDto } from '../dto/cliente';

class ClienteRepository {
  async findAll() {
    return await prisma.cliente.findMany({
      orderBy: {
        cpf: 'desc',
      },
    });
  }

  async add(data: AddClienteDto) {
    return await prisma.cliente.create({ data });
  }

  async findByCpf(cpf: string) {
    return await prisma.cliente.findUnique({
      where: { cpf },
    });
  }

  async removeByCpf(cpf: string) {
    return await prisma.cliente.delete({
      where: { cpf },
    });
  }
}

export default new ClienteRepository();
