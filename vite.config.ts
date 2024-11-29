import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

const coverage100 = 100;
const vite = defineConfig({
    test: {
        globals: true,
        pool: "forks",
        poolOptions: {
            forks: {
                maxForks: 1,
                minForks: 1,
            },
        },
        coverage: {
            enabled: true,
            provider: "v8",
            thresholds: {
                branches: coverage100,
                functions: coverage100,
                lines: coverage100,
                statements: coverage100,
            },
            exclude: [
                "src/index.ts",
                "src/index.js",
                "odg.js",
            ],
        },
        setupFiles: [
            "./tests/vitest/init.ts",
        ],
    },
    plugins: [ tsconfigPaths() ],

});

export default vite;
