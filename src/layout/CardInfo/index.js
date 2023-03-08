import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Divider, Stack } from "@mui/material";
// import useState from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";


export default function CardInfo({data}) {
  const {total, label, grades} = data
  // Use state to control the dialog open or close
  const [open, setOpen] = React.useState(false);

  // Use state to store the input values
  const [input1, setInput1] = React.useState(0);
  const [input2, setInput2] = React.useState(0);

  // Handle the dialog open event
  const handleOpen = () => {
    setOpen(true);
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
    } else if (name === "input2") {
      setInput2(value);
    }
  };

  // Handle the submit event
  const handleSubmit = (event) => {
    // Prevent the default form behavior
    event.preventDefault();

    // Do something with the input values
    console.log(input1, input2);

    // Close the dialog
    handleClose();
  };
  
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Thông tin
        </Typography>
        <Typography variant="h5" component="div">
          Tên guild : {label}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Tổng thành viên: {total}
        </Typography>
        <Typography variant="body2">
          Tổng cấp bậc : {Object.keys(grades).length}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Quản lý Ngân Quỹ
        </Typography>
        <Typography variant="h5" component="div">
          Hiện có: 1000000000$
        </Typography>
        <Stack direction="row" spacing={1} pt={1}>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Gửi
          </Button>
          <Button variant="contained" color="warning" onClick={handleOpen}>
            Rút
          </Button>
        </Stack>
        <Dialog open={open} onClose={handleClose}>
          <form onSubmit={handleSubmit}>
            <DialogTitle>Ngân quỹ</DialogTitle>
            <DialogContent>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Ngân quỹ đang có: 1,000,000$
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Tiền trong túi của bạn: 1,000$
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Số tiền bạn muốn gửi/rút:
              </Typography>
              <TextField
                name="input1"
                type="number"
                label="Input 1"
                value={input1}
                onChange={handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </form>
        </Dialog>
      </CardContent>
    </Card>
  );
}
