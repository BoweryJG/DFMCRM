import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PeopleIcon from '@mui/icons-material/People';
import BuildIcon from '@mui/icons-material/Build';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
}

const drawerWidth = 240;

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/', emoji: '🏠' },
  { text: 'Properties', icon: <ApartmentIcon />, path: '/properties', emoji: '🏘️' },
  { text: 'Tenants', icon: <PeopleIcon />, path: '/tenants', emoji: '👥' },
  { text: 'Financials', icon: <AttachMoneyIcon />, path: '/financials', emoji: '💰' },
  { text: 'Maintenance', icon: <BuildIcon />, path: '/maintenance', emoji: '🔧' },
  { text: 'Alerts', icon: <NotificationsIcon />, path: '/alerts', emoji: '🔔' },
  { text: 'Reports', icon: <AssessmentIcon />, path: '/reports', emoji: '📊' },
];

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: open ? drawerWidth : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: (theme) => theme.palette.primary.main,
          color: (theme) => theme.palette.primary.contrastText,
        },
      }}
    >
      <Toolbar sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 3 }}>
        <Typography variant="h4" noWrap component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
          DFM
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Properties
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.7, mt: 0.5 }}>
          Est. 2003
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.path}
              sx={{
                '&.active': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderLeft: '4px solid white',
                  '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                    color: 'white',
                    fontWeight: 'bold',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
                py: 1.5,
                px: 2.5,
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '1.5rem', mr: 1 }}>{item.emoji}</Typography>
                </Box>
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  sx: { fontWeight: 'medium', fontSize: '1rem' } 
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
