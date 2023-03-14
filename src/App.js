import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ListPlayer from "./layout/ListPlayer";
import CardInfo from "./layout/CardInfo";
import ListRole from "./layout/ListRole";
import { Container } from "@mui/system";
import { Button, ButtonGroup, createTheme, ThemeProvider, Collapse } from "@mui/material";
import { red, orange, green, blue, yellow, grey } from "@mui/material/colors";
import { useCallback, useEffect, useState } from "react";

const ALLOWED_KEYS = ["Escape"];
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
const dummygangInfo = {
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
const dummyplayerList = [{"name":"Big Black Chicken","identifier":"steam:110000107c9292c","job":{"name":"police","grade_label":"Giám đốc công an","grade":99,"grade_name":"boss","label":"Công An"}},{"name":"IluvNoobs","identifier":"steam:11000010b107276","job":{"name":"police","grade_label":"Thượng sĩ","grade":3,"grade_name":"lieutenant","label":"Công An"}}]

function App(props) {
  const [selected, setSelected] = React.useState(0);
  const [display, setDisplay] = useState(true);
  const [gangInfo, setGangInfo] = useState([]);
  const [playerList, setPlayerList] = useState([]);
  const [pressedKeys, setPressedKeys] = useState([]);
  const [total, setTotal] = useState(0);
  const [myrank, setMyRank] = useState(0);
  const [society_money, setSociety_money] = useState(0);
  const [player_money, setPlayer_money] = useState(0);
  const handleEvent = useCallback((event) => {
    if (event === null) {
      return;
    }
    if (event.data === null) {
      return;
    }
    if (event.data.type === "loadata") {
      setGangInfo(event.data.info);
      setPlayerList(event.data.list);
      setTotal(event.data.total);
      setMyRank(event.data.myrank);
      setSociety_money(event.data.society_money);
      setPlayer_money(event.data.player_money);
    }
    if (event.data.type === "toggle") {
      menuToggle(event.data.state, false);
    }
  }, []);

  // Debug data
  useEffect(() => {
    setGangInfo(dummygangInfo);
    setPlayerList(dummyplayerList);
  }, []);

  useEffect(() => {
    const onKeyDown = ({ key }) => {
      if (ALLOWED_KEYS.includes(key) && !pressedKeys.includes(key)) {
        setPressedKeys((previousPressedKeys) => [...previousPressedKeys, key]);
      }
    };

    const onKeyUp = ({ key }) => {
      if (ALLOWED_KEYS.includes(key)) {
        setPressedKeys((previousPressedKeys) =>
          previousPressedKeys.filter((k) => k !== key)
        );
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener("message", handleEvent);
    return () => {
      window.removeEventListener("message", handleEvent);
    };
  }, [handleEvent]);

  useEffect(() => {
    if (pressedKeys.includes("Escape")) {
      menuToggle(false, true);
    }
  }, [pressedKeys]);

  const menuToggle = (state, send) => {
    setDisplay(state);
    if (send) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: state }),
      };
      fetch("https://esx_society/closeui", requestOptions);
    }
  };

  return (
    <Collapse in={display} timeout={0}>
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
              {selected === 0 ? <CardInfo data={gangInfo} total={total} society_money={society_money} player_money={player_money} society={gangInfo.name}></CardInfo> : null}
              {selected === 1 ? <ListRole data={gangInfo.grades} society={gangInfo.name}></ListRole> : null}
              {selected === 2 ? <ListPlayer data={playerList} grades={gangInfo.grades} society={gangInfo.name}></ListPlayer> : null}
            </Box>
            
          </Box>
        </Container>
      </ThemeProvider>
    </Collapse>
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
