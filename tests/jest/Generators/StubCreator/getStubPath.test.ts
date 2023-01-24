import StubCreator from "../../../../src/Generators/StubCreator";

describe("Get stub path tests", () => {
    const stubCreator = new StubCreator();
    test("Get Path", async () => {
        expect(await stubCreator.getStubPath("page")).toBeDefined();
    });

    test("Get InvalidStub", async () => {
        expect(await stubCreator.getStubPath("invalid")).toMatch(/node_modules[/\\]@odg[/\\]command[/\\]stubs/);
    });
});
