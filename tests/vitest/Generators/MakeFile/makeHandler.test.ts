import { existsSync } from "node:fs";
import { unlink } from "node:fs/promises";

import { vi } from "vitest";

import MakeFile from "../../../../src/Generators/MakeFile";

describe("makeHandler Test", () => {
    vi.spyOn(console, "log").mockImplementation(() => void 0);
    const make = new MakeFile();

    const path = `${process.cwd()}/tests/vitest/cache`;
    let filePath: string;

    test("Generate HomeToLoginHandler", async () => {
        filePath = `${path}/HomeToLoginHandler.ts`;
        await expect(make.makeHandler("Home", { path: path, handlerTo: "Login" }))
            .resolves
            .toBeUndefined();

        expect(existsSync(filePath))
            .toBeTruthy();

        unlink(filePath).catch(() => null);
    });

    test("Generate LoginToHomeHandler", async () => {
        filePath = `${path}/LoginToHomeHandler.ts`;
        await expect(make.makeHandler("Home", { path: path, handlerFrom: "Login" }))
            .resolves
            .toBeUndefined();

        expect(existsSync(filePath))
            .toBeTruthy();

        unlink(filePath).catch(() => null);
    });

    test("Generate From and To Handler", async () => {
        filePath = `${path}/LoginToHomeHandler.ts`;
        await expect(make.makeHandler("Home", { path: path, handlerFrom: "Login", handlerTo: "Home" }))
            .resolves
            .toBeUndefined();

        expect(existsSync(filePath))
            .toBeTruthy();

        unlink(filePath).catch(() => null);
    });
});
