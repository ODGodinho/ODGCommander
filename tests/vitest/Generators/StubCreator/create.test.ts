import { existsSync } from "node:fs";
import { unlink } from "node:fs/promises";

import { InvalidArgumentException } from "../../../../src/Exceptions/InvalidArgumentException";
import StubCreator from "../../../../src/Generators/StubCreator";

describe("Create Page StubTest", () => {
    const stubCreator = new StubCreator();
    const path = `${process.cwd()}/tests/vitest/cache`;
    const filePath = `${path}/ExamplePage.ts`;

    afterAll(async () => unlink(`${path}/ExamplePage.ts`).catch(() => null));

    test("Generate ExamplePage", async () => {
        await expect(stubCreator.create("page", "ExamplePage", path, {
            "PageName:UCFirst": "Payment",
            "PageName": "payment",
        }))
            .resolves
            .toBeDefined();

        expect(existsSync(filePath))
            .toBeTruthy();
    });

    test("Generate ExamplePage Exists", async () => {
        expect(existsSync(filePath))
            .toBeTruthy();

        const file = stubCreator.create("page", "ExamplePage", path, {
            "PageName:UCFirst": "Payment",
            "PageName": "payment",
        });

        await expect(file)
            .rejects
            .toThrowError(new InvalidArgumentException("The ExamplePage already exists."));
    });
});
