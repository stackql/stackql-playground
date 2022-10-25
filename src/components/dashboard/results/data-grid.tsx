import { GridColDef } from "@mui/x-data-grid";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { useState } from "react";
import { SimpleDialog } from "./cell-dialog";

const generateColDef = (row: Object) => {
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

const isJson = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

const jsonFormat = (string: string) => {
  return JSON.stringify(JSON.parse(string), null, 2);
};

export const ResultGrid = ({ results }: { results: any[] }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogText, setDialogText] = useState("");
  const columns = generateColDef(results[0]);
  let rows = results;
  if (!Object.keys(rows[0]).includes("id")) {
    rows = rows.map((row, index) => ({
      ...row,
      id: index,
    }));
  }
  return (
    <>
      <DataGridPro
        rows={rows}
        columns={columns}
        headerHeight={37}
        rowHeight={37}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onCellClick={(params) => {
          const cellValue = params.row[params.field];
          if (!isJson(cellValue)) return;

          setDialogText(jsonFormat(cellValue));
          setDialogOpen(true);
        }}
        sx={{
          fontSize: "14px",
        }}
      />
      <SimpleDialog
        open={dialogOpen}
        title="Details"
        value={dialogText}
        handleClose={() => {
          setDialogOpen(false);
        }}
      />
    </>
  );
};
