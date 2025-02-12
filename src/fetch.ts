const fetchData = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  if (response.ok) return data;
  else throw data;
};

export const fetchExplorer = async ({ path, serverUrl }: { path?: string; serverUrl?: string }) => {
  let url = "/api/explorer";
  const params: string[] = [];
  if (serverUrl) {
    params.push(`serverUrl=${serverUrl}`);
  }
  if (path) {
    params.push(`path=${path}`);
  }
  if (params.length) {
    url = `${url}?${params.join("&")}`;
  }
  return fetchData(url);
};

export const fetchQuery = async ({ query, dts, serverUrl }: { query: string; dts?: boolean; serverUrl?: string }) => {
  let url = "/api/stackql";
  const params: string[] = [];

  if (dts) {
    params.push("dts=true");
  }
  if (serverUrl) {
    params.push(`serverUrl=${serverUrl}`);
  }
  if (params.length) {
    url = `${url}?${params.join("&")}`;
  }
  const request = new Request(url, {
    body: JSON.stringify({ query }),
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });
  return fetch(request);
};

// New function for DuckDB queries
export const fetchDuckDBQuery = async () => {
  const url = "/api/duckdb"; // Change this if the actual endpoint is different

  const query = `SELECT country_region AS country, 
                        CAST(SUM(confirmed) AS INTEGER) AS total_confirmed, 
                        CAST(SUM(deaths) AS INTEGER) AS total_deaths, 
                        COUNT(*) AS record_count 
                 FROM read_csv_auto('s3://covid19-lake/archived/enigma-jhu/csv/Enigma-JHU.csv.gz') 
                 GROUP BY country_region 
                 ORDER BY total_confirmed DESC 
                 LIMIT 5`;

  const request = new Request(url, {
    body: JSON.stringify({ query, showMetadata: true }),
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });

  return fetch(request);
};

export default fetchData;
