-- CreateTable
CREATE TABLE "categoria_produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "marca_produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codBarras" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "preco" DECIMAL NOT NULL,
    "qtdEstoque" INTEGER NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    "marcaId" INTEGER NOT NULL,
    CONSTRAINT "produto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categoria_produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "produto_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "marca_produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "lote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigo" TEXT NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "dataValidade" DATETIME NOT NULL,
    "dataRecebimento" DATETIME NOT NULL,
    "qtdOriginal" INTEGER NOT NULL,
    CONSTRAINT "lote_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "endereco" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cidade" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "complemento" TEXT NOT NULL,
    "clienteId" INTEGER NOT NULL,
    CONSTRAINT "endereco_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tipo_pagamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "venda" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dataVenda" DATETIME NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "tipoPagamentoId" INTEGER NOT NULL,
    CONSTRAINT "venda_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "venda_tipoPagamentoId_fkey" FOREIGN KEY ("tipoPagamentoId") REFERENCES "tipo_pagamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pedido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qtd" INTEGER NOT NULL,
    "vendaId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "promocaoId" INTEGER,
    CONSTRAINT "pedido_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "venda" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pedido_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pedido_promocaoId_fkey" FOREIGN KEY ("promocaoId") REFERENCES "promocao" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "promocao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "dataInicio" DATETIME NOT NULL,
    "dataFim" DATETIME NOT NULL,
    "tipo" TEXT NOT NULL,
    "desconto" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoriaProdutoToPromocao" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CategoriaProdutoToPromocao_A_fkey" FOREIGN KEY ("A") REFERENCES "categoria_produto" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CategoriaProdutoToPromocao_B_fkey" FOREIGN KEY ("B") REFERENCES "promocao" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_MarcaProdutoToPromocao" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_MarcaProdutoToPromocao_A_fkey" FOREIGN KEY ("A") REFERENCES "marca_produto" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_MarcaProdutoToPromocao_B_fkey" FOREIGN KEY ("B") REFERENCES "promocao" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ProdutoToPromocao" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProdutoToPromocao_A_fkey" FOREIGN KEY ("A") REFERENCES "produto" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProdutoToPromocao_B_fkey" FOREIGN KEY ("B") REFERENCES "promocao" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "produto_codBarras_key" ON "produto"("codBarras");

-- CreateIndex
CREATE UNIQUE INDEX "lote_codigo_key" ON "lote"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "cliente_cpf_key" ON "cliente"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoriaProdutoToPromocao_AB_unique" ON "_CategoriaProdutoToPromocao"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoriaProdutoToPromocao_B_index" ON "_CategoriaProdutoToPromocao"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MarcaProdutoToPromocao_AB_unique" ON "_MarcaProdutoToPromocao"("A", "B");

-- CreateIndex
CREATE INDEX "_MarcaProdutoToPromocao_B_index" ON "_MarcaProdutoToPromocao"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProdutoToPromocao_AB_unique" ON "_ProdutoToPromocao"("A", "B");

-- CreateIndex
CREATE INDEX "_ProdutoToPromocao_B_index" ON "_ProdutoToPromocao"("B");
