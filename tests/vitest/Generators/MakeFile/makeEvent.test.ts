import { existsSync } from "node:fs";
import { unlink } from "node:fs/promises";

import { vi } from "vitest";

import MakeFile from "../../../../src/Generators/MakeFile";

describe("makeEvent Test", () => {
    vi.spyOn(console, "log").mockImplementation(() => void 0);

    const make = new MakeFile();

    const path = `${process.cwd()}/tests/vitest/cache`;
    const filePath = `${path}/ExampleEventListener.ts`;

    afterAll(async () => {
        await unlink(`${path}/ExampleEventListener.ts`).catch(() => null);
    });

    test("Generate ExampleEventListener", async () => {
        await expect(make.makeEvent("Example", { path: path }))
            .resolves
            .toBeUndefined();

        expect(existsSync(filePath))
            .toBeTruthy();
    });
});
