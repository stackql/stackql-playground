import React, { useState } from "react";
import { QueryMetadata } from "../../types";

interface IQueryContextProps {
  query: string;
  queryRunning: boolean;
  queryResults?: { data: any; returnText: boolean; metadata: QueryMetadata };
  serverUrl?: string;
  setQuery: (query: any) => void;
  setQueryRunning: (loading: boolean) => void;
  setQueryResults: (results: any) => void;
  setServerUrl: (url: string) => void;
}

export interface IQueryResult {
  data: any;
  returnText: boolean;
}
const defaultQuery = `SELECT *
FROM github.repos.contributors
where repo = 'stackql-playground' AND owner = 'stackql';
`;
export const QueryContext = React.createContext<IQueryContextProps>({
  query: "",
  queryRunning: false,
  setQuery: () => {},
  setQueryRunning: () => {},
  setQueryResults: () => {},
  setServerUrl: () => {},
});

export const QueryContextProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [query, setEditorQuery] = useState<string>(defaultQuery);
  const [queryRunning, setQueryRunning] = useState<boolean>(false);
  const [queryResults, setQueryResults] = useState<any>(undefined);
  const [serverUrl, setServerUrl] = useState<string | undefined>(undefined);

  return (
    <QueryContext.Provider
      value={{
        query,
        queryRunning,
        setQuery: (query: string) => {
          setEditorQuery(query);
        },
        serverUrl,
        setQueryRunning,
        queryResults,
        setQueryResults,
        setServerUrl,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
};
