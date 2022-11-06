import Explorer from "../components/dashboard/explorer";
import QueryPanel from "../components/dashboard/query";
import ResultsPanel from "../components/dashboard/results";
import Layout from "../components/layout";
import { ReactElement, useEffect } from "react";
import { Resizable } from "re-resizable";
import { useWindowSize } from "../contexts/useWindowSize";

const Dashboard = () => {
  const windowSize = useWindowSize();
  const leftPaneSize = () => {
    if (windowSize.isMobile) {
      return {
        width: "100%",
        height: "20%",
      };
    }
    return {
      width: "15%",
      height: "100%",
    };
  };
  const leftPaneExpandEnable = () => {
    const enable = {
      top: false,
      right: true,
      bottom: false,
      left: false,
      topRight: false,
      bottomRight: false,
      bottomLeft: false,
      topLeft: false,
    };
    if (windowSize.isMobile) {
      return { ...enable, bottom: true, right: false };
    }
    return enable;
  };
  return (
    <div
      className="flex w-screen max-h-full h-full overflow-hidden  mobile:flex-col"
      key={Math.random()}
    >
      <Resizable
        defaultSize={leftPaneSize()}
        maxWidth={windowSize.isMobile ? "100%" : "50%"}
        minWidth="1"
        minHeight={"4.5%"}
        maxHeight={windowSize.isMobile ? "50%" : "100%"}
        enable={leftPaneExpandEnable()}
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
        <div className="min-h-[10%] h-full">
          <ResultsPanel />
        </div>
      </div>
    </div>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
