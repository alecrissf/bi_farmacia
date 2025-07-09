import prisma from "../database/prisma";
import { AddCampanhaMarketingDto } from "../dto/campanhamarketing";

class CampanhamarketingRepository {
  async findAll() {
    return await prisma.campanha_marketing.findMany({
      orderBy: {
        nome: 'desc'
      }
    });
  }

  async add(data: AddCampanhaMarketingDto) {
    return await prisma.campanha_marketing.create({ data });
  }

  async findByNome(nome: string) {
    return await prisma.campanha_marketing.findUnique({
      where: { nome }
    });
  }

  async removeByNome(nome: string) {
    return await prisma.campanha_marketing.delete({
      where: { nome }
    });
  }
}

export default new CampanhamarketingRepository;
