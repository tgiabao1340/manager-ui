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

export default function BasicTable({ data, grades, society }) {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openInvite, setOpenInvite] = React.useState(false);
  const [player, setPlayer] = React.useState(null);
  const [grade, setGrade] = React.useState(0);
  const [nearestPlayer, setNearestPlayer] = React.useState({
    ped: -1,
    name: '',
    id: 0,
  });

  var gradesTable = grades

  const columns = [
    {
      field: "identifier",
      headerName: "SteamID",
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
      field: "Edit",
      headerName: "",
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        const onClick = (e) => {
          const currentRow = params.row;
          setPlayer(currentRow);
          setGrade(currentRow.job.grade);
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
      field: "Delete",
      headerName: "",
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        const onClick = (e) => {
          const currentRow = params.row;
          setPlayer(currentRow);
          setGrade(currentRow.job.grade);
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
  const handleCloseInvite = () => {
    setOpenInvite(false);
  };
  const handleEditPlayerRequest = () => {
    const requestOptions = handlePostRequest({
        cid: player.identifier,
        grade: grade,
        society: society
    })
    fetch("http://esx_society/editplayer", requestOptions).then(() => {
      fetch("http://esx_society/refresh", handlePostRequest({society: society}));
    });
    handleCloseEdit();
  };
  const handleKickPlayerRequest = () => {
    const requestOptions = handlePostRequest({
        cid: player.identifier,
        grade: grade,
        society: society
    })
    fetch("http://esx_society/kick", requestOptions).then(() => {
      fetch("http://esx_society/refresh", handlePostRequest({society: society}));
    });
    handleCloseDelete();
  };
  const handleInviteGet = async () => {
    const response = await fetch("http://esx_society/getclosestplayer", handlePostRequest({})).then((cb) => cb.json());
    if(response.ped != -1){
      setNearestPlayer({...nearestPlayer, ped: response.ped, id: response.id, name: response.name});
      setOpenInvite(true);
    }
  };
  const handleInviteRequest = () => {
    const requestOptions = handlePostRequest({
        ped: nearestPlayer.ped,
        name: nearestPlayer.name,
        id: nearestPlayer.id,
        society: society
    })
    fetch("http://esx_society/invite", requestOptions).then(() => {
      fetch("http://esx_society/refresh", handlePostRequest({society: society}));
    });
    handleCloseInvite();
  };

  const handlePostRequest = (data) =>{
    return {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  }
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        getRowId={(row) => row.identifier}
        rows={data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        sx={{
          backgroundColor: "rgb(46, 46, 46, 0.80)",
        }}
      />
      <Button
        variant="contained"
        color="success"
        onClick={handleInviteGet}
      >
        Mời
      </Button>
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
              value={grade}
              onChange={(event) => {setGrade(event.target.value)}}
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
          <Button variant="contained" color="success" onClick={handleEditPlayerRequest}>Lưu</Button>
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
            color="success"
            onClick={handleKickPlayerRequest}
          >
            Có
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openInvite} onClose={handleCloseInvite} fullWidth>
        <DialogTitle>Xác nhận</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Bạn có muốn mời {nearestPlayer.name} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleCloseInvite}>
            Không
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleInviteRequest}
          >
            Có
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
