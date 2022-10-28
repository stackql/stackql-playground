import { NextApiRequest, NextApiResponse } from "next";
import {
  ItemLevel,
  Provider,
  RenderTree,
  Resource,
  Service,
  SubResourceItemKey,
} from "../../types";
import {
  getDataFromResponse,
  defaultMiddlewareUrl,
  validateAddress,
} from "./_common";

let getUrl = () => {
  return defaultMiddlewareUrl;
};

const readItemPath = (path?: string) => {
  if (!path) return {};
  const [provider, service, resource] = path.split(".");
  return {
    provider,
    service,
    resource,
  };
};

const createSubResourceNode = async ({
  provider,
  service,
  resource,
  itemKey,
}: {
  provider: string;
  service: string;
  resource: string;
  itemKey: SubResourceItemKey;
}): Promise<RenderTree> => {
  return {
    id: provider + service + resource + itemKey,
    path: `${provider}.${service}.${resource}.${itemKey}`,
    name: itemKey,
    level: ItemLevel.subResourceKey,
    children: await getSubResourceItem({
      providerName: provider,
      serviceName: service,
      resourceName: resource,
      itemKey,
    }),
  };
};

const getProviders = async () => {
  const providersUrl = (url: string) => `${url}/providers`;
  const response = await getDataFromResponse(providersUrl(getUrl()));
  const providers = response.data as Provider[];
  return providers.map((provider, index) => ({
    ...provider,
    level: ItemLevel.provider,
    id: index.toString(),
    path: provider.name,
  }));
};

const getServices = async (providerName: string) => {
  const getServiceUrl = (url: string, provider: string) =>
    `${url}/providers/${provider}/services`;
  const servicesUrl = getServiceUrl(getUrl(), providerName);
  const services = (await getDataFromResponse(servicesUrl)).data as Service[];
  return services.map((service, index) => ({
    ...service,
    id: providerName + index.toString(),
    path: `${providerName}.${service.name}`,
    level: ItemLevel.service,
  }));
};

const getResource = async (providerName: string, serviceName: string) => {
  const getResourceUrl = (url: string, provider: string, service: string) =>
    `${url}/providers/${provider}/services/${service}/resources`;
  const resourceUrl = getResourceUrl(getUrl(), providerName, serviceName);
  const resources = (await getDataFromResponse(resourceUrl)).data as Resource[];
  return resources.map((resource, index) => ({
    ...resource,
    id: providerName + serviceName + index.toString(),
    path: `${providerName}.${serviceName}.${resource.name}`,
    level: ItemLevel.resource,
  }));
};
const getSubResourceItem = async ({
  providerName,
  serviceName,
  resourceName,
  itemKey,
}: {
  providerName: string;
  serviceName: string;
  resourceName: string;
  itemKey: SubResourceItemKey;
}) => {
  const getFieldsUrl = (
    url: string,
    provider: string,
    service: string,
    resourceName: string
  ) =>
    `${url}/providers/${provider}/services/${service}/resources/${resourceName}`;
  const getMethodsUrl = (fieldsUrl: string) => fieldsUrl + "/methods";

  let itemUrl = getFieldsUrl(getUrl(), providerName, serviceName, resourceName);
  let nameMapper = (item: any) => item.name;

  if (itemKey === "methods") {
    itemUrl = getMethodsUrl(itemUrl);
    nameMapper = (item: any) => item.MethodName;
  }

  const items = (await getDataFromResponse(itemUrl)).data as RenderTree[];
  return items.map((item: RenderTree, index: number) => {
    return {
      ...item,
      id:
        providerName + serviceName + resourceName + itemKey + index.toString(),
      path: `${providerName}.${serviceName}.${resourceName}.${itemKey}.${item.name}`,
      level: ItemLevel.subResourceItem,
      name: nameMapper(item),
    };
  });
};

const getResData = async (path: string | undefined, serverUrl?: string) => {
  const { provider, service, resource } = readItemPath(path);
  if (serverUrl) {
    getUrl = () => {
      if (validateAddress(serverUrl)) {
        return serverUrl;
      }
      return defaultMiddlewareUrl;
    };
  }
  if (provider && !service) {
    return getServices(provider);
  }
  if (provider && service && !resource) {
    return getResource(provider, service);
  }
  if (provider && service && resource) {
    const fieldTree: RenderTree = await createSubResourceNode({
      provider,
      service,
      resource,
      itemKey: "fields",
    });
    const methodTree: RenderTree = await createSubResourceNode({
      provider,
      service,
      resource,
      itemKey: "methods",
    });
    return [fieldTree, methodTree];
  }
  return getProviders();
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const queryParams = req.query;
  try {
    const resData = await getResData(
      queryParams.path as string,
      queryParams.serverUrl as string
    );
    const entityTree = resData as RenderTree[];
    res.status(200).json(entityTree);
  } catch (error) {
    res.status(500).json(error);
  }
}
