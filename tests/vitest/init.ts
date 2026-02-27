import { unlink, writeFile } from "node:fs/promises";

export default void (async (): Promise<void> => {
    beforeAll(async () => writeFile("tests/vitest/cache/index.ts", ""));
    afterAll(async () => unlink("tests/vitest/cache/index.ts").catch(() => null));
})();
