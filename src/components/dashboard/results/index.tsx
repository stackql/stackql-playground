import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useQueryContext } from "../../../contexts/queryContext/useQueryContext";

// const columns: GridColDef[] = [
//   { field: "id", headerName: "ID", width: 70 },
//   { field: "vpcId", headerName: "VPC ID", width: 130 },
//   { field: "groupId", headerName: "Group ID", width: 130 },
//   { field: "groupName", headerName: "Group Name", width: 130 },
//   { field: "groupDescription", headerName: "Group Description", width: 130 },
// ];

// const rows = [
//   {
//     id: 1,
//     vpcId: "vpc-01234567890abcdef",
//     groupId: "sg-ac9469b8",
//     groupName: "vpc-sg",
//     groupDescription: "VPC security group",
//   },
//   {
//     id: 2,
//     vpcId: "vpc-02234567890abcdef",
//     groupId: "sg-dc9569b8",
//     groupName: "db-sg",
//     groupDescription: "RDS security group",
//   },
//   {
//     id: 3,
//     vpcId: "vpc-03234567890abcdef",
//     groupId: "sg-bc6469b8",
//     groupName: "api-server-sg",
//     groupDescription: "api server security group",
//   },
//   {
//     id: 4,
//     vpcId: "vpc-04234567890abcdef",
//     groupId: "sg-cc9469b8",
//     groupName: "load-balancer-sg",
//     groupDescription: "test group",
//   },
// ];

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

const RenderResults = (results: any[]) => {
  const columns = generateColDef(results[0]);
  console.log("results are %o", results);
  return (
    <DataGrid
      rows={results}
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

export default function ResultsPanel() {
  const { queryResults } = useQueryContext();
  return (
    <div className="w-full flex min-h-max h-1/2 flex-col">
      <h2 className="panel-title pl-2 bg-gray-100 border-bottom">Results</h2>
      <div className="  w-full h-[90%] rounded-sm flex bg-white p-4 shadow-sm overflow-x-scroll">
        {queryResults && (
          <DataGrid
            rows={queryResults}
            columns={generateColDef(queryResults[0])}
            headerHeight={37}
            rowHeight={37}
            pageSize={5}
            rowsPerPageOptions={[5]}
            sx={{
              fontSize: "14px",
            }}
          />
        )}
      </div>
    </div>
  );
}
