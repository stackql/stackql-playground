import getConfig from 'next/config'
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

export const middlewareUrl = `${publicRuntimeConfig.middlewareScheme}://${publicRuntimeConfig.middlewareHost}:${publicRuntimeConfig.middlewarePort}`;
export const getDataFromResponse = async <T>(
  fetchUrl: string,
  body?: any,
  method = "GET"
) => {
  const request = new Request(fetchUrl, { method, body });
  const response = await fetch(request);
  if (response.ok) {
    const resData = (await response.json()) as { data: T };
    return resData.data;
  }
  throw response.statusText;
};