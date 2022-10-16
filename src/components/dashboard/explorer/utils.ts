import { ItemLevel, RenderTree } from "../../../types";

export const populateItemTree = (
  root: RenderTree,
  updateNode: RenderTree,
  newChildren: RenderTree[]
): RenderTree => {
  const rootClone = Object.assign({}, root);
  if (rootClone.path === updateNode.path) {
    return {
      ...rootClone,
      children: newChildren,
    };
  }
  if (
    updateNode.path.startsWith(rootClone.path) &&
    updateNode.level === ItemLevel.service
  ) {
    rootClone.children?.map((service) => {
      if (service.path === updateNode.path) {
        service.children = newChildren;
      }
      return service;
    });
  }
  return rootClone;
};
