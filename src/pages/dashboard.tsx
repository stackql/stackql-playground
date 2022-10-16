import Explorer from "../components/dashboard/explorer";
import QueryPanel from "../components/dashboard/query";
import ResultsPanel from "../components/dashboard/results";
import Layout from "../components/layout";
import { ReactElement, useEffect, useState } from "react";
import { RenderTree } from "../types";
import fetchData, { fetchExplorer } from "../fetch";

const Dashboard = () => {
  return (
    <div
      className="flex w-screen max-h-full h-full overflow-x-hidden"
      key={Math.random()}
    >
      <Explorer />
      <div
        aria-label="query and result container"
        className="flex flex-col w-full justify-between h-full"
        key={Math.random()}
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
