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
  children?: readonly RenderTree[];
  level: 0 | 1 | 2;
}
