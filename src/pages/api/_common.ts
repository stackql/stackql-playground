import getConfig from "next/config";
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export const middlewareUrl = `${serverRuntimeConfig.middlewareScheme}://${serverRuntimeConfig.middlewareHost}:${serverRuntimeConfig.middlewarePort}`;
export const getDataFromResponse = async <T>(
  fetchUrl: string,
  body?: any,
  method = "GET",
  returnText = false
) => {
  const request = new Request(fetchUrl, { method, body });
  const response = await fetch(request);
  if (response.ok) {
    let resData;
    if (returnText) {
      resData = await response.text();
    } else {
      resData = (await response.json()).data as T;
    }
    return resData;
  }
  throw response.statusText;
};
