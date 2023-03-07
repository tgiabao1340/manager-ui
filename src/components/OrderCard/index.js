import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ButtonGroup } from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import IosShareIcon from "@mui/icons-material/IosShare";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

export default function OrderCard(props) {
  const { data, onButtonClick } = props;
  const { name, item, label, count, price, stock, money, status } = data;
  return (
    <Card variant="elevation" sx={{ display: "flex", width: 1 }}>
      <CardMedia
        component="img"
        sx={{
          height: "128px",
          width: "128px",
          objectFit: "contain",
        }}
        image={item ? `https://cdn.anhchiem.xyz/img/items/${item}.png` : ""}
        alt={`${item}`}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Số lượng: {stock}/{count}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Người bán: {name}
          </Typography>
          <Typography variant="title" color="text.primary">
            Tiền nhận: {money.toLocaleString("en-US") + "$"}
          </Typography>
        </CardContent>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 0.5 }}>
        <Typography variant="h5" color="green" align="center" m={4}>
          Giá: {price?.toLocaleString("en-US") + "$"}
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 0.3 }}>
        <CardActions sx={{ height: 1 }}>
          <Box width={1}>
            <ButtonGroup
              disableElevation
              variant="contained"
              fullWidth
              orientation="vertical"
              size="large"
            >
              {[0].includes(status) ? (
                <Button
                  color="primary"
                  startIcon={<IosShareIcon />}
                  onClick={() => {
                    onButtonClick({ action: "put", data: data });
                  }}
                >
                  Nộp Item
                </Button>
              ) : null}
              {[1, 2].includes(status) ? (
                <Button
                  color="success"
                  startIcon={<MoveToInboxIcon />}
                  onClick={() => {
                    onButtonClick({ action: "withdraw", data: data });
                  }}
                >
                  Rút tiền
                </Button>
              ) : null}
              {[0, 2].includes(status) ? (
                <Button
                  color="secondary"
                  startIcon={<SaveAltIcon />}
                  onClick={() => {
                    onButtonClick({ action: "getItem", data: data });
                  }}
                >
                  Rút Item
                </Button>
              ) : null}
              {[1].includes(status) ? (
                <Button
                  color="error"
                  startIcon={<ClearIcon />}
                  onClick={() => {
                    onButtonClick({ action: "cancel", data: data });
                  }}
                >
                  Hủy đăng
                </Button>
              ) : null}
              {[0, 2].includes(status) ? (
                <Button
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    onButtonClick({ action: "delete", data: data });
                  }}
                >
                  Xóa
                </Button>
              ) : null}
              {![0, 1, 2].includes(status) ? (
                <Button color="error" disabled>
                  Đang cập nhật
                </Button>
              ) : null}
            </ButtonGroup>
          </Box>
        </CardActions>
      </Box>
    </Card>
  );
}
