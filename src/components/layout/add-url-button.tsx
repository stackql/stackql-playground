import { Input, TextField } from "@mui/material";
import { useState } from "react";
import { useQueryContext } from "../../contexts/queryContext/useQueryContext";
import { primaryColorHex } from "../../types";
import { DialogButton } from "../dialog-button";

export const AddUrlButton = () => {
  const { setServerUrl, serverUrl } = useQueryContext();
  const [inputText, setInputText] = useState<string>("");
  const title = "Connect to StackQL Server";
  const handleSubmit = () => {
    setServerUrl(inputText);
  };
  const textField = (
    <Input
      autoFocus
      margin="dense"
      id="name"
      placeholder={serverUrl || "https://"}
      type="url"
      defaultValue={serverUrl}
      fullWidth
      onChange={(event) => {
        setInputText(event.target.value);
      }}
      sx={{
        ":before": { borderBottomColor: primaryColorHex },
        // underline when selected
        ":after": { borderBottomColor: primaryColorHex },
      }}
    />
  );

  const onSubmit = () => {
    handleSubmit();
  };
  return (
    <DialogButton
      title={title}
      buttonText={title}
      textField={textField}
      onSubmit={onSubmit}
    />
  );
};
