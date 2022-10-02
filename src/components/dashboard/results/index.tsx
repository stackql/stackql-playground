import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "vpcId", headerName: "VPC ID", width: 130 },
  { field: "groupId", headerName: "Group ID", width: 130 },
  { field: "groupName", headerName: "Group Name", width: 130 },
  { field: "groupDescription", headerName: "Group Description", width: 130 },
];

const rows = [
  {
    id: 1,
    vpcId: "vpc-01234567890abcdef",
    groupId: "sg-ac9469b8",
    groupName: "vpc-sg",
    groupDescription: "VPC security group",
  },
  {
    id: 2,
    vpcId: "vpc-02234567890abcdef",
    groupId: "sg-dc9569b8",
    groupName: "db-sg",
    groupDescription: "RDS security group",
  },
  {
    id: 3,
    vpcId: "vpc-03234567890abcdef",
    groupId: "sg-bc6469b8",
    groupName: "api-server-sg",
    groupDescription: "api server security group",
  },
  {
    id: 4,
    vpcId: "vpc-04234567890abcdef",
    groupId: "sg-cc9469b8",
    groupName: "load-balancer-sg",
    groupDescription: "test group",
  },
];

export default function ResultsPanel() {
  return (
    <div className="w-full flex min-h-max h-1/2 flex-col">
      <h2 className="panel-title pl-2 bg-gray-100">Results</h2>
      <div className="w-full min-h-[300px] h-full pt-1 pl-1">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          className="pl-1"
          sx={{
            fontSize: "12px",
          }}
        />
      </div>
    </div>
  );
}
