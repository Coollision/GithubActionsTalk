import { Todo } from "@prisma/client";
import { PrismaRepository } from "./prismaRepository";

export class TodoRepository {
    private prisma;

    constructor(prismaRepository: PrismaRepository) {
        this.prisma = prismaRepository.getClient();
    }

    async getTodos(): Promise<Todo[]> {
        return this.prisma.todo.findMany();
    }

    async createTodo(data: { title: string }): Promise<Todo> {
        return this.prisma.todo.create({
            data,
        });
    }

    async updateTodo(id: number, data: { title?: string; completed?: boolean }): Promise<Todo> {
        return this.prisma.todo.update({
            where: { id },
            data,
        });
    }

    async deleteTodo(id: number): Promise<Todo> {
        return this.prisma.todo.delete({
            where: { id },
        });
    }
}
