import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import BasicTable from "./layout/BasicTable";
import CardInfo from "./layout/CardInfo";
import ListRole from "./layout/ListRole";
import { Container } from "@mui/system";
import { Button, ButtonGroup, createTheme, ThemeProvider } from "@mui/material";
import { red, orange, green, blue, yellow, grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: blue["500"],
      contrastText: "#fff",
    },
    warning: {
      main: yellow["700"],
      contrastText: "#fff",
    },
    danger: {
      main: orange[900],
      contrastText: "#fff",
    },
    success: {
      main: green["500"],
      contrastText: "#fff",
    },
    error: {
      main: red["A700"],
      contrastText: "#fff",
    },
    action: {
      disabledBackground: grey[800],
      disabled: "#fff",
      contrastText: "#fff",
    },
    background: {
      default: "rgb(46, 46, 46, 0.80)",
      paper: grey["900"],
    },
    text: {
      primary: "#F1F1F1",
      secondary: "#F1F1F1",
    },
    contrastThreshold: 5,
  },
  typography: {
    fontWeightBold: 1000,
    fontWeightMedium: 600,
    fontWeightRegular: 500,
    fontWeightLight: 400,
  },
});

const drawerWidth = 0;
const gangInfo = {
  "total": 10,
  "name": "police",
  "grades": {
    "0": {
      "label": "Học việc",
      "manage": 0,
      "invite": 0,
      "skin_male": "{}",
      "kick": 0,
      "name": "recruit",
      "skin_female": "{}",
      "job_name": "police",
      "salary": 2500,
      "id": 13,
      "grade": 0
    },
    "1": {
      "label": "Hạ sĩ",
      "manage": 0,
      "invite": 0,
      "skin_male": "{}",
      "kick": 0,
      "name": "officer",
      "skin_female": "{}",
      "job_name": "police",
      "salary": 7000,
      "id": 14,
      "grade": 1
    },
    "2": {
      "label": "Trung sĩ",
      "manage": 0,
      "invite": 0,
      "skin_male": "{}",
      "kick": 0,
      "name": "sergeant",
      "skin_female": "{}",
      "job_name": "police",
      "salary": 13000,
      "id": 15,
      "grade": 2
    },
    "3": {
      "label": "Thượng sĩ",
      "manage": 0,
      "invite": 0,
      "skin_male": "{}",
      "kick": 0,
      "name": "lieutenant",
      "skin_female": "{}",
      "job_name": "police",
      "salary": 17000,
      "id": 16,
      "grade": 3
    },
    "99": {
      "label": "Giám đốc công an",
      "manage": 1,
      "invite": 1,
      "skin_male": "{}",
      "kick": 1,
      "name": "boss",
      "skin_female": "{}",
      "job_name": "police",
      "salary": 22000,
      "id": 17,
      "grade": 99
    }
  },
  "whitelisted": true,
  "id": 10,
  "label": "Công An"
}
const playerList = [{"name":"Big Black Chicken","identifier":"steam:110000107c9292c","job":{"name":"police","grade_label":"Giám đốc công an","grade":99,"grade_name":"boss","label":"Công An"}},{"name":"IluvNoobs","identifier":"steam:11000010b107276","job":{"name":"police","grade_label":"Thượng sĩ","grade":3,"grade_name":"lieutenant","label":"Công An"}},{"name":"SWAT | Phi","identifier":"Char1:1100001432240e1","job":{"name":"police","grade_label":"Thượng sĩ","grade":3,"grade_name":"lieutenant","label":"Công An"}},{"name":"a","identifier":"steam:11000010545a672","job":{"name":"police","grade_label":"Trung sĩ","grade":2,"grade_name":"sergeant","label":"Công An"}},{"name":"Fujin","identifier":"steam:110000134ee0f87","job":{"name":"police","grade_label":"Học việc","grade":0,"grade_name":"recruit","label":"Công An"}},{"name":"Ecion","identifier":"steam:11000010c5463be","job":{"name":"police","grade_label":"Học việc","grade":0,"grade_name":"recruit","label":"Công An"}},{"name":"Tharo","identifier":"steam:110000134ca0d80","job":{"name":"police","grade_label":"Học việc","grade":0,"grade_name":"recruit","label":"Công An"}}]

function App(props) {
  const [selected, setSelected] = React.useState(0);

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)'
      }}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <ButtonGroup variant="contained">
                <Button onClick={() => setSelected(0)} disabled={selected === 0}>
                  Thông tin
                </Button>
                <Button onClick={() => setSelected(1)} disabled={selected === 1}>
                  Cấp bậc
                </Button>
                <Button onClick={() => setSelected(2)} disabled={selected === 2}>
                  Thành viên
                </Button>
              </ButtonGroup>
            </Box>
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                Quản lý
              </Typography>
            </Toolbar>
              
          </AppBar>
          <Box sx={{ width: 1 }} pt={12}>
            {selected === 0 ? <CardInfo data={gangInfo}></CardInfo> : null}
            {selected === 1 ? <ListRole data={gangInfo.grades}></ListRole> : null}
            {selected === 2 ? <BasicTable data={playerList} grades={gangInfo.grades}></BasicTable> : null}
          </Box>
          
        </Box>
      </Container>
    </ThemeProvider>
  );
}

App.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default App;
