import getConfig from "next/config";
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export const middlewareUrl = `${publicRuntimeConfig.middlewareScheme}://${publicRuntimeConfig.middlewareHost}:${publicRuntimeConfig.middlewarePort}`;
export const getDataFromResponse = async <T>(
  fetchUrl: string,
  body?: any,
  method = "GET",
  returnText = false
) => {
  const request = new Request(fetchUrl, { method, body });
  const response = await fetch(request);
  if (!returnText && response.ok) {
    return response.json();
  }
  if (returnText && response.ok) {
    return response.text();
  }
  throw await response.json();
};
