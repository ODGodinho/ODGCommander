import { existsSync } from "node:fs";
import { unlink } from "node:fs/promises";

import MakeFile from "../../../../src/Generators/MakeFile";

describe("makePage Test", () => {
    jest.spyOn(console, "log").mockImplementation(() => void 0);

    const make = new MakeFile();

    const path = `${process.cwd()}/tests/jest/cache`;
    const filePath = `${path}/ExamplePage.ts`;

    afterEach(async () => unlink(`${path}/ExamplePage.ts`).catch(() => null));
    afterEach(async () => unlink(`${path}/ExampleEventListener.ts`).catch(() => null));
    afterEach(async () => unlink(`${path}/ExampleSelector.ts`).catch(() => null));
    afterEach(async () => unlink(`${path}/ExampleToExampleHandler.ts`).catch(() => null));

    test("Generate ExamplePage", async () => {
        const makePage = make.makePage(
            "Example",
            {
                path: path,
                selectors: true,
                event: true,
                eventPath: path,
                selectorPath: path,
                handlerPath: path,
                handlerFrom: "Example",
            },
        );
        await expect(makePage)
            .resolves
            .toBeUndefined();

        expect(existsSync(filePath))
            .toBeTruthy();
    });

    test("Generate With To Handler", async () => {
        const makePage = make.makePage(
            "Example",
            {
                path: path,
                selectors: false,
                event: false,
                handlerPath: path,
                handlerTo: "Example",
            },
        );
        await expect(makePage)
            .resolves
            .toBeUndefined();

        expect(existsSync(filePath))
            .toBeTruthy();
    });
});
