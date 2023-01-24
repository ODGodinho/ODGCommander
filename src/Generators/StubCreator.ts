import * as Filesystem from "node:fs";
import nodePath from "node:path";
import { promisify } from "node:util";

import { Str } from "@odg/chemical-x";

import { InvalidArgumentException } from "../Exceptions/InvalidArgumentException";

export default class StubCreator {

    private readonly filesystem: typeof Filesystem = Filesystem;

    public async create(
        stub: string,
        name: string,
        pathDestination: string,
        variables: Record<string, number | string>,
    ): Promise<string> {
        const destination = await this.getPath(name, pathDestination);

        if (this.filesystem.existsSync(destination)) {
            throw new InvalidArgumentException(`The ${name} already exists.`);
        }

        const content = await this.getStub(stub, variables);

        await promisify(this.filesystem.mkdir)(pathDestination, { recursive: true });
        await promisify(this.filesystem.writeFile)(destination, content, {});

        return destination;
    }

    /**
     * Return stub file content.
     *
     * @param {string} name Name file stub
     * @param {Record<string, number | string>} variables Variable to replace in stub
     * @returns {string}
     */
    public async getStub(name: string, variables: Record<string, number | string>): Promise<string> {
        const pathStub = await this.getStubPath(name);
        const file = await promisify(this.filesystem.readFile)(`${pathStub}/${name}.stub`);

        return new Str(file.toString())
            .formatUnicorn(variables)
            .toString();
    }

    /**
     * Return path to save stub.
     *
     * @param {string} name Generate file name
     * @param {string} path File path destination
     * @returns {string}
     */
    public async getPath(name: string, path: string): Promise<string> {
        return `${path}/${name}.ts`;
    }

    /**
     * Get the path to the stubs.
     *
     * @param {string} name Stub File Name
     * @returns {string}
     */
    public async getStubPath(name: string): Promise<string> {
        if (this.filesystem.existsSync(`${nodePath.resolve("./stubs")}/${name}.stub`)) {
            return nodePath.resolve("./stubs");
        }

        return nodePath.join(process.cwd(), "node_modules/@odg/command/stubs");
    }

}
