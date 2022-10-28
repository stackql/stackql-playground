//TODO: turn this to custom hook so can access context
const fetchData = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  if (response.ok) return data;
  else throw data;
};

export const fetchExplorer = async ({
  path,
  serverUrl,
}: {
  path?: string;
  serverUrl?: string;
}) => {
  let url = "/api/explorer";
  const params: string[] = [];
  if (serverUrl) {
    params.push(`serverUrl=${serverUrl}`);
  }
  if (path) {
    params.push(`path=${path}`);
  }
  // get the data from the api
  if (params.length) {
    url = `${url}?${params.join("&")}`;
  }
  return fetchData(url);
};

export const fetchQuery = async ({
  query,
  dts,
  serverUrl,
}: {
  query: string;
  dts?: boolean;
  serverUrl?: string;
}) => {
  let url = "/api/stackql";
  const params: string[] = [];

  if (dts) {
    params.push("dts=true");
  }
  if (serverUrl) {
    params.push(`serverUrl=${serverUrl}`);
  }
  if (params) {
    url = `${url}?${params.join("&")}`;
  }
  const request = new Request(url, {
    body: query,
    method: "POST",
  });
  return fetch(request);
};

export default fetchData;
