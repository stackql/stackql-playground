import dynamic from "next/dynamic";
import "@uiw/react-textarea-code-editor/dist.css";
import { Toolbar } from "@mui/material";
import { useRef, useState } from "react";
import QueryEditor from "./query-editor";
import { CopyButton } from "../../copy-button/CopyButton";
import { CopyQueryButton } from "./copy-query";

const QueryPanel = () => {
  return (
    <div
      className="w-full h-full flex flex-col border-bottom"
      key={Math.random()}
    >
      <h2 className="panel-title pl-2 bg-gray-100 border-bottom">Query</h2>
      <div className="h-[90%] relative">
        <CopyQueryButton />
        <QueryEditor />
      </div>
    </div>
  );
};
export default QueryPanel;
