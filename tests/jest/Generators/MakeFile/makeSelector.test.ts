import { existsSync } from "node:fs";
import { unlink } from "node:fs/promises";

import MakeFile from "../../../../src/Generators/MakeFile";

describe("makeSelectors Test", () => {
    jest.spyOn(console, "log").mockImplementation(() => void 0);

    const make = new MakeFile();

    const path = `${process.cwd()}/tests/jest/cache`;
    const filePath = `${path}/ExampleSelector.ts`;

    afterAll(async () => unlink(`${path}/ExampleSelector.ts`).catch(() => null));

    test("Generate ExampleSelectors", async () => {
        await expect(make.makeSelectors("Example", { path: path }))
            .resolves
            .toBeUndefined();

        expect(existsSync(filePath))
            .toBeTruthy();
    });
});
