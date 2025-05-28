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
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

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
  const { signOut, user } = useAuth();

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
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
      <Toolbar sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        px: 3,
        py: 2.5,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}>
        <Box>
          <Typography 
            variant="h5" 
            noWrap 
            component="div"
            sx={{ 
              fontWeight: 700,
              color: 'primary.main',
              letterSpacing: '-0.5px',
            }}
          >
            DFM
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'text.secondary',
              fontWeight: 500,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}
          >
            Properties CRM
          </Typography>
        </Box>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="close drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ ml: 2 }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Toolbar>
      <List sx={{ flexGrow: 1, px: 2, py: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                borderRadius: 2,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                  transform: 'translateX(4px)',
                },
                '&.Mui-selected': {
                  backgroundColor: theme.palette.mode === 'light' 
                    ? 'rgba(44, 62, 80, 0.08)' 
                    : 'rgba(52, 152, 219, 0.15)',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'light' 
                      ? 'rgba(44, 62, 80, 0.12)' 
                      : 'rgba(52, 152, 219, 0.20)',
                  },
                  '& .MuiListItemIcon-root': {
                    color: theme.palette.primary.main,
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: location.pathname === item.path ? 600 : 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ mx: 2 }} />
      
      {/* User info and settings */}
      <Box sx={{ p: 2 }}>
        {user && (
          <Box sx={{ 
            px: 2, 
            py: 1.5, 
            mb: 1,
            backgroundColor: theme.palette.action.hover,
            borderRadius: 2,
          }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
              {user.email}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Property Manager
            </Typography>
          </Box>
        )}
        
        <ListItem sx={{ px: 2, py: 1 }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
          </ListItemIcon>
          <ListItemText 
            primary="Dark Mode" 
            primaryTypographyProps={{
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          />
          <Switch
            edge="end"
            onChange={toggleDarkMode}
            checked={darkMode}
            size="small"
            inputProps={{
              'aria-labelledby': 'switch-dark-mode',
            }}
          />
        </ListItem>
        
        <ListItemButton
          onClick={signOut}
          sx={{
            mt: 1,
            borderRadius: 2,
            color: 'error.main',
            '&:hover': {
              backgroundColor: 'error.main',
              color: 'error.contrastText',
              '& .MuiListItemIcon-root': {
                color: 'error.contrastText',
              },
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: 'error.main' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Sign Out" 
            primaryTypographyProps={{
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            width: '100%',
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: theme.palette.background.paper,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Toolbar sx={{ px: 2 }}>
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }}>
              <Typography 
                variant="h6" 
                noWrap 
                component="div" 
                sx={{ 
                  fontWeight: 700,
                  color: 'primary.main',
                  letterSpacing: '-0.5px',
                }}
              >
                DFM Properties
              </Typography>
            </Box>
            <IconButton 
              color="primary" 
              onClick={toggleDarkMode}
              sx={{
                backgroundColor: theme.palette.action.hover,
                '&:hover': {
                  backgroundColor: theme.palette.action.selected,
                },
              }}
            >
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