import dynamic from "next/dynamic";
import { useRef } from "react";
import { useQueryContext } from "../../../contexts/queryContext/useQueryContext";

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);
const QueryEditor = () => {
  const { query, setQuery } = useQueryContext();

  return (
    <div>
      <CodeEditor
        value={query}
        language="sql"
        onChange={(evn) => setQuery(evn.target.value)}
        padding={15}
        style={{
          fontWeight: 700,
          fontSize: 14,
          backgroundColor: "rgb(249 250 251 / var(--tw-bg-opacity))",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        }}
      />
    </div>
  );
};

export default QueryEditor;
