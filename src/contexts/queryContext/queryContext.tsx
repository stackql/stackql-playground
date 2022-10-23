import React, { useState } from "react";
import fetchData from "../../fetch";
import { QueryMetadata } from "../../types";

interface IQueryContextProps {
  query: string;
  queryRunning: boolean;
  queryResults?: { data: any; returnText: boolean; metadata: QueryMetadata };
  setQuery: (query: any) => void;
  setQueryRunning: (loading: boolean) => void;
  setQueryResults: (results: any) => void;
}

export interface IQueryResult {
  data: any;
  returnText: boolean;
}
const defaultQuery = `SELECT *
FROM github.repos.contributors
where repo = 'stackql-playground' AND owner = 'stackql';SELECT name, email, id, type, url

`;
export const QueryContext = React.createContext<IQueryContextProps>({
  query: "",
  queryRunning: false,
  setQuery: () => {},
  setQueryRunning: () => {},
  setQueryResults: () => {},
});

export const QueryContextProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [query, setEditorQuery] = useState<string>(defaultQuery);
  const [queryRunning, setQueryRunning] = useState<boolean>(false);
  const [queryResults, setQueryResults] = useState<any>(undefined);

  return (
    <QueryContext.Provider
      value={{
        query,
        queryRunning,
        setQuery: (query: string) => {
          setEditorQuery(query);
        },
        setQueryRunning,
        queryResults,
        setQueryResults,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
};
