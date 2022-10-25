import { ChangeEvent, useEffect, useState } from "react";
import { useQueryContext } from "../../../contexts/queryContext/useQueryContext";
import Editor from "../../editor";
const defaultQuery = `SELECT *
FROM github.repos.contributors
where repo = 'stackql-playground' AND owner = 'stackql';
`;
const QueryEditor = () => {
  const { setQuery } = useQueryContext();

  const onChange = (env: ChangeEvent<HTMLTextAreaElement>) =>
    setQuery(env.target.value);
  return <Editor text={defaultQuery} language="sql" onChange={onChange} />;
};

export default QueryEditor;
