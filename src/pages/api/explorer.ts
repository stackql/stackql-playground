import { NextApiRequest, NextApiResponse } from "next";
import { Provider, Resource, Service } from "../../types";
const localMiddlewareUrl = "http://localhost:8080";

const providersUrl = (url: string) => `${url}/providers`;
const getServiceUrl = (url: string, provider: string) =>
  `${url}/providers/${provider}/services`;
const getResourceUrl = (url: string, provider: string, service: string) =>
  `${url}/providers/${provider}/services/${service}/resources`;

const getDataFromResponse = async <T>(fetchUrl: string) => {
  const response = await fetch(fetchUrl);
  const resData = (await response.json()) as { data: T[] };
  return resData.data;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = localMiddlewareUrl;
  const providers = await getDataFromResponse<Provider>(providersUrl(url));

  const entityTreePromises = providers.map(async (provider, index) => {
    const servicesUrl = getServiceUrl(url, provider.name);
    const services = await getDataFromResponse<Service>(servicesUrl);

    const serviceWithResource: any[] = [];
    for (const service of services) {
      const resourceUrl = getResourceUrl(url, provider.name, service.name);
      const resources = await getDataFromResponse<Resource>(resourceUrl);
      serviceWithResource.push({
        ...service,
        level: 1,
        children: resources.map((resource) => ({ ...resource, level: 2 })),
      });
    }
    const providerWithService = {
      ...provider,
      level: 0,
      children: serviceWithResource,
      id: index.toString(),
    };
    return providerWithService;
  });

  const entityTree = await Promise.all(entityTreePromises);
  res.status(200).json(entityTree);
}
