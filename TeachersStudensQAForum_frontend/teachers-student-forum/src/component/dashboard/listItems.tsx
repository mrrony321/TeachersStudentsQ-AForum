import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import ViewListIcon from '@mui/icons-material/ViewList';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { Dashboard, ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List } from '@mui/material';


export default function ListItems() {
  const [openBookingOpt, setOpenBookingOpt] = React.useState(false);
  const [openTurfMgtOpt, setOpenTurfMgtOpt] = React.useState(false);
  const [openReportsOpt, setOpenReportsOpt] = React.useState(false);

  const handleClick = (event : any) => {
    const textContent = event.target.innerText

    switch (textContent) {
      case 'Turf Management':
        setOpenTurfMgtOpt(!openTurfMgtOpt);
        break;
      case 'Booking':
        setOpenBookingOpt(!openBookingOpt);
        break;
      case 'Reports':
        setOpenReportsOpt(!openReportsOpt);
        break;
      default:
        break;
    }
  };

  return (
    (
      <React.Fragment>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Booking" />
            {openBookingOpt ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openBookingOpt} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={handleClick}>
                <ListItemIcon>
                  <HistoryIcon />
                </ListItemIcon>
                <ListItemText primary="Booking History" />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }} onClick={handleClick}>
                <ListItemIcon>
                  <UpcomingIcon />
                </ListItemIcon>
                <ListItemText primary="Upcoming Booking" />
              </ListItemButton>
            </List>
          </Collapse>
          
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <ViewListIcon />
            </ListItemIcon>
            <ListItemText primary="Turf List" />
          </ListItemButton>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <Diversity3Icon />
            </ListItemIcon>
            <ListItemText primary="Turf Management" />
            {openTurfMgtOpt ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openTurfMgtOpt} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={handleClick}>
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Add User" />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }} onClick={handleClick}>
                <ListItemIcon>
                  <ViewListIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }} onClick={handleClick}>
                <ListItemIcon>
                  <PermMediaIcon />
                </ListItemIcon>
                <ListItemText primary="Turf Gallery" />
              </ListItemButton>
            </List>
          </Collapse>
          
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <AnalyticsIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
            {openReportsOpt ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openReportsOpt} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={handleClick}>
                <ListItemIcon>
                  <AnalyticsIcon />
                </ListItemIcon>
                <ListItemText primary="Booking Report" />
              </ListItemButton>

              <ListItemButton sx={{ pl: 4 }} onClick={handleClick}>
                <ListItemIcon>
                  <AnalyticsIcon />
                </ListItemIcon>
                <ListItemText primary="Payment Report" />
              </ListItemButton>
            </List>
          </Collapse>

      </React.Fragment>
    )

  );
}


