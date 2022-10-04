import {
  AppBar,
  Paper,
  Button,
  Stack,
} from "@mui/material";

import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import DataObjectIcon from '@mui/icons-material/DataObject';
import GitHubIcon from '@mui/icons-material/GitHub';
import IconButton from '@mui/material/IconButton';
import '../../styles/Home.module.css';
import SplitButton from '../splitbutton/SplitButton';

import Image from "next/image";
const Header = () => {
  return (
    <div className="bg-gray-50 min-h-fit rounded-none border-b border-b-gray-300 pl-8 pt-3 pb-3 flex items-center">
      <div className="w-1/6 flex-col">
        <Image alt="logo" src="/logo-original.svg" width={162} height={32} />
      </div>
      <div className="w-4/6 flex-col">
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            sx={{ color: 'rgb(15, 76, 129)', backgroundColor: 'white', borderColor: 'rgb(15, 76, 129)' }}
            startIcon={<PlayCircleFilledWhiteIcon />}>
            Delete
          </Button>
          <Button
            variant="outlined"
            sx={{ color: 'rgb(15, 76, 129)', backgroundColor: 'white', borderColor: 'rgb(15, 76, 129)' }}
            startIcon={<DataObjectIcon />}>
            Get Types
          </Button>
          <SplitButton />
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
  );
};




export default Header;
