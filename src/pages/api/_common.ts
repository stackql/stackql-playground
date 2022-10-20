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
  let resData;

  if (returnText) {
    resData = await response.text();
  } else {
    resData = await response.json();
  }
  if (response.ok) {
    return resData.data as T;
  }
  throw resData;
};
