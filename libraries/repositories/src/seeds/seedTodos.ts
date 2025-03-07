import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("Todos").del();

    // Inserts seed entries
    await knex("Todos").insert([
        { title: "First todo", completed: false },
        { title: "Second todo", completed: true },
        { title: "Third todo", completed: false },
    ]);
}
