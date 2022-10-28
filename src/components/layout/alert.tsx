import { Snackbar } from "@mui/material";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import React from "react";

export const AlertMessage = ({
  open,
  handleClose,
  errorMessage,
  severity,
}: {
  open: boolean;
  handleClose: () => void;
  errorMessage: string;
  severity: AlertColor;
}) => {
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};
