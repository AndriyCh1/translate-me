import React, { forwardRef, JSX, ReactElement, useState } from "react";
import { Snackbar as MuiSnackbar, SnackbarOrigin } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

interface IProps {
  isOpen: boolean;
  children: JSX.Element;
  onClose?: () => void;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant="filled"
      sx={{ width: "100%" }}
      {...props}
    />
  );
});

const Snackbar: React.FC<IProps> = ({ isOpen = false, onClose, children }) => {
  const [open, setOpen] = useState(isOpen);

  const position: SnackbarOrigin = { horizontal: "right", vertical: "top" };

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <div>
      <MuiSnackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ ...position }}
      >
        {children}
      </MuiSnackbar>
    </div>
  );
};

export default Snackbar;
