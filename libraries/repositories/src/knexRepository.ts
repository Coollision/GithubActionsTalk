import knex, { Knex } from "knex";

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST } = process.env;

const postgresUser = POSTGRES_USER || "postgres";
const postgresPassword = POSTGRES_PASSWORD || "postgres";
const postgresHost = POSTGRES_HOST || "localhost";
const postgresDatabase = "postgres";

export class KnexClient {
    private knex: Knex;

    constructor() {
        this.knex = knex({
            client: "pg",
            connection: {
                user: postgresUser,
                password: postgresPassword,
                host: postgresHost,
                database: postgresDatabase,
            },
        });
    }

    getClient() {
        return this.knex;
    }
}
