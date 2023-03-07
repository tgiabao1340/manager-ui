import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import PersonIcon from "@mui/icons-material/Person";

export default function MediaCard(props) {
  const { data, onClickBuy } = props;
  const { name, item, label, count, price, stock } = data;
  return (
    <Card variant="elevation" sx={{ display: "flex", width: 1 }}>
      <Box sx={{ justifyContent: "center" }} p={3}>
        <Box component="div" sx={{ textAlign: "center" }}>
          <PersonIcon sx={{ margin: "0 auto" }}></PersonIcon>
        </Box>
        <div>{name}</div>
      </Box>
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
      <Box sx={{ display: "flex", flexDirection: "column", width: "120px" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Số lượng: {stock}/{count}
          </Typography>
        </CardContent>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
        <Typography variant="h5" color="green" align="center" m={4}>
          {price?.toLocaleString("en-US") + "$"}
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 0.3 }}>
        <CardActions sx={{ height: 1, width: 1 }}>
          <Button
            fullWidth
            variant="contained"
            size="medium"
            sx={{ height: 1 }}
            onClick={() => {
              onClickBuy(data);
            }}
          >
            Mua
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}
