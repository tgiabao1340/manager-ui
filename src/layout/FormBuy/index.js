import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContentText, Grid } from "@mui/material";
import { Box } from "@mui/system";
import InputQuantity from "../../components/InputQuantity";
export default function FormBuy(props) {
  const { open, formBuy, handleClose } = props;
  const { label, note, stock } = formBuy;

  const [error, setError] = React.useState({
    quantity: false,
  });

  const [quantity, setQuantity] = React.useState(1);

  const handleCloseBuy = () => {
    setError({ ...error, quantity: false });
    setQuantity(1);
    handleClose();
  };

  const requestBuy = () => {
    const { id, item } = formBuy;
    let isOk = true;
    if (item == null || item === "" || item === undefined) {
      isOk = false;
    }

    if (id == null || id === "" || id === undefined) {
      isOk = false;
    }

    if (
      quantity == null ||
      quantity === "" ||
      quantity === undefined ||
      quantity < 0
    ) {
      setError({ ...error, quantity: true });
      isOk = false;
    }

    if (isOk) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
          soluong: quantity,
        }),
      };
      fetch("http://ace_epicnpcquest/buy", requestOptions);
      handleCloseBuy();
    }
  };

  return (
    <Dialog open={open} onClose={handleCloseBuy} fullWidth>
      <DialogTitle>Mua {label}</DialogTitle>

      <DialogContent>
        <DialogContentText>Thông tin thêm: {note}</DialogContentText>
        <DialogContentText>Còn lại: {stock}</DialogContentText>
        <Box mt={2}></Box>
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <InputQuantity
                error={error?.quantity}
                defaultValue={1}
                min={1}
                max={stock}
                onChange={({ target }) => {
                  setError({ ...error, quantity: false });
                  setQuantity(target.value);
                }}
              ></InputQuantity>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button onClick={requestBuy} variant="contained">
          Mua
        </Button>
      </DialogActions>
    </Dialog>
  );
}
