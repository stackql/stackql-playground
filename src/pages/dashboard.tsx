import Explorer from "../components/dashboard/explorer";
import QueryPanel from "../components/dashboard/query";
import ResultsPanel from "../components/dashboard/results";
import Layout from "../components/layout";
import { ReactElement, useEffect, useState } from "react";
import { RenderTree } from "../types";
import fetchData, { fetchExplorer } from "../fetch";
import { Resizable } from "re-resizable";

const Dashboard = () => {
  return (
    <div
      className="flex w-screen max-h-full h-full overflow-x-hidden"
      key={Math.random()}
    >
      <Resizable
        defaultSize={{
          width: "12%",
          height: "100%",
        }}
        maxWidth="100%"
        minWidth="1"
        enable={{
          top: false,
          right: true,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
      >
        <Explorer />
      </Resizable>
      <div
        aria-label="query and result container"
        className="flex flex-col w-full  h-full"
        key={Math.random()}
      >
        <Resizable
          defaultSize={{
            width: "100%",
            height: "50%",
          }}
          minHeight={"10%"}
          enable={{
            top: false,
            right: false,
            bottom: true,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
        >
          <QueryPanel />
        </Resizable>
        <ResultsPanel />
      </div>
    </div>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
