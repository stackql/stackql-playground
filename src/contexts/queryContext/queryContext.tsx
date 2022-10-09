import React, { useState } from "react";
import fetchData from "../../fetch";

interface IQueryContextProps {
  query: string;
  queryRunning: boolean;
  setQuery: (user: any) => void;
  setQueryRunning: (loading: boolean) => void;
}

const defaultQuery = "-- SELECT * FROM aws.ec2.security_group";
export const QueryContext = React.createContext<IQueryContextProps>({
  query: "",
  queryRunning: false,
  setQuery: () => {},
  setQueryRunning: () => {},
});

export const QueryContextProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [query, setEditorQuery] = useState<string>(defaultQuery);
  const [queryRunning, setQueryRunning] = useState<boolean>(true);
  const fetchResultsFromQuery = async () => {};
  return (
    <QueryContext.Provider
      value={{
        query,
        queryRunning,
        setQuery: (query: string) => {
          setEditorQuery(query);
        },
        setQueryRunning,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
};
