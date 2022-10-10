import React, { useState } from "react";
import fetchData from "../../fetch";

interface IQueryContextProps {
  query: string;
  queryRunning: boolean;
  queryResults?: any;
  setQuery: (query: any) => void;
  setQueryRunning: (loading: boolean) => void;
  setQueryResults: (results: any) => void;
}

const defaultQuery = `SELECT name, email, id, type, url
FROM github.repos.contributors
where repo = 'stackql-playground' AND owner = 'stackql';`;
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
