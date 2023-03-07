import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Avatar, Button } from "@mui/material";
import FormBuy from "../FormBuy";

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter placeholder="Tìm kiếm..." />
    </Box>
  );
}

export default function DataGridView(props) {
  const { data, loading } = props;
  const [openBuy, setOpenBuy] = React.useState(false);
  const [formBuy, setFormBuy] = React.useState({
    label: "",
    note: "",
    stock: 0,
  });
  const handleBuy = (data) => {
    const { row } = data;
    setFormBuy({ ...row });
    setOpenBuy(true);
  };

  const handleCloseBuy = () => {
    setOpenBuy(false);
  };

  const columns = [
    {
      field: "name",
      headerName: "Người bán",
      width: 150,
      editable: false,
    },
    {
      field: "image",
      headerName: "",

      renderCell: (data) => {
        return (
          <>
            <Avatar
              src={
                data.row.item
                  ? `https://cdn.anhchiem.xyz/img/items/${data.row.item}.png`
                  : ""
              }
              variant="square"
            />
          </>
        );
      },
    },
    {
      field: "label",
      headerName: "Tên đồ vật",
      flex: 1,
      editable: false,
    },
    {
      field: "price",
      headerName: "Giá",
      editable: false,
      renderCell: (data) => {
        return data.row.price.toLocaleString("en-US") + " $";
      },
    },
    {
      field: "stock",
      headerName: "Số lượng",
      width: 150,
      editable: false,
      renderCell: (data) => {
        return data.row.stock + "/" + data.row.count;
      },
    },
    {
      field: "",
      headerName: "",
      width: 150,
      editable: false,
      disableClickEventBubbling: true,
      renderCell: (data) => {
        return (
          <Button fullWidth variant="contained" onClick={() => handleBuy(data)}>
            Mua
          </Button>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: "80vh", width: "100%" }}>
      <DataGrid
        getRowId={() => Math.random()}
        loading={loading}
        rows={data}
        columns={columns}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        disableColumnMenu
        disableColumnFilter
        disableDensitySelector
        disableExport
        components={{ Toolbar: QuickSearchToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
      <FormBuy open={openBuy} handleClose={handleCloseBuy} formBuy={formBuy} />
    </Box>
  );
}
