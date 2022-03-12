# Backend development

Useful commands:

Whenever you change the schema the prisma.sh will fail so you need to manually apply the migrations.

```sh
docker-compose exec api sh
yarn prisma migrate dev # To only apply migrations, not create them
```

If developing:

```sh
yarn prisma migrate dev --name init

yarn prisma migrate reset --force

yarn seed
```
