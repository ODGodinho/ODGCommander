import { existsSync } from "node:fs";
import { unlink } from "node:fs/promises";

import { NullLogger } from "@odg/log";
import { vi } from "vitest";

import MakeFile from "src/Generators/MakeFile";

describe("makeSelectors Test", () => {
    vi.spyOn(console, "log").mockImplementation(() => void 0);

    const make = new MakeFile(new NullLogger());

    const path = `${process.cwd()}/tests/vitest/cache`;
    const filePath = `${path}/Example1Selector.ts`;

    afterAll(async () => {
        await unlink(`${path}/Example1Selector.ts`).catch(() => null);
    });

    test("Generate Example1Selectors", async () => {
        await expect(make.makeSelectors("Example1", { path }))
            .resolves
            .toBeUndefined();

        expect(existsSync(filePath))
            .toBeTruthy();
    });
});
