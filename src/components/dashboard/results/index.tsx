import * as React from "react";
import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";

import { useQueryContext } from "../../../contexts/queryContext/useQueryContext";
import Editor from "../../editor";
import { IQueryResult } from "../../../contexts/queryContext/queryContext";

const generateColDef = (row: Object) => {
  // { field: "id", headerName: "ID", width: 70 },
  const colDef: GridColDef[] = [];
  Object.keys(row).forEach((column) => {
    colDef.push({
      field: column,
      headerName: column,
      width: 200,
    });
  });
  return colDef;
};

const RenderGrid = (results: any[]) => {
  const columns = generateColDef(results[0]);
  let rows = results;
  if (!Object.keys(rows[0]).includes("id")) {
    rows = rows.map((row, index) => ({
      ...row,
      id: index,
    }));
  }
  return (
    <DataGridPro
      rows={rows}
      columns={columns}
      headerHeight={37}
      rowHeight={37}
      pageSize={5}
      rowsPerPageOptions={[5]}
      sx={{
        fontSize: "14px",
      }}
    />
  );
};

const RenderText = (result: string) => {
  return <Editor text={result} language={"js"} />;
};

const RenderQueryResult = (queryResult: IQueryResult) => {
  if (queryResult.returnText) {
    return RenderText(queryResult.data);
  }
  return RenderGrid(queryResult.data);
};

export default function ResultsPanel() {
  const { queryResults } = useQueryContext();
  return (
    <div className="flex min-h-max h-full flex-col">
      <h2 className="panel-title pl-2 bg-gray-100 border-bottom">Results</h2>
      <div className="  w-full h-[90%] rounded-sm flex bg-gray-50 p-4 shadow-sm overflow-x-scroll">
        {queryResults && RenderQueryResult(queryResults)}
      </div>
    </div>
  );
}
