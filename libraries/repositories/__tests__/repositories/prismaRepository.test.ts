import { describe, it, expect } from "vitest";
import { PrismaRepository } from "@internal/repositories/src/prismaRepository";

describe("PrismaRepository tests", () => {
    it("should create a PrismaClient instance", () => {
        const repo = new PrismaRepository();
        expect(repo.getClient()).toBeDefined();
    });
});
