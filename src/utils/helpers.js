import { LaPressModule } from "./Module";

export const createModule = payload => {
    /*
    { key: '', config: {}, module: {} }
     */
    return new LaPressModule(payload);
};


