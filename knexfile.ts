import type { Knex } from "knex";

// Update with your config settings.

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST } = process.env;

const postgresUser = POSTGRES_USER || "postgres";
const postgresPassword = POSTGRES_PASSWORD || "postgres";
const postgresHost = POSTGRES_HOST || "localhost";
const postgresDatabase = "postgres";

const config: { [key: string]: Knex.Config } = {
    development: {
        client: "postgresql",
        connection: {
            database: postgresDatabase,
            user: postgresUser,
            password: postgresPassword,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
            directory: "./libraries/repositories/src/migrations/",
            extension: "ts",
        },
        seeds: {
            directory: "./libraries/repositories/src/seeds/",
            extension: "ts",
        },
    },
};

module.exports = config;