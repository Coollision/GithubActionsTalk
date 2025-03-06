import { PrismaClient } from "@prisma/client";

export class PrismaRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    getClient() {
        return this.prisma;
    }
}
