import { existsSync } from "node:fs";
import { unlink } from "node:fs/promises";

import MakeFile from "../../../../src/Generators/MakeFile";

describe("makeEvent Test", () => {
    jest.spyOn(console, "log").mockImplementation(() => void 0);

    const make = new MakeFile();

    const path = `${process.cwd()}/tests/jest/cache`;
    const filePath = `${path}/ExampleEventListener.ts`;

    afterAll(async () => unlink(`${path}/ExampleEventListener.ts`).catch(() => null));

    test("Generate ExampleEventListener", async () => {
        await expect(make.makeEvent("Example", { path: path }))
            .resolves
            .toBeUndefined();

        expect(existsSync(filePath))
            .toBeTruthy();
    });
});
