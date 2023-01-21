import StubCreator from "../../../../src/Generators/StubCreator";

describe("Get stub path tests", () => {
    const stubCreator = new StubCreator();
    test("get Stub test content", async () => {
        await expect(stubCreator.getStub("example", { stub: "test" }))
            .resolves
            .toStrictEqual("example test\n");
    });
});
