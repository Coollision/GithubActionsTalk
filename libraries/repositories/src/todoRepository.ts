import { Knex } from "knex";
import { KnexClient } from "./knexRepository";

export class TodoRepository {
    private readonly knex: Knex;

    constructor(knex: KnexClient) {
        this.knex = knex.getClient();
    }

    async getTodos(): Promise<any[]> {
        return this.knex("Todos").select("*");
    }

    async createTodo(data: { title: string }): Promise<any> {
        const [todo] = await this.knex("Todos").insert(data).returning("*");
        return todo;
    }

    async updateTodo(id: number, data: { title?: string; completed?: boolean }): Promise<any> {
        const [todo] = await this.knex("Todos").where({ id }).update(data).returning("*");
        return todo;
    }

    async deleteTodo(id: number): Promise<any> {
        const [todo] = await this.knex("Todos").where({ id }).del().returning("*");
        return todo;
    }

    async deleteAllTodos(): Promise<void> {
        await this.knex("Todos").del();
    }
}
