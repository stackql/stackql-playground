import { Input, TextField } from "@mui/material";
import { useState } from "react";
import { useQueryContext } from "../../contexts/queryContext/useQueryContext";
import { primaryColorHex } from "../../types";
import { DialogButton } from "../dialog-button";
import PowerIcon from "@mui/icons-material/Power";
import PowerOffIcon from "@mui/icons-material/PowerOff";

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
      type="url"
      defaultValue={serverUrl || "http://localhost:8080"}
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

  const ButtonContent = () => {
    return (
      <>
        <p className="pt-0.5 tablet:hidden">{title}</p>
      </>
    );
  };

  const onSubmit = () => {
    handleSubmit();
  };
  return (
    <DialogButton
      title={title}
      buttonContent={<ButtonContent />}
      textField={textField}
      onSubmit={onSubmit}
      subText={"Enter the endpoint URL"}
    />
  );
};
