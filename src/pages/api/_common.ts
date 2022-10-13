const middlewareScheme = process.env.MIDDLEWARE_SCHEME || 'http';
const middlewareHost = process.env.MIDDLEWARE_HOST || 'localhost';
const middlewarePort = process.env.MIDDLEWARE_PORT || 8080;
export const middlewareUrl = `${middlewareScheme}://${middlewareHost}:${middlewarePort.toString()}`;
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