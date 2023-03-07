import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { Button, ButtonGroup } from "@mui/material";
import OrderCard from "../../components/OrderCard";
import FormCreate from "../FormCreate";
import DataGridView from "../DataGridView";
import AddIcon from "@mui/icons-material/Add";
import ConfirmDialog from "../../components/ConfirmDialog";

export default function MarketView(props) {
  const { list, orders, items } = props;
  const [selected, setSelected] = React.useState(0);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [dialog, setDialog] = React.useState({ title: "", context: "" });
  const [confirmData, setConfirmData] = React.useState(null);
  const [currentAction, setCurrentAction] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (list?.length > 0) {
      setLoading(false);
    }
  }, [list, orders]);

  const handleClickMarket = () => {
    setSelected(0);
  };

  const handleClickHistory = () => {
    setSelected(1);
  };

  const handleCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setConfirmData(null);
    setCurrentAction(null);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(function () {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      };
      fetch("http://ace_epicnpcquest/refresh", requestOptions);
    }, 1000);
  };

  const requestCancel = (id) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    };
    fetch("http://ace_epicnpcquest/cancelquest", requestOptions);
  };

  const requestWithdraw = (id) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    };
    fetch("http://ace_epicnpcquest/ruttien", requestOptions);
  };

  const requestGetItem = (id) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    };
    fetch("http://ace_epicnpcquest/rutitem", requestOptions);
  };

  const requestPutItem = (id) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    };
    fetch("http://ace_epicnpcquest/depositquest", requestOptions);
  };

  const requestDelete = (id) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    };
    fetch("http://ace_epicnpcquest/deletequest", requestOptions);
  };

  const handleButtonClick = (event) => {
    const { action, data } = event;
    switch (action) {
      case "put":
        setDialog({
          title: "Bạn có chắc chưa?",
          context:
            "Khi nộp sẽ lấy tất cả vật phẩm cần đăng bán trong túi đồ của bạn!",
        });
        break;
      case "cancel":
        setDialog({
          title: "Bạn có chắc chưa?",
          context: "Huỷ rao bán sẽ không đăng lại được nữa!",
        });
        break;
      case "delete":
        setDialog({
          title: "Bạn có chắc chưa?",
          context: "Bấm xoá sẽ mất đi vĩnh viễn item và tiền đã bán được!",
        });
        break;
      case "withdraw":
        setDialog({
          title: "Bạn có chắc chưa?",
          context: "Tiền sẽ được rút vào tài khoản của bạn!",
        });
        break;
      case "getItem":
        setDialog({
          title: "Bạn có chắc chưa?",
          context: "Đồ vật sẽ vào túi đồ của bạn!",
        });
        break;
      default:
        setDialog({
          title: "",
          context: "",
        });
        break;
    }
    setOpenConfirm(true);
    setConfirmData(data);
    setCurrentAction(action);
  };

  const handleOnAccepted = () => {
    if (confirmData == null) return;
    switch (currentAction) {
      case "put":
        requestPutItem(confirmData.id);
        break;
      case "cancel":
        requestCancel(confirmData.id);
        break;
      case "delete":
        requestDelete(confirmData.id);
        break;
      case "withdraw":
        requestWithdraw(confirmData.id);
        break;
      case "getItem":
        requestGetItem(confirmData.id);
        break;
      default:
        break;
    }
    setOpenConfirm(false);
    handleRefresh();
  };

  return (
    <Box sx={{ display: "flex" }} mt={2}>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: 1 }}>
            <ButtonGroup variant="contained">
              <Button onClick={handleClickMarket} disabled={selected === 0}>
                Danh sách
              </Button>
              <Button onClick={handleClickHistory} disabled={selected === 1}>
                Đơn của tôi
              </Button>
            </ButtonGroup>
          </Box>
          <Box>
            <Button onClick={handleRefresh} variant="contained">
              Làm mới
            </Button>
          </Box>
        </Box>
        <Box sx={{ width: 1 }} pt={1}>
          {selected === 0 ? (
            <DataGridView loading={loading} data={list}></DataGridView>
          ) : null}
          {selected === 1 ? (
            <Box>
              <List>
                <ListItem>
                  <Button
                    onClick={handleCreate}
                    fullWidth
                    size="large"
                    variant="contained"
                    startIcon={<AddIcon></AddIcon>}
                  >
                    Tạo mới
                  </Button>
                </ListItem>
                {orders?.map((data, i) => (
                  <ListItem key={i}>
                    <OrderCard
                      data={data}
                      onButtonClick={handleButtonClick}
                    ></OrderCard>
                  </ListItem>
                ))}
              </List>
            </Box>
          ) : null}
        </Box>
      </Box>
      <FormCreate
        open={openCreate}
        handleClose={handleCloseCreate}
        items={items}
      />
      <ConfirmDialog
        open={openConfirm}
        items={items}
        title={dialog.title}
        context={dialog.context}
        handleClose={handleCloseConfirm}
        onAccepted={handleOnAccepted}
      ></ConfirmDialog>
    </Box>
  );
}
