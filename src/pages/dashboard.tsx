import Explorer from "../components/dashboard/explorer";
import QueryPanel from "../components/dashboard/query";
import ResultsPanel from "../components/dashboard/results";
import Layout from "../components/layout";
import { ReactElement, useEffect, useState } from "react";
import { RenderTree } from "../types";

const Dashboard = () => {
  const [itemTrees, setItemTrees] = useState<RenderTree[] | null>(null);
  const [isLoading, setLoading] = useState(false);
  const fetchExplorer = async () => {
    // get the data from the api
    const response = await fetch("/api/explorer");
    // convert data to json
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    setLoading(true);

    fetchExplorer()
      .then((data) => {
        setItemTrees(data as RenderTree[]);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex w-screen max-h-full h-full overflow-x-hidden">
      <Explorer itemTrees={itemTrees} loading={isLoading} />
      <div
        aria-label="query and result container"
        className="flex flex-col w-full justify-between h-full"
      >
        <QueryPanel />
        <ResultsPanel />
      </div>
    </div>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
