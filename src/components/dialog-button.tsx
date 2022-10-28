import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { ReactElement, useState } from "react";

export interface ButtonDialogFormProps {
  open?: boolean;
  title: string;
  textField?: ReactElement | ReactElement[];
  subText?: string;
  buttonText?: string;
  onSubmit?: () => void;
}

export const DialogButton = ({
  title,
  subText,
  buttonText,
  textField,
  onSubmit,
}: ButtonDialogFormProps) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    onSubmit && onSubmit();
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        className="text-primary border border-primary bg-white"
      >
        {buttonText}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{subText}</DialogContentText>
          {textField}
        </DialogContent>
        <DialogActions>
          <Button
            className="text-primary text-center border-primary"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            className="text-primary text-center border-primary"
            variant="outlined"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
