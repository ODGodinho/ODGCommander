import { unlink, writeFile } from "node:fs/promises";
import "vitest/globals.d.ts";

export default void (async (): Promise<void> => {
    beforeAll(async () => writeFile("tests/vitest/cache/index.ts", ""));
    afterAll(async () => unlink("tests/vitest/cache/index.ts"));
})();
