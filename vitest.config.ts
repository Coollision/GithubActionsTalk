import { defineConfig } from "vitest/config";
import defineConfigBase from "./vitestbase.config";

import dotenv from "dotenv";

dotenv.config({ path: "./.env.test" });

export default defineConfig({
    test: {
        ...defineConfigBase.test,
    },
});
