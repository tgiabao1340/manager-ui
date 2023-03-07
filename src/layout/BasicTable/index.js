import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicTable({ data }) {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [player, setPlayer] = React.useState(null);
  const columns = [
    {
      field: "identifier",
      headerName: "steamId",
      width: 250,
      disableColumnMenu: true,
    },
    {
      field: "name",
      headerName: "Tên",
      minWidth: 300,
      disableColumnMenu: true,
    },
    {
      field: "job",
      headerName: "Cấp bậc",
      width: 200,
      minWidth: 50,
      disableColumnMenu: true,
      valueFormatter: (params) => params.value?.grade_label,
    },
    {
      field: "actionEdit",
      headerName: "",
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        const onClick = (e) => {
          const currentRow = params.row;
          setPlayer(currentRow);
          setOpenEdit(true);
          return;
        };

        return (
          <Button
            variant="outlined"
            color="warning"
            size="small"
            onClick={onClick}
          >
            Sửa
          </Button>
        );
      },
    },
    {
      field: "actionDelete",
      headerName: "",
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        const onClick = (e) => {
          const currentRow = params.row;
          setOpenDelete(true);
        };

        return (
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={onClick}
          >
            Đuổi
          </Button>
        );
      },
    },
  ];
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        getRowId={(row) => row.identifier}
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Chỉnh sửa</DialogTitle>
        <DialogContent>
          <Box>{player?.name}</Box>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Cấp bậc
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              onChange={() => {}}
              label="Age"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Hủy</Button>
          <Button onClick={handleCloseEdit}>Lưu</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDelete} onClose={handleCloseDelete} fullWidth>
        <DialogTitle>Xác nhận</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Bạn có chắc chưa ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleCloseDelete}>
            Không
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseDelete}
          >
            Có
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
