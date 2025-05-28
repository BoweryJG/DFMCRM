import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Chip,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Badge,
  Divider,
  Switch,
  Tabs,
  Tab,
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import NotificationsIcon from '@mui/icons-material/Notifications';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BuildIcon from '@mui/icons-material/Build';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteIcon from '@mui/icons-material/Delete';

// Alert types
type AlertType = 'urgent' | 'warning' | 'info' | 'success';
type AlertCategory = 'lease' | 'maintenance' | 'payment' | 'general';

interface Alert {
  id: number;
  type: AlertType;
  category: AlertCategory;
  title: string;
  description: string;
  property?: string;
  unit?: string;
  timestamp: string;
  read: boolean;
}

// Mock alerts data
const alertsData: Alert[] = [
  {
    id: 1,
    type: 'urgent',
    category: 'lease',
    title: 'Lease Expiring Soon',
    description: 'Lease for Unit 204 expires in 30 days. Contact tenant for renewal.',
    property: 'Miller Lofts',
    unit: '204',
    timestamp: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    type: 'urgent',
    category: 'maintenance',
    title: 'Urgent Maintenance Request',
    description: 'AC not working in Unit 312. Tenant reports temperature above 85°F.',
    property: '317 Linden St',
    unit: '312',
    timestamp: '3 hours ago',
    read: false,
  },
  {
    id: 3,
    type: 'warning',
    category: 'payment',
    title: 'Late Rent Payment',
    description: 'Rent payment overdue by 5 days.',
    property: '134 Franklin Ave',
    unit: '105',
    timestamp: '1 day ago',
    read: false,
  },
  {
    id: 4,
    type: 'info',
    category: 'general',
    title: 'Property Inspection Scheduled',
    description: 'Annual safety inspection scheduled for next Tuesday at 10 AM.',
    property: 'The Oakford',
    timestamp: '1 day ago',
    read: true,
  },
  {
    id: 5,
    type: 'success',
    category: 'payment',
    title: 'Large Payment Received',
    description: 'Monthly rent payment of $45,000 received from Watres Armory tenant.',
    property: 'Watres Armory',
    timestamp: '2 days ago',
    read: true,
  },
  {
    id: 6,
    type: 'warning',
    category: 'lease',
    title: 'Multiple Leases Expiring',
    description: '3 leases expiring in the next 60 days. Review and prepare renewals.',
    property: '317 Linden St',
    timestamp: '3 days ago',
    read: true,
  },
  {
    id: 7,
    type: 'info',
    category: 'maintenance',
    title: 'Maintenance Completed',
    description: 'HVAC repair completed successfully. Invoice: $450.',
    property: 'The Oakford',
    unit: '208',
    timestamp: '4 days ago',
    read: true,
  },
];

// Notification preferences
const notificationSettings = [
  { category: 'Lease Expirations', enabled: true, description: 'Get notified 30, 60, and 90 days before lease expiry' },
  { category: 'Maintenance Requests', enabled: true, description: 'Urgent maintenance issues and updates' },
  { category: 'Payment Alerts', enabled: true, description: 'Late payments and large transactions' },
  { category: 'Property Updates', enabled: false, description: 'General property news and updates' },
  { category: 'System Notifications', enabled: true, description: 'System updates and important notices' },
];

const Alerts: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [alerts, setAlerts] = useState(alertsData);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const getAlertIcon = (type: AlertType) => {
    switch (type) {
      case 'urgent': return <WarningIcon />;
      case 'warning': return <InfoIcon />;
      case 'info': return <NotificationsIcon />;
      case 'success': return <CheckCircleIcon />;
    }
  };

  const getAlertColor = (type: AlertType) => {
    switch (type) {
      case 'urgent': return '#f44336';
      case 'warning': return '#ff9800';
      case 'info': return '#2196f3';
      case 'success': return '#4caf50';
    }
  };

  const getCategoryIcon = (category: AlertCategory) => {
    switch (category) {
      case 'lease': return <CalendarTodayIcon />;
      case 'maintenance': return <BuildIcon />;
      case 'payment': return <AttachMoneyIcon />;
      case 'general': return <InfoIcon />;
    }
  };

  const markAsRead = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map(alert => ({ ...alert, read: true })));
  };

  const deleteAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const unreadCount = alerts.filter(a => !a.read).length;
  const urgentCount = alerts.filter(a => a.type === 'urgent' && !a.read).length;

  const filteredAlerts = selectedTab === 0 
    ? alerts 
    : selectedTab === 1 
    ? alerts.filter(a => !a.read)
    : alerts.filter(a => a.type === 'urgent');

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1e3a5f', mb: 1 }}>
            Alerts & Notifications
          </Typography>
          <Typography variant="h6" sx={{ color: '#666' }}>
            Stay informed about important property events
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined" 
            startIcon={<DoneAllIcon />}
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark All Read
          </Button>
        </Box>
      </Box>

      {/* Alert Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 3, textAlign: 'center', backgroundColor: unreadCount > 0 ? '#fff3e0' : 'white' }}>
            <Badge badgeContent={unreadCount} color="warning">
              <NotificationsIcon sx={{ fontSize: 40, color: '#ff9800', mb: 1 }} />
            </Badge>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{unreadCount}</Typography>
            <Typography variant="body2" color="text.secondary">Unread Alerts</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 3, textAlign: 'center', backgroundColor: urgentCount > 0 ? '#ffebee' : 'white' }}>
            <Badge badgeContent={urgentCount} color="error">
              <WarningIcon sx={{ fontSize: 40, color: '#f44336', mb: 1 }} />
            </Badge>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{urgentCount}</Typography>
            <Typography variant="body2" color="text.secondary">Urgent Items</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 3, textAlign: 'center' }}>
            <CheckCircleIcon sx={{ fontSize: 40, color: '#4caf50', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{alerts.length}</Typography>
            <Typography variant="body2" color="text.secondary">Total Alerts</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Alerts List */}
        <Grid item xs={12} md={8}>
          <Card>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={selectedTab} onChange={handleTabChange}>
                <Tab label={`All Alerts (${alerts.length})`} />
                <Tab label={`Unread (${unreadCount})`} />
                <Tab label={`Urgent (${urgentCount})`} />
              </Tabs>
            </Box>
            <List sx={{ p: 0 }}>
              {filteredAlerts.map((alert, index) => (
                <React.Fragment key={alert.id}>
                  <ListItem
                    sx={{
                      px: 3,
                      py: 2,
                      backgroundColor: alert.read ? 'transparent' : 'rgba(33, 150, 243, 0.04)',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: getAlertColor(alert.type) }}>
                        {getAlertIcon(alert.type)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography 
                            variant="subtitle1" 
                            sx={{ fontWeight: alert.read ? 'normal' : 'bold' }}
                          >
                            {alert.title}
                          </Typography>
                          {!alert.read && (
                            <Chip label="New" size="small" color="primary" />
                          )}
                          <Chip 
                            icon={getCategoryIcon(alert.category)} 
                            label={alert.category} 
                            size="small" 
                            variant="outlined"
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            {alert.description}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {alert.property && `${alert.property}`}
                            {alert.unit && ` - Unit ${alert.unit}`}
                            {' • '}
                            {alert.timestamp}
                          </Typography>
                        </Box>
                      }
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {!alert.read && (
                        <IconButton 
                          size="small" 
                          onClick={() => markAsRead(alert.id)}
                          sx={{ color: 'primary.main' }}
                        >
                          <DoneAllIcon />
                        </IconButton>
                      )}
                      <IconButton 
                        size="small" 
                        onClick={() => deleteAlert(alert.id)}
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </ListItem>
                  {index < filteredAlerts.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Card>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Notification Settings
            </Typography>
            <List sx={{ p: 0 }}>
              {notificationSettings.map((setting, index) => (
                <React.Fragment key={setting.category}>
                  <ListItem sx={{ px: 0, py: 1 }}>
                    <ListItemText
                      primary={setting.category}
                      secondary={setting.description}
                      primaryTypographyProps={{ fontWeight: 'medium' }}
                    />
                    <Switch defaultChecked={setting.enabled} />
                  </ListItem>
                  {index < notificationSettings.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            <Button 
              fullWidth 
              variant="contained" 
              sx={{ mt: 3, backgroundColor: '#1e3a5f' }}
            >
              Save Settings
            </Button>
          </Card>

          {/* Quick Stats */}
          <Card sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Alert Summary (30 Days)
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Lease Alerts</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {alerts.filter(a => a.category === 'lease').length}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Maintenance Alerts</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {alerts.filter(a => a.category === 'maintenance').length}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Payment Alerts</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {alerts.filter(a => a.category === 'payment').length}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">General Alerts</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {alerts.filter(a => a.category === 'general').length}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Alerts;