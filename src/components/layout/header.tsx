import { AppBar, Paper, Button, Stack, Alert, Snackbar } from "@mui/material";

import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import DataObjectIcon from "@mui/icons-material/DataObject";
import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";
import "../../styles/Home.module.css";
import SaveButton from "../splitbutton/SaveButton";
import Image from "next/image";
import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useQueryContext } from "../../contexts/queryContext/useQueryContext";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useState } from "react";

const Header = () => {
  const { query, setQueryResults, setQueryRunning, queryRunning } =
    useQueryContext();
  const [errorMessage, setErrorMessage] = useState("");
  const [queryError, setQueryError] = useState(false);
  const handleToggle = async (dts = false) => {
    let url = "/api/stackql";
    if (dts) {
      url = url + "?dts=true";
    }
    const request = new Request(url, {
      body: query,
      method: "POST",
    });
    setQueryRunning(true);
    try {
      const response = await fetch(request);
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

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setQueryError(false);
  };

  return (
    <>
      <Snackbar open={queryError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <div className="bg-gray-50 min-h-fit rounded-none border-b border-b-gray-300 pl-8 pt-3 pb-3 flex items-center">
        <div className="w-1/6 flex-col">
          <Image alt="logo" src="/logo-original.svg" width={162} height={32} />
        </div>
        <div className="w-4/6 flex-col">
          <Stack direction="row" spacing={2}>
            <Button
              onClick={async () => {
                await handleToggle();
              }}
              variant="outlined"
              className="text-primary border border-primary bg-white"
              startIcon={<PlayCircleFilledWhiteIcon />}
            >
              Run Query
            </Button>

            <Backdrop
              className="w-screen ml-0"
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={queryRunning}
            >
              <CircularProgress color="inherit" />
            </Backdrop>

            <Button
              variant="outlined"
              className="text-primary border border-primary bg-white"
              startIcon={<DataObjectIcon />}
              onClick={async () => {
                await handleToggle(true);
              }}
            >
              Get Types
            </Button>
            {/* <SplitButton /> */}
          </Stack>
        </div>
        <div className="w-1/6 flex-col mr-10">
          <Stack direction="row" spacing={2} justifyContent="right">
            <a href="https://github.com/stackql/stackql-playground">
              <IconButton aria-label="GitHub repository">
                <GitHubIcon />
              </IconButton>
            </a>
          </Stack>
        </div>
      </div>
    </>
  );
};

export default Header;
