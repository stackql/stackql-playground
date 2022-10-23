import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { ButtonBase } from "@mui/material";
export const CopyButton = ({ copyText }: { copyText: string }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);
  };
  return (
    <div className="absolute top-4 right-5 z-50">
      <ButtonBase onClick={handleCopy}>
        <ContentCopyIcon />
      </ButtonBase>
    </div>
  );
};
