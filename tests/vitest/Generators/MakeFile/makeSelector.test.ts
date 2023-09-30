import { existsSync } from "node:fs";
import { unlink } from "node:fs/promises";

import { vi } from "vitest";

import MakeFile from "../../../../src/Generators/MakeFile";

describe("makeSelectors Test", () => {
    vi.spyOn(console, "log").mockImplementation(() => void 0);

    const make = new MakeFile();

    const path = `${process.cwd()}/tests/vitest/cache`;
    const filePath = `${path}/ExampleSelector.ts`;

    afterAll(async () => {
        await unlink(`${path}/ExampleSelector.ts`).catch(() => null);
    });

    test("Generate ExampleSelectors", async () => {
        await expect(make.makeSelectors("Example", { path: path }))
            .resolves
            .toBeUndefined();

        expect(existsSync(filePath))
            .toBeTruthy();
    });
});
