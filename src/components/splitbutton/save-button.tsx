import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

import React from "react";

export default function SplitButton({
  buttonText,
  options,
  startIcon,
  disable,
}: {
  buttonText: string;
  options: {
    action?: () => void;
    element?: React.ReactElement;
    name: string;
  }[];
  startIcon?: React.ReactElement;
  disable: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen: any) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };
  const buttonClass = !disable
    ? "text-primary border-0 text-center"
    : "text-gray-500 border-0 text-center";
  return (
    <React.Fragment>
      <ButtonGroup ref={anchorRef} aria-label="split button">
        <Button
          className={buttonClass}
          onClick={handleToggle}
          disabled={disable}
        >
          <span>{startIcon}</span>
          <span className="pt-1 px-0.5">{buttonText}</span>
          <span>{<ArrowDropDownIcon fontSize="small" />}</span>
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option) => {
                    return (
                      <MenuItem
                        key={option.name}
                        onClick={() => {
                          option.action && option.action();
                          setOpen(false);
                        }}
                      >
                        {option.element ? option.element : option.name}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
