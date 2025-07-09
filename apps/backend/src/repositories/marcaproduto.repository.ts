import prisma from "../database/prisma";
import { AddMarcaProdutoDto } from "../dto/marcaproduto";

class MarcaprodutoRepository {
  async findAll() {
    return await prisma.marca_produto.findMany({
      orderBy: {
        nome: 'desc'
      }
    });
  }

  async add(data: AddMarcaProdutoDto) {
    return await prisma.marca_produto.create({ data });
  }

  async findByNome(nome: string) {
    return await prisma.marca_produto.findUnique({
      where: { nome }
    });
  }

  async removeByNome(nome: string) {
    return await prisma.marca_produto.delete({
      where: { nome }
    });
  }
}

export default new MarcaprodutoRepository;
