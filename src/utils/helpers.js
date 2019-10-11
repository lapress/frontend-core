import { LaPressModule } from "./Module";

export const createModule = payload => {
  /*
    { key: '', config: {}, module: {} }
     */
  return new LaPressModule(payload);
};

export const getImageUrl = (path, width, height, method = 'fit') => {
  return `/img/${width}/${height}/${method}${path}`;
};


