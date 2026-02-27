import { existsSync } from "node:fs";
import { unlink } from "node:fs/promises";

import { InvalidArgumentException } from "@odg/exception";

import StubCreator from "src/Generators/StubCreator";

describe("Create Page StubTest", () => {
    const stubCreator = new StubCreator();
    const path = `${process.cwd()}/tests/vitest/cache`;

    afterAll(async () => {
        unlink(`${path}/ExamplePage1.ts`).catch(() => null);
        unlink(`${path}/ExamplePage2.ts`).catch(() => null);
    });

    test("Generate ExamplePage", async () => {
        const filePath = `${path}/ExamplePage1.ts`;

        await expect(stubCreator.create("page", "ExamplePage1", path, {
            "PageName:UCFirst": "Payment",
            "PageName": "payment",
        }))
            .resolves
            .toBeDefined();

        expect(existsSync(filePath))
            .toBeTruthy();
    });

    test("Generate ExamplePage2 Exists", async () => {
        const filePath = `${path}/ExamplePage2.ts`;

        expect(existsSync(filePath))
            .toBeFalsy();

        await stubCreator.create("page", "ExamplePage2", path, {
            "PageName:UCFirst": "Payment",
            "PageName": "payment",
        });

        expect(existsSync(filePath))
            .toBeTruthy();

        const file = stubCreator.create("page", "ExamplePage2", path, {
            "PageName:UCFirst": "Payment",
            "PageName": "payment",
        });

        await expect(file)
            .rejects
            .toThrowError(new InvalidArgumentException("The ExamplePage2 already exists."));
    });
});
