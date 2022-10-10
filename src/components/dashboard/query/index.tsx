import dynamic from "next/dynamic";
import "@uiw/react-textarea-code-editor/dist.css";
import { Toolbar } from "@mui/material";
import { useRef, useState } from "react";
import QueryEditor from "./query-editor";

const QueryPanel = () => {
  return (
    <div className="w-full flex-col h-1/2 border-bottom" key={Math.random()}>
      <Toolbar
        variant="dense"
        className="bg-gray-100 text-black min-h-min border-bottom"
      >
        <h2 className="panel-title">Query</h2>
      </Toolbar>
      <QueryEditor />
    </div>
  );
};
export default QueryPanel;
