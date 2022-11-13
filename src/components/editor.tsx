import dynamic from "next/dynamic";
import { ChangeEvent } from "react";
import { useQueryContext } from "../contexts/queryContext/useQueryContext";

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);
const Editor = ({
  text,
  language,
  onChange,
}: {
  text: string;
  language: string;
  onChange?: (env: ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <CodeEditor
      value={text}
      language={language}
      onChange={onChange}
      padding={15}
      className="w-full overflow-hidden h-full max-h-full"
      style={{
        fontWeight: 700,
        fontSize: 14,
        backgroundColor: "rgb(249 250 251 / var(--tw-bg-opacity))",
        fontFamily:
          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        overflow: "auto",
      }}
    />
  );
};

export default Editor;
