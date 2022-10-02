import { AppBar, Paper } from "@mui/material";
import Image from "next/image";
const Header = () => {
  return (
    <AppBar position="static">
      <div className="bg-gray-50 min-h-fit rounded-none border-b border-b-gray-300 pl-2 flex items-center">
        <Image alt="logo" src="/logo-original.svg" width={100} height={30} />
      </div>
    </AppBar>
  );
};

export default Header;
