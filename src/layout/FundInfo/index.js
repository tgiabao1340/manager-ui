import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider, Stack } from "@mui/material";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function FundInfo() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Ngân Quỹ
        </Typography>
        <Typography variant="h5" component="div">
          1000000000$
        </Typography>
        <Typography sx={{ mt: 1.5 }} color="text.secondary">
          Túi của bạn
        </Typography>
        <Typography variant="h5" component="div">
          1000000000$
        </Typography>
        <Stack direction="row" spacing={1} pt={1}>
            <Button variant="contained" color="primary">
              Rút
            </Button>
            <Button variant="contained" color="error">
              Gửi
            </Button>
          </Stack>
      </CardContent>
    </Card>
  );
}
