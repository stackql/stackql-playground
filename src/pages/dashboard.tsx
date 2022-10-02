import Explorer from "../components/dashboard/explorer";
import QueryPanel from "../components/dashboard/query";
import ResultsPanel from "../components/dashboard/results";
import Layout from "../components/layout";
import { ReactElement } from "react";

const Dashboard = () => {
  return (
    <div className="flex w-screen h-screen">
      <Explorer />
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
