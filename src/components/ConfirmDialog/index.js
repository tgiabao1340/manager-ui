import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContentText } from "@mui/material";

export default function ConfirmDialog(props) {
  const { open, context, title, handleClose, onAccepted } = props;

  const handleCloseBuy = () => {
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleCloseBuy} fullWidth>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText>{context}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button onClick={onAccepted} variant="contained">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
