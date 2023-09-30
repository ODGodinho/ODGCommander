import { Str } from "@odg/chemical-x";

import StubCreator from "./StubCreator";

interface MakePageInterface {
    selectors: boolean;
    event: boolean;
    path: string;
    eventPath?: string;
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

interface MakeEventInterface {
    path: string;
}

interface MakeExceptionInterface {
    path: string;
    unknown: boolean;
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
            "PageName:LCFirst": pageName.charAt(0).toLowerCase() + pageName.slice(1),
        });

        if (options.selectors && options.selectorPath) {
            await this.makeSelectors(pageName, { path: options.selectorPath });
        }

        if (options.event && options.eventPath) {
            await this.makeEvent(pageName, { path: options.eventPath });
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
            "SelectorName:LCFirst": selectorName.charAt(0).toLowerCase() + selectorName.slice(1),
        });

        console.log(`Selector created successfully in : ${filePath}`);
    }

    /**
     * Use this function to create handler file
     *
     * @param {string} handlerName Handler name
     * @param {MakeHandlerInterface} options Options command
     * @returns {Promise<void>}
     */
    public async makeHandler(handlerName: string, options: MakeHandlerInterface): Promise<void> {
        const stubCreator = new StubCreator();
        const handlerFrom = options.handlerFrom ?? handlerName;
        const handlerTo = options.handlerTo ?? handlerName;

        const filePath = await stubCreator.create("handler", `${handlerFrom}To${handlerTo}Handler`, options.path, {
            "OriginHandler:UCFirst": handlerFrom,
            "DestinationHandler:UCFirst": handlerTo,
        });

        console.log(`Handler created successfully in : ${filePath}`);
    }

    /**
     * Use this function to create handler file
     *
     * @param {string} eventName Event name
     * @param {MakeEventInterface} options Options command
     * @returns {Promise<void>}
     */
    public async makeEvent(eventName: string, options: MakeEventInterface): Promise<void> {
        const stubCreator = new StubCreator();
        const pageUcFirst = new Str(eventName).ucFirst().toString();

        const filePath = await stubCreator.create("event", `${pageUcFirst}EventListener`, options.path, {
            "EventName:UCFirst": pageUcFirst,
            "EventName:LCFirst": eventName.charAt(0).toLowerCase() + eventName.slice(1),
        });

        console.log(`Handler created successfully in : ${filePath}`);
    }

    /**
     * Use this function to create exception file
     *
     * @param {string} exceptionName Exception name
     * @param {MakeExceptionInterface} options Options command
     * @returns {Promise<void>}
     */
    public async makeException(exceptionName: string, options: MakeExceptionInterface): Promise<void> {
        const stubCreator = new StubCreator();
        const exceptionUcFirst = new Str(exceptionName).ucFirst().toString();
        const exceptionType = options.unknown ? "UnknownException" : "Exception";

        const filePath = await stubCreator.create("exception", `${exceptionUcFirst}${exceptionType}`, options.path, {
            "ExceptionType": exceptionType,
            "ExceptionName": exceptionUcFirst,
        });

        console.log(`Exception created successfully in : ${filePath}`);
    }

}
