import Explorer from "../components/explorer";
import dynamic from "next/dynamic";
import QueryPanel from "../components/query";
import ResultsPanel from "../components/results";

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

export default Dashboard;
