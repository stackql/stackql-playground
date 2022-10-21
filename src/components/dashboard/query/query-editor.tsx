import { ChangeEvent } from "react";
import { useQueryContext } from "../../../contexts/queryContext/useQueryContext";
import Editor from "../../editor";

const QueryEditor = () => {
  const { query, setQuery } = useQueryContext();
  const onChange = (env: ChangeEvent<HTMLTextAreaElement>) =>
    setQuery(env.target.value);
  return <Editor text={query} language="sql" onChange={onChange} />;
};

export default QueryEditor;
