import { existsSync } from "node:fs";
import { unlink } from "node:fs/promises";

import MakeFile from "../../../../src/Generators/MakeFile";

describe("makeEvent Test", () => {
    jest.spyOn(console, "log").mockImplementation(() => void 0);

    const make = new MakeFile();

    const path = `${process.cwd()}/tests/jest/cache`;
    const filePath1 = `${path}/LoginException.ts`;
    const filePath2 = `${path}/LoginUnknownException.ts`;

    afterAll(async () => {
        await Promise.all([
            unlink(`${path}/LoginException.ts`).catch(() => null),
            unlink(`${path}/LoginUnknownException.ts`).catch(() => null),
        ]);
    });

    test("Generate LoginException", async () => {
        await expect(make.makeException("Login", { path: path, unknown: false }))
            .resolves
            .toBeUndefined();

        expect(existsSync(filePath1))
            .toBeTruthy();
    });

    test("Generate LoginUnknownException", async () => {
        await expect(make.makeException("Login", { path: path, unknown: true }))
            .resolves
            .toBeUndefined();

        expect(existsSync(filePath2))
            .toBeTruthy();
    });
});
