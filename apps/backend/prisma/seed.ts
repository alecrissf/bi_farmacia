import { TipoPromocao } from '../src/generated/prisma/client';
import { prisma } from '../src/lib/db';
import { auth } from '../src/lib/auth';

async function main() {
  // Auth
  // auth.api.signUpEmail({
  //   body: {
  //     name: 'admin',
  //     email: 'admin@bi.com',
  //     password: 'admin#123',
  //     permissions: Number.MAX_SAFE_INTEGER,
  //   },
  // });

  // CategoriaProduto
  const [categoriaReferencia, categoriaGenerico, categoriaSimilar] =
    await prisma.categoriaProduto.createManyAndReturn({
      data: [{ nome: 'Referência' }, { nome: 'Genérico' }, { nome: 'Similar' }],
    });

  // MarcaProduto
  const [
    marcaCorus,
    marcaMaxalgina,
    marcaMedley,
    marcaNeoQuimica,
    marcaEMS,
    marcaCimed,
  ] = await prisma.marcaProduto.createManyAndReturn({
    data: [
      { nome: 'Corus' },
      { nome: 'Maxalgina' },
      { nome: 'Medley' },
      { nome: 'Neo Química' },
      { nome: 'EMS' },
      { nome: 'Cimed' },
    ],
  });

  // Produto
  const products = await prisma.produto.createManyAndReturn({
    data: [
      {
        nome: 'Corus Losartana Potássica 50mg 30 comprimidos',
        codBarras: '7896181920410',
        preco: 7.25,
        qtdEstoque: 800,
        categoriaId: categoriaReferencia.id,
        marcaId: marcaCorus.id,
      },
      {
        nome: 'Maxalgina Dipirona Sódica 500mg/ml Solução Gotas 20ml',
        codBarras: '7898133131011',
        preco: 4.99,
        qtdEstoque: 730,
        categoriaId: categoriaReferencia.id,
        marcaId: marcaMaxalgina.id,
      },
      {
        nome: 'Hidroclorotiazida 25mg 30 comprimidos Medley Genérico',
        codBarras: '7891058002657',
        preco: 5.92,
        qtdEstoque: 700,
        categoriaId: categoriaGenerico.id,
        marcaId: marcaMedley.id,
      },
      {
        nome: 'Nimesulida 50mg/ml Gotas 15ml Neo Química Genérico',
        codBarras: '7896714206080',
        preco: 19.89,
        qtdEstoque: 300,
        categoriaId: categoriaGenerico.id,
        marcaId: marcaNeoQuimica.id,
      },
      {
        nome: 'Tadalafila 20mg 1 comprimido Neo Química Genérico',
        codBarras: '7896714255934',
        preco: 7.99,
        qtdEstoque: 300,
        categoriaId: categoriaGenerico.id,
        marcaId: marcaNeoQuimica.id,
      },
      {
        nome: 'Simeticona 125mg 10 cápsulas Medley Genérico',
        codBarras: '7896422520669',
        preco: 7.26,
        qtdEstoque: 600,
        categoriaId: categoriaGenerico.id,
        marcaId: marcaMedley.id,
      },
      {
        nome: 'Maleato de Enalapril 20mg 30 Comprimidos EMS Genérico',
        codBarras: '7896004700540',
        preco: 12.06,
        qtdEstoque: 500,
        categoriaId: categoriaGenerico.id,
        marcaId: marcaEMS.id,
      },
      {
        nome: 'Citrato de Sildenafila 50mg 2 Comprimidos Neo Química Genérico',
        codBarras: '7896714226699',
        preco: 9.19,
        qtdEstoque: 400,
        categoriaId: categoriaGenerico.id,
        marcaId: marcaNeoQuimica.id,
      },
      {
        nome: 'Atenolol 25mg 30 comprimidos Medley Genérico',
        codBarras: '7896422506342',
        preco: 4.36,
        qtdEstoque: 800,
        categoriaId: categoriaGenerico.id,
        marcaId: marcaMedley.id,
      },
      {
        nome: 'Sinvastatina 20mg 30 Comprimidos Cimed Genérico',
        codBarras: '7896523215235',
        preco: 9.25,
        qtdEstoque: 720,
        categoriaId: categoriaGenerico.id,
        marcaId: marcaCimed.id,
      },
    ],
  });

  // Lote
  await prisma.lote.createManyAndReturn({
    data: [
      {
        codigo: 'LOTE202505A01',
        produtoId: products[0].id,
        qtdOriginal: 500,
        dataValidade: new Date('2027-05-30'),
        dataRecebimento: new Date('2025-05-01'),
      },
      {
        codigo: 'LOTE202505A02',
        produtoId: products[0].id,
        qtdOriginal: 500,
        dataValidade: new Date('2027-06-30'),
        dataRecebimento: new Date('2025-05-15'),
      },
      {
        codigo: 'LOTE202505B01',
        produtoId: products[1].id,
        qtdOriginal: 1000,
        dataValidade: new Date('2026-11-30'),
        dataRecebimento: new Date('2025-05-01'),
      },
      {
        codigo: 'LOTE202505C01',
        produtoId: products[2].id,
        qtdOriginal: 800,
        dataValidade: new Date('2027-04-30'),
        dataRecebimento: new Date('2025-05-02'),
      },
      {
        codigo: 'LOTE202505D01',
        produtoId: products[3].id,
        qtdOriginal: 300,
        dataValidade: new Date('2026-10-30'),
        dataRecebimento: new Date('2025-05-03'),
      },
      {
        codigo: 'LOTE202505E01',
        produtoId: products[4].id,
        qtdOriginal: 400,
        dataValidade: new Date('2027-03-30'),
        dataRecebimento: new Date('2025-05-04'),
      },
      {
        codigo: 'LOTE202505F01',
        produtoId: products[5].id,
        qtdOriginal: 700,
        dataValidade: new Date('2027-02-28'),
        dataRecebimento: new Date('2025-05-05'),
      },
      {
        codigo: 'LOTE202505G01',
        produtoId: products[6].id,
        qtdOriginal: 600,
        dataValidade: new Date('2027-01-30'),
        dataRecebimento: new Date('2025-05-06'),
      },
      {
        codigo: 'LOTE202505H01',
        produtoId: products[7].id,
        qtdOriginal: 500,
        dataValidade: new Date('2026-12-30'),
        dataRecebimento: new Date('2025-05-07'),
      },
      {
        codigo: 'LOTE202505I01',
        produtoId: products[8].id,
        qtdOriginal: 900,
        dataValidade: new Date('2027-07-30'),
        dataRecebimento: new Date('2025-05-08'),
      },
      {
        codigo: 'LOTE202505J01',
        produtoId: products[9].id,
        qtdOriginal: 400,
        dataValidade: new Date('2026-09-30'),
        dataRecebimento: new Date('2025-05-09'),
      },
      {
        codigo: 'LOTE202505J02',
        produtoId: products[9].id,
        qtdOriginal: 400,
        dataValidade: new Date('2026-10-30'),
        dataRecebimento: new Date('2025-05-20'),
      },
    ],
  });

  // Cliente
  const clientsCsv = [
    [
      'Rua dos Gerânios, 100, Aldeota, Fortaleza, CE, 60150010',
      'Ana Luiza Martins',
      '11122233344',
    ],
    [
      'Avenida Beira Mar, 2500, Meireles, Fortaleza, CE, 60165121',
      'Bruno Azevedo Costa',
      '22233344455',
    ],
    [
      'Rua Pereira Filgueiras, 1230, Centro, Fortaleza, CE, 60160150',
      'Carlos Eduardo Lima',
      '33344455566',
    ],
    [
      'Rua Frei Mansueto, 500, Varjota, Fortaleza, CE, 60175070',
      'Daniela Ferreira Alves',
      '44455566677',
    ],
    [
      'Avenida Santos Dumont, 3000, Papicu, Fortaleza, CE, 60150162',
      'Eduardo Gomes Pereira',
      '55566677788',
    ],
    [
      'Rua Professor Dias da Rocha, 800, Cocó, Fortaleza, CE, 60170310',
      'Fernanda Oliveira Souza',
      '66677788899',
    ],
    [
      'Rua Costa Barros, 915, Praia de Iracema, Fortaleza, CE, 60160280',
      'Gustavo Rocha Santos',
      '77788899900',
    ],
    [
      'Avenida 13 de Maio, 2020, Fátima, Fortaleza, CE, 60040531',
      'Helena Carvalho Ribeiro',
      '88899900011',
    ],
    [
      'Rua Padre Valdevino, 150, Joaquim Távora, Fortaleza, CE, 60135040',
      'Igor Almeida Barros',
      '99900011122',
    ],
    [
      'Avenida Professor Gomes de Matos, 700, Montese, Fortaleza, CE, 60410000',
      'Julia Castro Barbosa',
      '11122233',
    ],
    [
      'Rua Gustavo Sampaio, 1100, Parquelândia, Fortaleza, CE, 60455000',
      'Kaique Dias Fernandes',
      '12312312301',
    ],
    [
      'Avenida Washington Soares, 4500, Edson Queiroz, Fortaleza, CE, 60811341',
      'Larissa Martins Andrade',
      '23423423402',
    ],
    [
      'Rua Coronel Francisco Pereira, 300, Messejana, Fortaleza, CE, 60840260',
      'Marcelo Nobre Pinto',
      '34534534503',
    ],
    [
      'Avenida Alberto Craveiro, 2222, Castelão, Fortaleza, CE, 60861211',
      'Natalia Queiroz Campos',
      '45645645604',
    ],
    [
      'Rua do Trilho, 450, Barra do Ceará, Fortaleza, CE, 60330870',
      'Otavio Ramos Xavier',
      '56756756705',
    ],
    [
      'Rua Canuto de Aguiar, 1300, Mucuripe, Fortaleza, CE, 60160120',
      'Patricia Sousa Freire',
      '67867867806',
    ],
    [
      'Rua República do Líbano, 990, Dionísio Torres, Fortaleza, CE, 60160140',
      'Rafael Viana Teles',
      '78978978907',
    ],
    [
      'Rua Dr. José Lourenço, 200, Sapiranga, Fortaleza, CE, 60833025',
      'Sofia Bezerra Correia',
      '89089089008',
    ],
    [
      'Rua General Clarindo de Queiroz, 555, José Bonifácio, Fortaleza, CE, 60035130',
      'Thiago Farias Aguiar',
      '90190190109',
    ],
    [
      'Rua Monsenhor Furtado, 1500, Damas, Fortaleza, CE, 60440140',
      'Ursula Frota Linhares',
      '1201201210',
    ],
    [
      'Avenida João Pessoa, 6000, Bom Futuro, Fortaleza, CE, 60420090',
      'Victor Paiva Arruda',
      '11223344511',
    ],
    [
      'Rua Benjamim Barroso, 321, Maraponga, Fortaleza, CE, 60710710',
      'Yasmin Chaves Brandão',
      '22334455612',
    ],
    [
      'Avenida Juscelino Kubitschek, 500, Passaré, Fortaleza, CE, 60740000',
      'Arthur Cavalcante Duarte',
      '33445566713',
    ],
    [
      'Rua Verde, 123, Jangurussu, Fortaleza, CE, 60866000',
      'Beatriz Esteves Falcão',
      '44556677814',
    ],
    [
      'Travessa das Flores, 45, Aldeota, Fortaleza, CE, 60150015',
      'Caio Gadelha Holanda',
      '55667788915',
    ],
    [
      'Rua das Gaivotas, 88, Meireles, Fortaleza, CE, 60165125',
      'Debora Ibiapina Jucá',
      '66778899016',
    ],
    [
      'Rua dos Coqueiros, 77, Praia de Iracema, Fortaleza, CE, 60160285',
      'Elias Lacerda Macêdo',
      '77889900117',
    ],
    [
      'Avenida da Universidade, 2853, Benfica, Fortaleza, CE, 60020181',
      'Flavia Mota Nogueira',
      '88990011218',
    ],
    [
      'Rua Solon Pinheiro, 940, Fátima, Fortaleza, CE, 60050040',
      'Gabriel Parente Rabelo',
      '99001122319',
    ],
    [
      'Rua Barão de Aratanha, 1300, Joaquim Távora, Fortaleza, CE, 60035030',
      'Heloisa Sampaio Távora',
      '112233420',
    ],
    [
      'Rua Alberto Magno, 1010, Montese, Fortaleza, CE, 60410430',
      'Isaac Uchoa Vasconcelos',
      '10213243521',
    ],
    [
      'Rua Érico Mota, 200, Parquelândia, Fortaleza, CE, 60455530',
      'Joana Wanderley Zaranza',
      '20324354622',
    ],
    [
      'Avenida Engenheiro Leal Lima Verde, 800, Edson Queiroz, Fortaleza, CE, 60822330',
      'Lucas Arraes Bessa',
      '30435465723',
    ],
    [
      'Rua Padre Pedro de Alencar, 2019, Messejana, Fortaleza, CE, 60870730',
      'Manuela Coelho Dantas',
      '40546576824',
    ],
    [
      'Avenida Deputado Paulino Rocha, 1500, Castelão, Fortaleza, CE, 60863000',
      'Nicolas Drummond Fontenele',
      '50657687925',
    ],
    [
      'Rua Formosa, 670, Barra do Ceará, Fortaleza, CE, 60331080',
      'Olivia Girão Hélio',
      '60768798026',
    ],
    [
      'Rua Silva Jatahy, 950, Mucuripe, Fortaleza, CE, 60165070',
      'Pedro Ivo Jereissati',
      '70879809127',
    ],
    [
      'Rua Osvaldo Cruz, 2525, Dionísio Torres, Fortaleza, CE, 60125151',
      'Quintia Klein Leitão',
      '80980910228',
    ],
    [
      'Avenida Rogaciano Leite, 300, Sapiranga, Fortaleza, CE, 60810786',
      'Raul Moreira Nepomuceno',
      '90091021329',
    ],
    [
      'Rua Major Facundo, 700, José Bonifácio, Fortaleza, CE, 60025100',
      'Sarah Oaks Peixoto',
      '1102132430',
    ],
    [
      'Rua Professor Anacleto, 400, Damas, Fortaleza, CE, 60440360',
      'Tales Quintela Rêgo',
      '12132456731',
    ],
    [
      'Avenida dos Expedicionários, 5050, Bom Futuro, Fortaleza, CE, 60410411',
      'Valentina Saboia Castelo',
      '23143567832',
    ],
    [
      'Rua Carlos Jereissati, 150, Maraponga, Fortaleza, CE, 60710030',
      'William Tabosa Brasil',
      '34154678933',
    ],
    [
      'Avenida Presidente Costa e Silva, 3000, Passaré, Fortaleza, CE, 60864011',
      'Xenia Vale Drummond',
      '45165789034',
    ],
    [
      'Rua das Orquídeas, 56, Jangurussu, Fortaleza, CE, 60866010',
      'Yago Pompeu Esmeraldo',
      '56176890135',
    ],
    [
      'Rua Tibúrcio Cavalcante, 2020, Aldeota, Fortaleza, CE, 60125100',
      'Zelia Gurgel Furtado',
      '67187901236',
    ],
    [
      'Avenida Abolição, 3500, Meireles, Fortaleza, CE, 60165081',
      'Andre Barroso Cordeiro',
      '78198012337',
    ],
    [
      'Rua Nogueira Acioli, 1200, Centro, Fortaleza, CE, 60110140',
      'Bianca Dias Ellery',
      '89209123438',
    ],
    [
      'Rua Vicente Leite, 2200, Varjota, Fortaleza, CE, 60170151',
      'Celio Feitosa Gurgel',
      '90210234539',
    ],
    [
      'Rua Barbosa de Freitas, 1515, Papicu, Fortaleza, CE, 60170020',
      'Diana Justa Pinheiro',
      '1321345640',
    ],
  ];
  await Promise.all(
    clientsCsv.map(async ([endereco, nome, cpf], index) => {
      const [rua, num, bairro, cidade, estado, cep] = endereco.split(', ');
      await prisma.cliente.create({
        data: {
          cpf,
          nome,
          enderecos: {
            create: {
              bairro,
              rua,
              numero: Number(num),
              cidade,
              complemento: '',
            },
          },
        },
      });
    }),
  );

  // TipoPagamento
  const [tipoPagPix, tipoPagDin, tipoPagCred, tipoPagDeb] =
    await prisma.tipoPagamento.createManyAndReturn({
      data: [
        { descricao: 'Pix' },
        { descricao: 'Dinheiro' },
        { descricao: 'Cartão de Crédito' },
        { descricao: 'Cartão de Débito' },
      ],
    });

  // Promocao
  const promocoes = Promise.all([
    prisma.promocao.create({
      data: {
        nome: '10% OFF em Genéricos',
        dataInicio: new Date('2025-06-01'),
        dataFim: new Date('2025-06-10'),
        desconto: 0.1,
        tipo: TipoPromocao.Percentual,
        categoriasAplicaveis: { connect: { id: 2 } },
      },
    }),
    prisma.promocao.create({
      data: {
        nome: 'R$10 OFF em Maxalgina',
        dataInicio: new Date('2025-06-05'),
        dataFim: new Date('2025-06-15'),
        desconto: 10,
        tipo: TipoPromocao.Fixo,
        produtosAplicaveis: { connect: { id: 2 } },
      },
    }),
    prisma.promocao.create({
      data: {
        nome: '5% em Anti-hipertensivos Ref.',
        dataInicio: new Date('2025-06-03'),
        dataFim: new Date('2025-06-12'),
        desconto: 0.05,
        tipo: TipoPromocao.Percentual,
        produtosAplicaveis: { connect: { id: 1 } },
      },
    }),
  ]);

  // CampanhaMarketing
  await prisma.campanhaMarketing.createManyAndReturn({
    data: [
      {
        nome: 'Saúde em Dia Junho',
        dataInicio: new Date('2025-06-01'),
        dataFim: new Date('2025-06-15'),
        tipo: 'Desconto em Genéricos Selecionados',
      },
      {
        nome: 'Bem-Estar Prolongado',
        dataInicio: new Date('2025-06-16'),
        dataFim: new Date('2025-06-30'),
        tipo: 'Leve Mais Pague Menos',
      },
    ],
  });

  // Venda
  const vendasCsv: [string, number, number, number][] = [
    ['2025-06-01', 17, 1, 1],
    ['2025-06-01', 3, 3, 1],
    ['2025-06-01', 45, 2, 1],
    ['2025-06-01', 22, 4, 1],
    ['2025-06-01', 8, 1, 1],
    ['2025-06-01', 31, 2, 1],
    ['2025-06-01', 50, 3, 1],
    ['2025-06-01', 12, 1, 1],
    ['2025-06-01', 2, 4, 1],
    ['2025-06-01', 39, 2, 1],
    ['2025-06-01', 6, 1, 1],
    ['2025-06-01', 25, 3, 1],
    ['2025-06-01', 42, 1, 1],
    ['2025-06-01', 11, 2, 1],
    ['2025-06-01', 33, 4, 1],
    ['2025-06-01', 48, 1, 1],
    ['2025-06-01', 19, 2, 1],
    ['2025-06-01', 28, 3, 1],
    ['2025-06-01', 5, 1, 1],
    ['2025-06-01', 37, 4, 1],
    ['2025-06-01', 14, 2, 1],
    ['2025-06-01', 44, 1, 1],
    ['2025-06-01', 21, 3, 1],
    ['2025-06-01', 30, 2, 1],
    ['2025-06-01', 9, 1, 1],
    ['2025-06-01', 41, 4, 1],
    ['2025-06-01', 15, 3, 1],
    ['2025-06-01', 26, 1, 1],
    ['2025-06-01', 49, 2, 1],
    ['2025-06-01', 7, 3, 1],
    ['2025-06-01', 35, 1, 1],
    ['2025-06-01', 20, 4, 1],
    ['2025-06-01', 4, 2, 1],
    ['2025-06-01', 32, 1, 1],
    ['2025-06-01', 1, 3, 1],
    ['2025-06-02', 10, 1, 1],
    ['2025-06-02', 23, 2, 1],
    ['2025-06-02', 40, 3, 1],
    ['2025-06-02', 4, 1, 1],
    ['2025-06-02', 38, 4, 1],
    ['2025-06-02', 13, 2, 1],
    ['2025-06-02', 29, 1, 1],
    ['2025-06-02', 47, 3, 1],
    ['2025-06-02', 18, 2, 1],
    ['2025-06-02', 34, 1, 1],
    ['2025-06-02', 2, 4, 1],
    ['2025-06-02', 46, 3, 1],
    ['2025-06-02', 24, 1, 1],
    ['2025-06-02', 36, 2, 1],
    ['2025-06-02', 16, 4, 1],
    ['2025-06-02', 43, 1, 1],
    ['2025-06-02', 27, 2, 1],
    ['2025-06-02', 1, 3, 1],
    ['2025-06-02', 30, 1, 1],
    ['2025-06-02', 50, 4, 1],
    ['2025-06-02', 11, 2, 1],
    ['2025-06-02', 22, 1, 1],
    ['2025-06-02', 39, 3, 1],
    ['2025-06-02', 8, 2, 1],
    ['2025-06-02', 45, 1, 1],
    ['2025-06-02', 19, 4, 1],
    ['2025-06-02', 32, 3, 1],
    ['2025-06-02', 5, 1, 1],
    ['2025-06-02', 28, 2, 1],
    ['2025-06-02', 42, 1, 1],
    ['2025-06-02', 14, 3, 1],
    ['2025-06-02', 31, 4, 1],
    ['2025-06-02', 49, 2, 1],
    ['2025-06-02', 17, 1, 1],
    ['2025-06-02', 35, 3, 1],
    ['2025-06-03', 6, 2, 1],
    ['2025-06-03', 20, 4, 1],
    ['2025-06-03', 41, 1, 1],
    ['2025-06-03', 3, 3, 1],
    ['2025-06-03', 25, 2, 1],
    ['2025-06-03', 37, 1, 1],
    ['2025-06-03', 12, 4, 1],
    ['2025-06-03', 48, 3, 1],
    ['2025-06-03', 9, 1, 1],
    ['2025-06-03', 21, 2, 1],
    ['2025-06-03', 44, 4, 1],
    ['2025-06-03', 15, 1, 1],
    ['2025-06-03', 33, 3, 1],
    ['2025-06-03', 26, 2, 1],
    ['2025-06-03', 40, 1, 1],
    ['2025-06-03', 4, 4, 1],
    ['2025-06-03', 18, 3, 1],
    ['2025-06-03', 38, 1, 1],
    ['2025-06-03', 29, 2, 1],
    ['2025-06-03', 46, 4, 1],
    ['2025-06-03', 7, 1, 1],
    ['2025-06-03', 23, 3, 1],
    ['2025-06-03', 35, 2, 1],
    ['2025-06-03', 11, 1, 1],
    ['2025-06-03', 43, 4, 1],
    ['2025-06-03', 16, 3, 1],
    ['2025-06-03', 28, 1, 1],
    ['2025-06-03', 50, 2, 1],
    ['2025-06-03', 2, 4, 1],
    ['2025-06-03', 31, 1, 1],
    ['2025-06-03', 10, 3, 1],
    ['2025-06-03', 24, 2, 1],
    ['2025-06-03', 47, 1, 1],
    ['2025-06-03', 5, 4, 1],
    ['2025-06-03', 36, 3, 1],
    ['2025-06-04', 13, 1, 1],
    ['2025-06-04', 42, 2, 1],
    ['2025-06-04', 1, 3, 1],
    ['2025-06-04', 22, 1, 1],
    ['2025-06-04', 39, 4, 1],
    ['2025-06-04', 8, 2, 1],
    ['2025-06-04', 45, 1, 1],
    ['2025-06-04', 19, 3, 1],
    ['2025-06-04', 32, 2, 1],
    ['2025-06-04', 5, 1, 1],
    ['2025-06-04', 28, 4, 1],
    ['2025-06-04', 42, 3, 1],
    ['2025-06-04', 14, 1, 1],
    ['2025-06-04', 31, 2, 1],
    ['2025-06-04', 49, 4, 1],
    ['2025-06-04', 17, 1, 1],
    ['2025-06-04', 35, 3, 1],
    ['2025-06-04', 6, 2, 1],
    ['2025-06-04', 20, 1, 1],
    ['2025-06-04', 41, 4, 1],
    ['2025-06-04', 3, 3, 1],
    ['2025-06-04', 25, 2, 1],
    ['2025-06-04', 37, 1, 1],
    ['2025-06-04', 12, 4, 1],
    ['2025-06-04', 48, 3, 1],
    ['2025-06-04', 9, 1, 1],
    ['2025-06-04', 21, 2, 1],
    ['2025-06-04', 44, 4, 1],
    ['2025-06-04', 15, 1, 1],
    ['2025-06-04', 33, 3, 1],
    ['2025-06-04', 26, 2, 1],
    ['2025-06-04', 40, 1, 1],
    ['2025-06-04', 4, 4, 1],
    ['2025-06-04', 18, 3, 1],
    ['2025-06-04', 38, 1, 1],
    ['2025-06-05', 29, 2, 1],
    ['2025-06-05', 46, 4, 1],
    ['2025-06-05', 7, 1, 1],
    ['2025-06-05', 23, 3, 1],
    ['2025-06-05', 35, 2, 1],
    ['2025-06-05', 11, 1, 1],
    ['2025-06-05', 43, 4, 1],
    ['2025-06-05', 16, 3, 1],
    ['2025-06-05', 28, 1, 1],
    ['2025-06-05', 50, 2, 1],
    ['2025-06-05', 2, 4, 1],
    ['2025-06-05', 31, 1, 1],
    ['2025-06-05', 10, 3, 1],
    ['2025-06-05', 24, 2, 1],
    ['2025-06-05', 47, 1, 1],
    ['2025-06-05', 5, 4, 1],
    ['2025-06-05', 36, 3, 1],
    ['2025-06-05', 13, 1, 1],
    ['2025-06-05', 42, 2, 1],
    ['2025-06-05', 1, 3, 1],
    ['2025-06-05', 22, 1, 1],
    ['2025-06-05', 39, 4, 1],
    ['2025-06-05', 8, 2, 1],
    ['2025-06-05', 45, 1, 1],
    ['2025-06-05', 19, 3, 1],
    ['2025-06-05', 32, 2, 1],
    ['2025-06-05', 5, 1, 1],
    ['2025-06-05', 28, 4, 1],
    ['2025-06-05', 42, 3, 1],
    ['2025-06-05', 14, 1, 1],
    ['2025-06-05', 31, 2, 1],
    ['2025-06-05', 49, 4, 1],
    ['2025-06-05', 17, 1, 1],
    ['2025-06-05', 35, 3, 1],
    ['2025-06-05', 25, 2, 1],
  ];
  await Promise.all(
    vendasCsv.map(
      async ([dataVenda, clienteId, tipoPagamentoId, campanhaMarketingId]) => {
        const pedidos: any[] = [];
        const count = Math.ceil(Math.random() * 10);
        for (let i = 0; i < count; i++) {
          pedidos.push({
            produtoId: products[Math.floor(Math.random() * products.length)].id,
            qtd: Math.ceil(Math.random() * 10),
          });
        }

        await prisma.venda.create({
          data: {
            dataVenda: new Date(dataVenda),
            clienteId,
            tipoPagamentoId,
            campanhaMarketingId,
            pedidos: { createMany: { data: pedidos } },
          },
        });
      },
    ),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
