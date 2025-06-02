# Backend BI

## Desenvolvendo

Para iniciar o servidor de desenvolvimento:

> [!IMPORTANT]
> Verificar que você esteja na pasta apps/backend

```bash
bun run dev
```

Então abra `http://localhost:3000/swagger` no navegador para acessar a documentação da API.

## Banco de Dados

1. Iniciar o postgres com docker:

```bash
docker-compose up -d
```

> [!IMPORTANT]
> Talvez seja necessário usar sudo no linux!

2. Realizar as migrações:

```bash
bun run migrate:dev
```

3. Gerar o código do cliente:

```bash
bun run migrate:dev
```
