import { NextApiRequest, NextApiResponse } from "next";
import {
  ItemLevel,
  Provider,
  RenderTree,
  Resource,
  Service,
} from "../../types";
import { getDataFromResponse, middlewareUrl } from "./_common";

const getUrl = () => {
  return middlewareUrl;
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

const getProviders = async () => {
  const providersUrl = (url: string) => `${url}/providers`;

  const providers = (await getDataFromResponse<Provider[]>(
    providersUrl(getUrl())
  )) as Provider[];
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
  const services = (await getDataFromResponse<Service[]>(
    servicesUrl
  )) as Service[];
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
  const resources = (await getDataFromResponse<Resource[]>(
    resourceUrl
  )) as Resource[];
  return resources.map((resource, index) => ({
    ...resource,
    id: providerName + serviceName + index.toString(),
    path: `${providerName}.${serviceName}.${resource.name}`,
    level: ItemLevel.resource,
  }));
};

const getResData = async (path: string | undefined) => {
  const { provider, service } = readItemPath(path);
  if (provider && !service) {
    return await getServices(provider);
  }
  if (provider && service) {
    return await getResource(provider, service);
  }
  return await getProviders();
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const queryParams = req.query;

  const resData = await getResData(queryParams.path as string | undefined);
  console.log("resData is %o", resData);
  const entityTree = resData as RenderTree[];
  res.status(200).json(entityTree);
}
