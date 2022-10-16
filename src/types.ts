export interface Provider {
  name: string;
  version: string;
}

export interface Service {
  id: string;
  name: string;
  title: string;
  version: string;
}
export interface Resource {
  id: string;
  name: string;
}

export interface RenderTree {
  id: string;
  name: string;
  children?: RenderTree[];
  level: ItemLevel;
  path: string;
}

export enum ItemLevel {
  provider = 0,
  service = 1,
  resource = 2,
}
