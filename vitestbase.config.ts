import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        coverage: {
            enabled: true,
            reportsDirectory: "./dist/coverage",
            reporter: ["text", "text-summary"],
            provider: "v8",
        },
        environment: "node",
        testTimeout: 20000,
        globals: true,
    },
});
