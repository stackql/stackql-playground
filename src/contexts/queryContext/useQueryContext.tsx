import { useContext } from "react";

import { QueryContext } from "./queryContext";

export const useQueryContext = () => useContext(QueryContext);
