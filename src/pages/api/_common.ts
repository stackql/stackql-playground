import getConfig from "next/config";
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export const getMiddlewareUrl = ({
  scheme,
  host,
  port,
}: {
  scheme: string;
  host: string;
  port: string;
}) => {
  return `${scheme}://${host}:${port}`;
};

export const defaultMiddlewareUrl = getMiddlewareUrl({
  scheme: publicRuntimeConfig.middlewareScheme as string,
  host: publicRuntimeConfig.middlewareHost as string,
  port: publicRuntimeConfig.middlewarePort as string,
});

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

export const validateAddress = (string: string) => {
  try {
    new URL(string);
  } catch (_) {
    return false;
    // make outline for textfield red and change the label to Invalid Address
  }
  return true;
};
