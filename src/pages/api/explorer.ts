import { NextApiRequest, NextApiResponse } from "next";
import { Provider, RenderTree, Resource, Service } from "../../types";
import { getDataFromResponse, middlewareUrl } from "./_common";

const providersUrl = (url: string) => `${url}/providers`;
const getServiceUrl = (url: string, provider: string) =>
  `${url}/providers/${provider}/services`;
const getResourceUrl = (url: string, provider: string, service: string) =>
  `${url}/providers/${provider}/services/${service}/resources`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = middlewareUrl;

  const providers = (await getDataFromResponse<Provider[]>(
    providersUrl(url)
  )) as Provider[];
  console.log("providers are %o", providers);
  // console.log("providers are %o", providers);
  // const entityTreePromises = providers.map(
  //   async (provider: { name: string }, index: { toString: () => any }) => {
  //     const servicesUrl = getServiceUrl(url, provider.name);
  //     const services = (await getDataFromResponse<Service[]>(
  //       servicesUrl
  //     )) as Service[];

  //     const serviceWithResource: any[] = [];
  //     for (const service of services) {
  //       const resourceUrl = getResourceUrl(url, provider.name, service.name);
  //       const resources = (await getDataFromResponse<Resource[]>(
  //         resourceUrl
  //       )) as Resource[];
  //       serviceWithResource.push({
  //         ...service,
  //         level: 1,
  //         children: resources.map((resource: { name: any }) => ({
  //           ...resource,
  //           level: 2,
  //           path: `${provider.name}.${service.name}.${resource.name}`,
  //         })),
  //       });
  //     }
  //     const providerWithService = {
  //       ...provider,
  //       level: 0,
  //       children: serviceWithResource,
  //       id: index.toString(),
  //     };
  //     return providerWithService;
  //   }
  // );

  // const entityTree = (await Promise.all(entityTreePromises)) as RenderTree[];
  res.status(200).json(providers);
}
