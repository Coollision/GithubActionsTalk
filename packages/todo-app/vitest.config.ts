import { defineConfig } from "vitest/config";
import defineConfigBase from "../../vitestbase.config";

export default defineConfig({
    test: {
        ...defineConfigBase.test,
        setupFiles: ["./__tests__/testSetup.js"],
        name: "todo-app",
    },
});
