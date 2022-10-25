import { useQueryContext } from "../../../contexts/queryContext/useQueryContext";
import { CopyButton } from "../../copy-button/CopyButton";

export const CopyQueryButton = () => {
  const { query } = useQueryContext();
  return <CopyButton copyText={query} />;
};
