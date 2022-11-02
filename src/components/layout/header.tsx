import { AppBar, Paper, Button, Stack, Alert, Snackbar } from "@mui/material";

import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import DataObjectIcon from "@mui/icons-material/DataObject";
import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";
import "../../styles/Home.module.css";
import SaveButton from "../splitbutton/save-button";
import Image from "next/image";
import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useQueryContext } from "../../contexts/queryContext/useQueryContext";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { AddUrlButton } from "./add-url-button";
import { AlertMessage } from "./alert";
import { fetchQuery } from "../../fetch";

const Header = () => {
  const { query, setQueryResults, setQueryRunning, queryRunning, serverUrl } =
    useQueryContext();
  const [errorMessage, setErrorMessage] = useState("");
  const [queryError, setQueryError] = useState(false);
  const handleToggle = async (dts = false) => {
    setQueryRunning(true);
    try {
      const response = await fetchQuery({ query, dts, serverUrl });
      setQueryRunning(false);

      const resJson = await response.json();
      if (response.status !== 200) {
        setErrorMessage(resJson.error);
        setQueryError(true);
        return;
      }
      setQueryResults(resJson);
    } catch (error) {
      console.log("error is %o", error);
      setQueryRunning(false);
    }
  };

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setQueryError(false);
  };

  return (
    <>
      <AlertMessage
        open={queryError}
        handleClose={handleClose}
        severity="error"
        errorMessage={errorMessage}
      />
      <Backdrop
        className="w-screen ml-0"
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={queryRunning}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="bg-gray-50 min-h-fit rounded-none border-b border-b-gray-300 pl-3 py-3 items-center grid grid-flow-col grid-cols-9 gap-x-1">
        <div className="flex-col col-span-1 justify-center pt-2 pr-2">
          <Image alt="logo" src="/logo-original.svg" width={162} height={32} />
        </div>
        <div className="col-span-3 flex space-x-9 pl-1">
          <Button
            onClick={async () => {
              await handleToggle();
            }}
            variant="outlined"
            className="button-primary"
            startIcon={<PlayCircleFilledWhiteIcon />}
          >
            <p className="tablet:hidden">Run Query</p>
          </Button>
          <Button
            variant="outlined"
            className="button-primary"
            startIcon={<DataObjectIcon />}
            onClick={async () => {
              await handleToggle(true);
            }}
          >
            <p className="tablet:hidden">Get Types</p>
          </Button>
        </div>
        <div className="col-start-8  col-span-2 regular:col-start-7 regular:col-span-3 flex justify-end space-x-2">
          <AddUrlButton />
          <a href="https://github.com/stackql/stackql-playground">
            <IconButton aria-label="GitHub repository">
              <GitHubIcon />
            </IconButton>
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
