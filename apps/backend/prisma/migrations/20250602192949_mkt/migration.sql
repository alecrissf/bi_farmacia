-- AlterTable
ALTER TABLE "venda" ADD COLUMN     "campanhaMarketingId" INTEGER;

-- CreateTable
CREATE TABLE "campanha_marketing" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3) NOT NULL,
    "tipo" VARCHAR(50) NOT NULL,

    CONSTRAINT "campanha_marketing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "venda" ADD CONSTRAINT "venda_campanhaMarketingId_fkey" FOREIGN KEY ("campanhaMarketingId") REFERENCES "campanha_marketing"("id") ON DELETE SET NULL ON UPDATE CASCADE;
