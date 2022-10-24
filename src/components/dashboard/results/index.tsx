import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";

import { useQueryContext } from "../../../contexts/queryContext/useQueryContext";
import Editor from "../../editor";
import { IQueryResult } from "../../../contexts/queryContext/queryContext";
import { Tab, Tabs } from "@mui/material";
import { QueryMetadata } from "../../../types";
import { CopyButton } from "../../copy-button/CopyButton";
import SaveButton from "../../splitbutton/SaveButton";
import SimCardDownloadOutlinedIcon from "@mui/icons-material/SimCardDownloadOutlined";
import json2csv from "json2csv";
import React from "react";
import { CSVLink } from "react-csv";

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

const RenderText = (result: string, language = "js") => {
  return (
    <>
      <CopyButton copyText={result} />
      <Editor text={result} language={language} />{" "}
    </>
  );
};

const RenderQueryResult = (queryResult: IQueryResult) => {
  if (queryResult.returnText) {
    return RenderText(queryResult.data);
  }
  return RenderGrid(queryResult.data);
};

const RenderQueryJSON = (queryResult: IQueryResult) => {
  let result = queryResult.data;
  if (!queryResult.returnText) {
    return RenderText(JSON.stringify(result, null, "\t"), "json"); //json stringify with some formatting
  }
  return RenderText(result);
};
const TabPanel = ({
  children,
  index,
  value,
}: {
  children?: React.ReactNode | JSX.Element;
  index: number;
  value: number;
}) => {
  return (
    <>
      {value === index && (
        <div className="w-full h-[90%] rounded-sm bg-gray-50 shadow-sm relative">
          {children}
        </div>
      )}
    </>
  );
};

const Metadata = ({ metadata }: { metadata: QueryMetadata }) => {
  const flattened = {
    ...metadata.operation,
    ...metadata.result,
    ...metadata.request,
  };
  return (
    <div className="grid gap-4 grid-flow-row p-4 text-sm">
      {Object.keys(flattened).map((metadataKey) => {
        return (
          <div
            className="grid grid-cols-5 border-b border-gray-300 pb-1 max-h-6 content-center "
            key={metadataKey}
          >
            <div className="col-span-1 text-gray-500 font-semibold">
              {metadataKey}
            </div>
            <div className="col-span-3 overflow-auto text-gray-500 ">
              {flattened[metadataKey as keyof typeof flattened]}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const exportData = (data: []) => {
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(data)
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = "data.json";

  link.click();
};

export default function ResultsPanel() {
  const { queryResults } = useQueryContext();
  const [value, setValue] = React.useState(-1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    if (queryResults && value === -1) {
      setValue(0);
    }
    if (queryResults?.returnText && value > 0) {
      setValue(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryResults]);
  const resultOptions = [
    {
      name: "Save result as CSV",
      element: (
        <>
          {queryResults && (
            <CSVLink data={queryResults.data} filename={"data.csv"}>
              Save result as CSV
            </CSVLink>
          )}
        </>
      ),
    },
    {
      name: "Save result as JSON",
      action: () => {
        exportData(queryResults?.data);
      },
    },
  ];
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex bg-gray-100 border-bottom justify-between w-full pr-2">
        <h2 className="panel-title pl-2 w-1/5">Results</h2>
        <SaveButton
          options={resultOptions}
          buttonText="Save Results"
          startIcon={<SimCardDownloadOutlinedIcon />}
          disable={!queryResults || queryResults?.returnText}
        />
      </div>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="results panel"
        TabIndicatorProps={{
          className: "bg-primary",
        }}
      >
        {/* selected tab is styled in global.scss with .Mui-selected class */}
        <Tab
          label="Results"
          className="text-gray-500"
          disabled={!queryResults}
        />
        <Tab
          label="JSON"
          className="text-gray-500"
          disabled={!queryResults || queryResults?.returnText}
        />
        <Tab
          label="Execution Details"
          className="text-gray-500"
          disabled={!queryResults || queryResults?.returnText}
        />
      </Tabs>
      <TabPanel index={0} value={value}>
        {queryResults && RenderQueryResult(queryResults)}
      </TabPanel>
      <TabPanel index={1} value={value}>
        {queryResults && RenderQueryJSON(queryResults)}
      </TabPanel>
      <TabPanel index={2} value={value}>
        {queryResults && queryResults.metadata && (
          <Metadata metadata={queryResults.metadata} />
        )}
      </TabPanel>
    </div>
  );
}
