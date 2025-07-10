import { prisma } from '../lib/db';
import { AddCampanhaMarketingDto } from '../dto/campanhamarketing';

class CampanhamarketingRepository {
  async findAll() {
    return await prisma.campanhaMarketing.findMany({
      orderBy: {
        nome: 'desc',
      },
    });
  }

  async add(data: AddCampanhaMarketingDto) {
    return await prisma.campanhaMarketing.create({ data });
  }

  async findByName(nome: string) {
    return await prisma.campanhaMarketing.findUnique({
      where: { nome },
    });
  }

  async removeByName(nome: string) {
    return await prisma.campanhaMarketing.delete({
      where: { nome },
    });
  }
}

export default new CampanhamarketingRepository();
