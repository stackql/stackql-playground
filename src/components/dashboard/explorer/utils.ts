import { ItemLevel, RenderTree } from "../../../types";

const getUpdateIndexes = (roots: RenderTree[], node: RenderTree) => {
  const updatePath = node.path;
  const updateIndexes: {
    provider?: number;
    service?: number;
  } = { provider: undefined, service: undefined };
  const providerNodeIndex = roots?.findIndex((root) =>
    updatePath.startsWith(root.name)
  );
  if (providerNodeIndex) {
    updateIndexes.provider = providerNodeIndex;
  }
  if (node.level === ItemLevel.service) {
    const serviceIndex = roots?.[providerNodeIndex!].children?.findIndex(
      (service) => updatePath === service.path
    );
    updateIndexes.service = serviceIndex;
  }
  return updateIndexes;
};

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
        console.log("updating service %o", service);
        service.children = newChildren;
      }
      return service;
    });
  }
  return rootClone;
};
