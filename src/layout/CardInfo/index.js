import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Divider, Stack } from "@mui/material";
// import useState from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";


export default function CardInfo({data, total, society_money, player_money, society, myrank}) {
  const {label, grades} = data
  // Use state to control the dialog open or close
  const [open, setOpen] = React.useState(false);

  // Use state to store the input values
  const [input1, setInput1] = React.useState();
  const [dw, setDW] = React.useState(false);

  // Handle the dialog open event
  const handleOpen = (tempDW) => {
    setOpen(true);
    setDW(tempDW)
  };

  // Handle the dialog close event
  const handleClose = () => {
    setOpen(false);
  };

  // Handle the input change event
  const handleChange = (event) => {
    // Get the name and value of the input field
    const { name, value } = event.target;

    // Set the corresponding state based on the name
    if (name === "input1") {
      setInput1(value);
    }
  };

  // Handle the submit event
  const handleSubmit = (event) => {
    // Prevent the default form behavior
    event.preventDefault();

    // Do something with the input values

    const requestOptions = handlePostRequest({
        society: society,
        inputmoney: input1,
    })
    
    if (dw){
      fetch("http://esx_society/withdraw", requestOptions).then(() => {
        fetch("http://esx_society/refresh", handlePostRequest({society: society}));
      });
    } else{
      fetch("http://esx_society/deposit", requestOptions).then(() => {
        fetch("http://esx_society/refresh", handlePostRequest({society: society}));
      });
    }
    // Close the dialog
    handleClose();
    setInput1();
  };

  const handlePostRequest = (data) =>{
    return {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  }

  const canmanage = (data, myrank) => {
    if( !data ) { return false}
    for (const [i, grade] of Object.keys(data).entries()) {
      if(data[grade].manage == 1 && myrank == data[grade].grade){
        return true;
      }
    }
    return false
  }
  return (
    <Card style={{ height: 500, width: "100%" }} sx={{
      backgroundColor: "rgb(46, 46, 46, 0.80)",
    }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Thông tin
        </Typography>
        <Typography variant="h5" component="div">
          Tên : {label}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Tổng thành viên: {total}
        </Typography>
        <Typography variant="body2">
          Tổng cấp bậc : {grades ? Object.keys(grades).length : 0}
        </Typography>
      </CardContent>
      {myrank == 99 && (
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Quản lý Ngân Quỹ
          </Typography>
          <Typography variant="h5" component="div">
            Hiện có: {society_money.toLocaleString("en-US")}$
          </Typography>
          <Stack direction="row" spacing={1} pt={1}>
            <Button variant="contained" color="success" onClick={() => handleOpen(false)}>
              Gửi
            </Button>
            <Button variant="contained" color="warning" onClick={() => handleOpen(true)}>
              Rút
            </Button>
          </Stack>
          <Dialog open={open} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
              <DialogTitle>Ngân quỹ</DialogTitle>
              <DialogContent>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Ngân quỹ đang có: {society_money.toLocaleString("en-US")}$
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Tiền trong túi của bạn: {player_money.toLocaleString("en-US")}$
                </Typography>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Số tiền bạn muốn gửi/rút"
                  type="number"
                  value={input1}
                  name="input1"
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} variant="contained" color="error">Hủy</Button>
                <Button type="submit" variant="contained" color="success">Đồng ý</Button>
              </DialogActions>
            </form>
          </Dialog>
        </CardContent>
      )}
    </Card>
  );
}
