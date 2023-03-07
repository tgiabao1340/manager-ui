import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Autocomplete, FormControl, Grid } from "@mui/material";
import { Box } from "@mui/system";
import InputMoney from "../../components/InputMoney";
import InputQuantity from "../../components/InputQuantity";

export default function FormCreate(props) {
  const { items } = props;
  const [error, setError] = React.useState({
    item: false,
    quantity: false,
    description: false,
    money: false,
  });
  const { open, handleClose } = props;
  const descriptionRef = React.useRef(null);
  const [form, setForm] = React.useState({
    quantity: 1,
    money: 0,
    description: "",
    item: "",
  });

  const clearForm = () => {
    setForm({
      quantity: 1,
      money: 0,
      description: "",
      item: "",
    });
  };

  const validate = (item, quantity, description, money) => {
    var isOk = true;
    if (item === "" || item === undefined || item == null) {
      setError((prev) => {
        return { ...prev, item: true };
      });
      isOk = false;
    }

    if (quantity === undefined || quantity == null || quantity < 1) {
      setError((prev) => {
        return { ...prev, quantity: true };
      });
      isOk = false;
    }

    if (description === undefined || description == null) {
      setError((prev) => {
        return { ...prev, description: true };
      });
      isOk = false;
    }

    if (money === undefined || money == null || money < 1) {
      setError((prev) => {
        return { ...prev, money: true };
      });
      isOk = false;
    }

    return isOk;
  };

  const handleCloseForm = () => {
    clearForm();
    handleClose();
  };

  const handleCreateRequest = () => {
    setError({
      item: false,
      quantity: false,
      description: false,
      money: false,
    });

    const { item, quantity, description, money } = form;
    const isOk = validate(item?.name, quantity, form.description, money);
    if (isOk) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item: item.name,
          soluong: quantity,
          price: money,
          note: description,
        }),
      };
      fetch("http://ace_epicnpcquest/createquest", requestOptions);
      handleCloseForm();
    }
  };

  return (
    <Dialog open={open} onClose={handleCloseForm} fullWidth>
      <DialogTitle>Tạo đơn bán</DialogTitle>
      <DialogContent>
        <Box mt={2}></Box>
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={items}
                  onChange={(_, value) => {
                    setError({ ...error, item: false });
                    setForm({ ...form, item: value });
                  }}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Chọn vật phẩm"
                      error={error?.item}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <InputQuantity
                error={error?.quantity}
                defaultValue={1}
                min={1}
                max={1000}
                onChange={({ target }) => {
                  setError({ ...error, quantity: false });
                  setForm({ ...form, quantity: target.value });
                }}
              ></InputQuantity>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-required"
                label="Thông tin thêm"
                placeholder="Mô tả..."
                fullWidth
                onChange={(event) => {
                  setError({ ...error, description: false });
                  setForm({ ...form, description: event.target.value });
                }}
                error={error?.description}
              />
            </Grid>
            <Grid item xs={12}>
              <InputMoney
                error={error?.money}
                defaultValue={0}
                onChange={({ target }) => {
                  setError({ ...error, money: false });
                  setForm({ ...form, money: target.value });
                }}
              ></InputMoney>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button onClick={handleCreateRequest} variant="contained">
          Tạo
        </Button>
      </DialogActions>
    </Dialog>
  );
}
