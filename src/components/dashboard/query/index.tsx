import dynamic from "next/dynamic";
import "@uiw/react-textarea-code-editor/dist.css";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";

const QueryPanel = () => {
  const CodeEditor = dynamic(
    () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
    { ssr: false }
  );
  return (
    <div className="w-full flex-col h-1/2 border-bottom">
      <Toolbar variant="dense" className="bg-gray-100 text-black min-h-min">
        <h2 className="panel-title">Query</h2>
      </Toolbar>
      <CodeEditor
        language="plsql"
        placeholder="Enter Query"
        value={`SELECT * FROM "AWS.ec2";`}
        minHeight={300}
        style={{
          fontSize: 12,
          backgroundColor: "rgb(249 250 251 / var(--tw-bg-opacity))",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        }}
      />
    </div>
  );
};
export default QueryPanel;
