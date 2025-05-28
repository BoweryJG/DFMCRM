import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  useTheme,
  useMediaQuery,
  Divider,
  Switch,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  LocationCity as PropertyIcon,
  People as TenantsIcon,
  Build as MaintenanceIcon,
  AttachMoney as FinancialsIcon,
  Assessment as ReportsIcon,
  Notifications as AlertsIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';

const menuItems = [
  { text: 'Dashboard', icon: <HomeIcon />, path: '/' },
  { text: 'Properties', icon: <PropertyIcon />, path: '/properties' },
  { text: 'Tenants', icon: <TenantsIcon />, path: '/tenants' },
  { text: 'Maintenance', icon: <MaintenanceIcon />, path: '/maintenance' },
  { text: 'Financials', icon: <FinancialsIcon />, path: '/financials' },
  { text: 'Reports', icon: <ReportsIcon />, path: '/reports' },
  { text: 'Alerts', icon: <AlertsIcon />, path: '/alerts' },
];

export const Navigation: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useCustomTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
        <Typography variant="h6" noWrap component="div">
          DFM CRM
        </Typography>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="close drawer"
            edge="end"
            onClick={handleDrawerToggle}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Toolbar>
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                  '& .MuiListItemIcon-root': {
                    color: theme.palette.primary.contrastText,
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListItem sx={{ px: 2, py: 2 }}>
        <ListItemIcon>
          {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
        </ListItemIcon>
        <ListItemText primary="Dark Mode" />
        <Switch
          edge="end"
          onChange={toggleDarkMode}
          checked={darkMode}
          inputProps={{
            'aria-labelledby': 'switch-dark-mode',
          }}
        />
      </ListItem>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            width: '100%',
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              DFM CRM
            </Typography>
            <IconButton color="inherit" onClick={toggleDarkMode}>
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
      <Box
        component="nav"
        sx={{ width: { md: 240 }, flexShrink: { md: 0 } }}
        aria-label="navigation"
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
              backgroundColor: theme.palette.background.paper,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};