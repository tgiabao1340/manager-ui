import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

export default function DataTable({ data }) {
  const columns = [
    // { field: "id", headerName: "ID", width: 130, disableColumnMenu: true },
    {
      field: "grade",
      headerName: "Cấp",
      width: 130,
      minWidth: 50,
      disableColumnMenu: true,
    },
    {
      field: "label",
      headerName: "Tên cấp bậc",
      minWidth: 300,
      disableColumnMenu: true,
    },
    {
      field: "name",
      headerName: "Tên viết tắt",
      minWidth: 100,
      disableColumnMenu: true,
    },
    {
      field: "salary",
      headerName: "Lương 7 phút",
      minWidth: 120,
      disableColumnMenu: true,
    },
    {
      field: "Edit",
      headerName: "",
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        const onClick = (e) => {
          const currentRow = params.row;
          setOpenEdit(true);
          setRoleData(currentRow)
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
          setOpenDelete(true);
          setRoleData(currentRow);
        };

        return (
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={onClick}
          >
            Xóa
          </Button>
        );
      },
    },
  ];
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [roleData, setRoleData] = React.useState({
    name: "",
    label: "",
    grade: 0,
    salary: 0,
    kick: 0,
    invite: 0,
    manage: 0,
    society: "",
  });
  const rows = [];
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      // let item = {
      //   id: data[key]["id"],
      //   label: data[key]["label"],
      //   grade: data[key]["grade"],
      // };
      rows.push(data[key]);
    }
  }
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleEditRequest = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: roleData.name,
        label: roleData.label,
        grade: roleData.grade,
        salary: roleData.salary,
        kick:roleData.kick,
        invite:roleData.invite,
        manage:roleData.manage,
        society:roleData.job_name,
      }),
    };
    fetch("http://esx_society/editrank", requestOptions);
    handleCloseEdit();
  };

  const handleDeleteRequest = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grade: roleData.grade,
        society:roleData.job_name,
      }),
    };
    fetch("http://esx_society/deleterank", requestOptions);
    handleCloseDelete();
  };

  const handleCreateRequest = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: roleData.name,
        label: roleData.label,
        grade: roleData.grade,
        salary: roleData.salary,
        kick:roleData.kick,
        invite:roleData.invite,
        manage:roleData.manage,
        society:roleData.job_name,
      }),
    };
    fetch("http://esx_society/createrank", requestOptions);
    handleCloseEdit();
  };

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
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
        onClick={() => setOpenCreate(true)}
      >Thêm mới
      </Button>
      <Dialog open={openCreate} onClose={handleCloseCreate}>
      <DialogTitle>Thêm mới</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="label"
            label="Tên cấp bậc"
            type="text"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => {
              setRoleData({ ...roleData, label: event.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tên viết tắt (không dấu)"
            type="text"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => {
              setRoleData({ ...roleData, name: event.target.value });
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="grade"
            label="Cấp bậc"
            type="number"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            min={0}
            max={99}
            onChange={(event) => {
              setRoleData({ ...roleData, grade: event.target.value });
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="salary"
            label="Lương 7 phút"
            type="number"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            min={0}
            max={1000000}
            onChange={(event) => {
              setRoleData({ ...roleData, salary: event.target.value });
            }}
          />
          <FormGroup>
            <FormControlLabel control={<Checkbox onChange={(event) => {
              setRoleData({ ...roleData, invite: event.target.checked });
            }} />} label="Quyền mời" />
            <FormControlLabel control={<Checkbox onChange={(event) => {
              setRoleData({ ...roleData, kick: event.target.checked });
            }}/>} label="Quyền kick" />
            <FormControlLabel control={<Checkbox onChange={(event) => {
              setRoleData({ ...roleData, manage: event.target.checked });
            }}/>} label="Quyền quản lý" />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleCloseCreate}>Hủy</Button>
          <Button variant="contained" color="success" onClick={handleCreateRequest} >Lưu</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Chỉnh sửa</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="label"
            label="Tên cấp bậc"
            type="text"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value = {roleData.label}
            onChange={(event) => {
              setRoleData({ ...roleData, label: event.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tên viết tắt (không dấu)"
            type="text"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value = {roleData.name}
            onChange={(event) => {
              setRoleData({ ...roleData, name: event.target.value });
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="salary"
            label="Lương 7 phút"
            type="number"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            min={0}
            max={1000000}
            value = {roleData.salary}
            onChange={(event) => {
              setRoleData({ ...roleData, salary: event.target.value });
            }}
          />
          <FormGroup>
            <FormControlLabel control={<Checkbox checked = {roleData.invite == 1 ? true : false} onChange={(event) => {
              setRoleData({ ...roleData, invite: event.target.checked });
            }} />} label="Quyền mời" />
            <FormControlLabel control={<Checkbox checked = {roleData.kick == 1 ? true : false} onChange={(event) => {
              setRoleData({ ...roleData, kick: event.target.checked });
            }}/>} label="Quyền kick" />
            <FormControlLabel control={<Checkbox checked = {roleData.manage == 1 ? true : false} onChange={(event) => {
              setRoleData({ ...roleData, manage: event.target.checked });
            }}/>} label="Quyền quản lý" />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleCloseEdit}>Hủy</Button>
          <Button variant="contained" color="success" onClick={handleEditRequest} >Lưu</Button>
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
            onClick={handleDeleteRequest}
          >Có
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
