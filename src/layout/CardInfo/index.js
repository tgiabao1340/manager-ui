import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function CardInfo({data}) {
  const {total, label, grades} = data
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Thông tin
        </Typography>
        <Typography variant="h5" component="div">
          Tên guild : {label}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Tổng thành viên: {total}
        </Typography>
        <Typography variant="body2">
          Tổng cấp bậc : {Object.keys(grades).length}
        </Typography>
      </CardContent>
    </Card>
  );
}
