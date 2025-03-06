import { describe, it, expect, beforeAll } from "vitest";
import { PrismaRepository } from "@internal/repositories/src/prismaRepository";
import { TodoRepository } from "@internal/repositories/src/todoRepository";

describe("TodoRepository", () => {
    let todoRepo: TodoRepository;

    beforeAll(async () => {
        const prismaRepo = new PrismaRepository();
        todoRepo = new TodoRepository(prismaRepo);
        await todoRepo.prisma.todo.deleteMany({});
    });

    it("should create a todo", async () => {
        const todo = await todoRepo.createTodo({ title: "Test create" });
        expect(todo.id).toBeDefined();
        expect(todo.title).toBe("Test create");
    });

    it("should fetch todos", async () => {
        const todos = await todoRepo.getTodos();
        expect(Array.isArray(todos)).toBe(true);
    });

    it("should update a todo", async () => {
        const created = await todoRepo.createTodo({ title: "Update me" });
        const updated = await todoRepo.updateTodo(created.id, { completed: true });
        expect(updated.completed).toBe(true);
    });

    it("should delete a todo", async () => {
        const created = await todoRepo.createTodo({ title: "Delete me" });
        const deleted = await todoRepo.deleteTodo(created.id);
        expect(deleted.id).toBe(created.id);
    });
});
