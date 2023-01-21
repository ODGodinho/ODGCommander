import StubCreator from "../../../../src/Generators/StubCreator";

describe("Get stub path tests", () => {
    const stubCreator = new StubCreator();
    test("Get Path", () => {
        expect(stubCreator.getStubPath()).toBeDefined();
    });
});
