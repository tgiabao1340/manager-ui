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
  OutlinedInput,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from '@mui/material/styles';

export default function BasicTable({ data, grades }) {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [player, setPlayer] = React.useState(null);
  const [user, setUser] = React.useState({
    grade: 0,
    steamid: ""
  });
  var gradesTable = grades

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
            variant="contained"
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
            variant="contained"
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
        sx={{
          backgroundColor: "rgb(46, 46, 46, 0.80)",
        }}
      />
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Chỉnh sửa</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Tên"
            type="text"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value = {player?.name}
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="demo-simple-select-standard-label">Cấp bậc</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={user.grade}
              onChange={(event) => {setUser({...user, grade: event.target.value, steamid: player.identifier})}}
              input={<OutlinedInput label="Name" />}
            >
              {Object.keys(gradesTable).map((value, key) => (
                <MenuItem key={key} value={value}>
                  {gradesTable[value].label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleCloseEdit}>Hủy</Button>
          <Button variant="contained" color="success" onClick={handleCloseEdit}>Lưu</Button>
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
          <Button variant="contained" color="success" onClick={handleCloseDelete}>
            Không
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleCloseDelete}
          >
            Có
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
