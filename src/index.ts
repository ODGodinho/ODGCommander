#!/usr/bin/env node
import { program } from "commander";

import StubCreator from "./Generators/StubCreator";
import { Str } from "@odg/chemical-x";

program
    .command("make:page")
    .name("make:page")
    .argument("<pageName>", "page name create")
    .description("Test command description")
    .version("0.1.1")
    .action(async (pageName: string) => {
        const stubCreator = new StubCreator();
        await stubCreator.create("page", `${pageName}Page`, "./", {
            "PageName:UCFirst": new Str(pageName).ucFirst().toString(),
            "PageName": pageName.charAt(0).toLowerCase() + pageName.slice(1),
        });
    });

program.parse();
