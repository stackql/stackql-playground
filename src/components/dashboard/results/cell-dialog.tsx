import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import Editor from "../../editor";

export interface SimpleDialogProps {
  open: boolean;
  title: string;
  value: string;
  handleClose: () => void;
}

export const SimpleDialog = (props: SimpleDialogProps) => {
  const { open, title, value, handleClose } = props;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <Editor text={value} language={"json"} />
      <DialogActions>
        <Button
          className="text-primary text-center border-primary"
          variant="outlined"
          onClick={handleClose}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};
