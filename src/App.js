import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import BasicTable from "./layout/BasicTable";
import FundInfo from "./layout/FundInfo";
import CardInfo from "./layout/CardInfo";
import ListRole from "./layout/ListRole";
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import PaidIcon from '@mui/icons-material/Paid';

const drawerWidth = 240;
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
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              setIndex(0);
            }}
          >
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary={"Thông tin"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              setIndex(1);
            }}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={"Cấp bậc"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              setIndex(2);
            }}
          >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary={"Thành viên"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              setIndex(3);
            }}
          >
            <ListItemIcon>
              <PaidIcon />
            </ListItemIcon>
            <ListItemText primary={"Ngân quỹ"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Quản lý
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {index == 0 ? <CardInfo data={gangInfo}></CardInfo> : null}
        {index == 1 ? <ListRole data={gangInfo.grades}></ListRole> : null}
        {index == 2 ? <BasicTable data={playerList}></BasicTable> : null}
        {index == 3 ? <FundInfo></FundInfo> : null}
      </Box>
    </Box>
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
