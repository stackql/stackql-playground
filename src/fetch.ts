//TODO: turn this to custom hook so can access context
const fetchData = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  if (response.ok) return data;
  else throw data;
};

export const fetchExplorer = async (path?: string, serverUrl?: string) => {
  let url = "/api/explorer";
  if (path) {
    url = url + `?path=${path}`;
  }
  // get the data from the api
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
