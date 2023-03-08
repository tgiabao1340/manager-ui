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
} from "@mui/material";

export default function DataTable({ data }) {
  const columns = [
    { field: "id", headerName: "ID", width: 130, disableColumnMenu: true },
    {
      field: "label",
      headerName: "Tên cấp bậc",
      minWidth: 300,
      disableColumnMenu: true,
    },
    {
      field: "grade",
      headerName: "Cấp",
      width: 130,
      minWidth: 50,
      disableColumnMenu: true,
    },
    {
      field: "actionEdit",
      headerName: "",
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        const onClick = (e) => {
          const currentRow = params.row;
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
            Edit
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
            Delete
          </Button>
        );
      },
    },
  ];
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const rows = [];
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      let item = {
        id: data[key]["id"],
        label: data[key]["label"],
        grade: data[key]["grade"],
      };
      rows.push(item);
    }
  }
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Chỉnh sửa</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tên cấp bậc"
            type="email"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tên(không dấu)"
            type="email"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Cấp bậc ( 1 - 98 )"
            type="email"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Lương 7p"
            type="email"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
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
