/*
  Warnings:

  - You are about to drop the column `dataFim` on the `campanha_marketing` table. All the data in the column will be lost.
  - You are about to drop the column `dataInicio` on the `campanha_marketing` table. All the data in the column will be lost.
  - You are about to drop the column `clienteId` on the `endereco` table. All the data in the column will be lost.
  - You are about to drop the column `dataRecebimento` on the `lote` table. All the data in the column will be lost.
  - You are about to drop the column `dataValidade` on the `lote` table. All the data in the column will be lost.
  - You are about to drop the column `produtoId` on the `lote` table. All the data in the column will be lost.
  - You are about to drop the column `qtdOriginal` on the `lote` table. All the data in the column will be lost.
  - You are about to drop the column `produtoId` on the `pedido` table. All the data in the column will be lost.
  - You are about to drop the column `promocaoId` on the `pedido` table. All the data in the column will be lost.
  - You are about to drop the column `vendaId` on the `pedido` table. All the data in the column will be lost.
  - You are about to drop the column `categoriaId` on the `produto` table. All the data in the column will be lost.
  - You are about to drop the column `codBarras` on the `produto` table. All the data in the column will be lost.
  - You are about to drop the column `marcaId` on the `produto` table. All the data in the column will be lost.
  - You are about to drop the column `qtdEstoque` on the `produto` table. All the data in the column will be lost.
  - You are about to drop the column `dataFim` on the `promocao` table. All the data in the column will be lost.
  - You are about to drop the column `dataInicio` on the `promocao` table. All the data in the column will be lost.
  - You are about to drop the column `campanhaMarketingId` on the `venda` table. All the data in the column will be lost.
  - You are about to drop the column `clienteId` on the `venda` table. All the data in the column will be lost.
  - You are about to drop the column `dataVenda` on the `venda` table. All the data in the column will be lost.
  - You are about to drop the column `tipoPagamentoId` on the `venda` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[codbarras]` on the table `produto` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `data_fim` to the `campanha_marketing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_inicio` to the `campanha_marketing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_cliente` to the `endereco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_recebimento` to the `lote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_validade` to the `lote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_produto` to the `lote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtd_original` to the `lote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_produto` to the `pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_venda` to the `pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codbarras` to the `produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_categoria` to the `produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_marca` to the `produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qtd_estoque` to the `produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_fim` to the `promocao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_inicio` to the `promocao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_venda` to the `venda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_cliente` to the `venda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_tipoPagamento` to the `venda` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "endereco" DROP CONSTRAINT "endereco_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "lote" DROP CONSTRAINT "lote_produtoId_fkey";

-- DropForeignKey
ALTER TABLE "pedido" DROP CONSTRAINT "pedido_produtoId_fkey";

-- DropForeignKey
ALTER TABLE "pedido" DROP CONSTRAINT "pedido_promocaoId_fkey";

-- DropForeignKey
ALTER TABLE "pedido" DROP CONSTRAINT "pedido_vendaId_fkey";

-- DropForeignKey
ALTER TABLE "produto" DROP CONSTRAINT "produto_categoriaId_fkey";

-- DropForeignKey
ALTER TABLE "produto" DROP CONSTRAINT "produto_marcaId_fkey";

-- DropForeignKey
ALTER TABLE "venda" DROP CONSTRAINT "venda_campanhaMarketingId_fkey";

-- DropForeignKey
ALTER TABLE "venda" DROP CONSTRAINT "venda_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "venda" DROP CONSTRAINT "venda_tipoPagamentoId_fkey";

-- DropIndex
DROP INDEX "produto_codBarras_key";

-- AlterTable
ALTER TABLE "campanha_marketing" DROP COLUMN "dataFim",
DROP COLUMN "dataInicio",
ADD COLUMN     "data_fim" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "data_inicio" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "endereco" DROP COLUMN "clienteId",
ADD COLUMN     "id_cliente" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "lote" DROP COLUMN "dataRecebimento",
DROP COLUMN "dataValidade",
DROP COLUMN "produtoId",
DROP COLUMN "qtdOriginal",
ADD COLUMN     "data_recebimento" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "data_validade" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "id_produto" INTEGER NOT NULL,
ADD COLUMN     "qtd_original" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "pedido" DROP COLUMN "produtoId",
DROP COLUMN "promocaoId",
DROP COLUMN "vendaId",
ADD COLUMN     "id_produto" INTEGER NOT NULL,
ADD COLUMN     "id_promocao" INTEGER,
ADD COLUMN     "id_venda" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "produto" DROP COLUMN "categoriaId",
DROP COLUMN "codBarras",
DROP COLUMN "marcaId",
DROP COLUMN "qtdEstoque",
ADD COLUMN     "codbarras" VARCHAR(50) NOT NULL,
ADD COLUMN     "id_categoria" INTEGER NOT NULL,
ADD COLUMN     "id_marca" INTEGER NOT NULL,
ADD COLUMN     "qtd_estoque" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "promocao" DROP COLUMN "dataFim",
DROP COLUMN "dataInicio",
ADD COLUMN     "data_fim" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "data_inicio" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "venda" DROP COLUMN "campanhaMarketingId",
DROP COLUMN "clienteId",
DROP COLUMN "dataVenda",
DROP COLUMN "tipoPagamentoId",
ADD COLUMN     "data_venda" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "id_campanhaMarketing" INTEGER,
ADD COLUMN     "id_cliente" INTEGER NOT NULL,
ADD COLUMN     "id_tipoPagamento" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "produto_codbarras_key" ON "produto"("codbarras");

-- AddForeignKey
ALTER TABLE "produto" ADD CONSTRAINT "produto_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categoria_produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto" ADD CONSTRAINT "produto_id_marca_fkey" FOREIGN KEY ("id_marca") REFERENCES "marca_produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lote" ADD CONSTRAINT "lote_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "endereco" ADD CONSTRAINT "endereco_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venda" ADD CONSTRAINT "venda_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venda" ADD CONSTRAINT "venda_id_tipoPagamento_fkey" FOREIGN KEY ("id_tipoPagamento") REFERENCES "tipo_pagamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venda" ADD CONSTRAINT "venda_id_campanhaMarketing_fkey" FOREIGN KEY ("id_campanhaMarketing") REFERENCES "campanha_marketing"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_id_venda_fkey" FOREIGN KEY ("id_venda") REFERENCES "venda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_id_promocao_fkey" FOREIGN KEY ("id_promocao") REFERENCES "promocao"("id") ON DELETE SET NULL ON UPDATE CASCADE;
