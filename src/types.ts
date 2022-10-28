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
  children?: RenderTree[];
}

export interface FieldItem extends RenderTree {
  type: string;
  description: string;
}
export interface ResourceMethod extends RenderTree {
  MethodName: string;
  RequiredParams: string;
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
  subResourceKey = 3,
  subResourceItem = 4,
}

export interface QueryMetadata {
  operation: {
    startTime: string;
    status: string;
    endTime: string;
    duration: string;
  };
  result: {
    rowCount: number;
  };
  request: {
    query: string;
  };
}
export type SubResourceItemKey = "methods" | "fields";

export const primaryColorHex = "#0F4C81";
