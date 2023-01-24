import { Str } from "@odg/chemical-x";

import StubCreator from "./StubCreator";

interface MakePageInterface {
    selectors: boolean;
    path: string;
    selectorPath?: string;
    handlerPath?: string;
    handlerFrom?: string;
    handlerTo?: string;
}

interface MakeSelectorInterface {
    path: string;
}

interface MakeHandlerInterface {
    path: string;
    handlerFrom?: string;
    handlerTo?: string;
}

export default class MakeFile {

    /**
     * Use this function to create Page Crawler class
     *
     * @param {string} pageName Selector file name
     * @param {MakePageInterface} options Options command
     * @returns {Promise<void>}
     */
    public async makePage(pageName: string, options: MakePageInterface): Promise<void> {
        const stubCreator = new StubCreator();
        const pageUcFirst = new Str(pageName).ucFirst().toString();
        const filePath = await stubCreator.create("page", `${pageUcFirst}Page`, options.path, {
            "PageName:UCFirst": pageUcFirst,
            "PageName": pageName.charAt(0).toLowerCase() + pageName.slice(1),
        });

        if (options.selectors && options.selectorPath) {
            await this.makeSelectors(pageName, { path: options.selectorPath });
        }

        if (options.handlerPath && (options.handlerFrom ?? options.handlerTo)) {
            await this.makeHandler(pageName, {
                path: options.handlerPath,
                handlerFrom: options.handlerFrom,
                handlerTo: options.handlerTo,
            });
        }

        console.log(`Page created successfully in : ${filePath}`);
    }

    /**
     * Use this function to create selector class
     *
     * @param {string} selectorName Selector file name
     * @param {MakeSelectorInterface} options Options command
     * @returns {Promise<void>}
     */
    public async makeSelectors(selectorName: string, options: MakeSelectorInterface): Promise<void> {
        const stubCreator = new StubCreator();
        const pageUcFirst = new Str(selectorName).ucFirst().toString();

        const filePath = await stubCreator.create("selector", `${pageUcFirst}Selector`, options.path, {
            "SelectorName:UCFirst": pageUcFirst,
            "SelectorName": selectorName.charAt(0).toLowerCase() + selectorName.slice(1),
        });

        console.log(`Selector created successfully in : ${filePath}`);
    }

    /**
     * Use this function to create handler file
     *
     * @param {string} handlerName Handler file name
     * @param {MakeHandlerInterface} options Options command
     * @returns {Promise<void>}
     */
    public async makeHandler(handlerName: string, options: MakeHandlerInterface): Promise<void> {
        const stubCreator = new StubCreator();
        const handlerFrom = options.handlerFrom ?? handlerName;
        const handlerTo = options.handlerTo ?? handlerName;

        const filePath = await stubCreator.create("handler", `${handlerFrom}To${handlerTo}Handler`, options.path, {
            "OriginHandler:UcFirst": handlerFrom,
            "DestinationHandler:UcFirst": handlerTo,
        });

        console.log(`Handler created successfully in : ${filePath}`);
    }

}
