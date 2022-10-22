const fetchData = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
export const fetchExplorer = async (path?: string) => {
  let url = "/api/explorer";
  if (path) {
    url = url + `?path=${path}`;
  }
  // get the data from the api
  return fetchData(url);
};

export default fetchData;
