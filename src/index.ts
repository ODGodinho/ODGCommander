import { program } from "commander";

import MakeFile from "./Generators/MakeFile";

const make = new MakeFile();

const pathOption = "-p, --path <path>";

program
    .command("make:page")
    .name("make:page")
    .argument("<pageName>", "page name create")
    .option(pathOption, "Destination Page Path", "./src/Pages/")
    .option("-s, --selectors", "Create Selectors", false)
    .option("-sp, --selectorPath", "Selector Path", "./src/Selectors/")
    .option("-ev, --event", "Create Event", false)
    .option("-evp, --eventPath", "Event Path", "./src/app/Listeners")
    .option("-hp, --handlerPath", "Handler Path", "./src/Handlers/")
    .option("--handler-from <handlerFrom>", "Use If Handler From")
    .option("--handler-to <handlerTo>", "Use if Handler To")
    .description("Test command description")
    .version("0.1.1")
    .action(make.makePage.bind(make));

program
    .command("make:selector")
    .name("make:selector")
    .argument("<selectorName>", "selector of page name")
    .option(pathOption, "Destination Selector Path", "./src/Selectors/")
    .description("Test command description")
    .version("0.1.1")
    .action(make.makeSelectors.bind(make));

program
    .command("make:handler")
    .name("make:handler")
    .argument("<handlerName>", "selector of page name")
    .option("--handler-from <handlerFrom>", "handler source page")
    .option("--handler-to <handlerFrom>", "handle landing page")
    .option(pathOption, "Destination Path", "./src/Handlers/")
    .description("Make Handler file")
    .version("0.1.1")
    .action(make.makeHandler.bind(make));

program
    .command("make:event")
    .name("make:event")
    .argument("<eventName>", "EventName")
    .option(pathOption, "Destination Path", "./src/app/Listeners")
    .description("Create EventListener file example")
    .version("0.1.1")
    .action(make.makeEvent.bind(make));

program.parse();
