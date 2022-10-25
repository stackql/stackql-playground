import { Dialog, DialogTitle } from "@mui/material";
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
    </Dialog>
  );
};
