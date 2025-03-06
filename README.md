# Using Prisma

1. Make sure the Postgres database is running:
   - `npm run db:start`

2. Add or edit your models in the Prisma schema:
   - `src/prisma/schema.prisma`

3. Synchronize the schema to the database:
   - `npx prisma migrate dev --name init`

4. Generate the Prisma client for TypeScript:
   - `npx prisma generate`

5. Seed the database with initial data (optional):
   - `npm run db:seed`

6. Start the server:
   - `npm run dev`

For more details, refer to [the Prisma docs](https://www.prisma.io/docs).

# Running GitHub Actions Locally with `act`

1. Install `act`:
   - Follow the instructions on the [act GitHub repository](https://github.com/nektos/act#installation).
   brew install act


2. Run the CI workflow locally:
   - `act -j lint`
   - `act -j test`
   - `act -j build`

3. To run all jobs:
   - `act`

4. To simulate a specific event (e.g., push):
   - `act push`

For more details, refer to the [act documentation](https://github.com/nektos/act#usage).



yarn db:start