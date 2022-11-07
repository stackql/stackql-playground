import { IconButton } from "@mui/material";
import { ReactElement, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Collapsible = (props: {
  children: ReactElement | ReactElement[];
  containerClass: string;
  label: string;
  open: boolean;
}) => {
  const { label, containerClass, children, open } = props;
  const [isOpen, setIsOpen] = useState(open);
  const handleExpandOnClick = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className={containerClass}>
      <div className="panel-title text-center bg-gray-100 border-bottom flex justify-between items-center pl-2">
        <p>{label}</p>
        <IconButton onClick={handleExpandOnClick} className="p-0">
          <ExpandMoreIcon />
        </IconButton>
      </div>
      {isOpen && children}
    </div>
  );
};

export default Collapsible;
