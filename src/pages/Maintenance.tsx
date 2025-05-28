import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Chip,
  Button,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import BuildIcon from '@mui/icons-material/Build';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import HandymanIcon from '@mui/icons-material/Handyman';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// Maintenance request data
const maintenanceRequests = [
  {
    id: 1,
    property: '317 Linden St',
    unit: '312',
    tenant: 'Sarah Johnson',
    issue: 'AC not cooling properly',
    category: 'HVAC',
    priority: 'urgent',
    status: 'in-progress',
    dateReported: '2024-01-20',
    assignedTo: 'Mike\'s HVAC Services',
    estimatedCost: 350,
    notes: 'Technician scheduled for tomorrow 2PM'
  },
  {
    id: 2,
    property: 'Miller Lofts',
    unit: '204',
    tenant: 'John Smith',
    issue: 'Leaking kitchen faucet',
    category: 'Plumbing',
    priority: 'medium',
    status: 'pending',
    dateReported: '2024-01-22',
    assignedTo: null,
    estimatedCost: 150,
    notes: 'Tenant available weekends only'
  },
  {
    id: 3,
    property: '134 Franklin Ave',
    unit: '105',
    tenant: 'William Davis',
    issue: 'Broken light fixture in bathroom',
    category: 'Electrical',
    priority: 'low',
    status: 'scheduled',
    dateReported: '2024-01-18',
    assignedTo: 'Scranton Electric Co.',
    estimatedCost: 120,
    notes: 'Scheduled for next Wednesday'
  },
  {
    id: 4,
    property: 'People\'s Security',
    unit: '301',
    tenant: 'Tech Startup LLC',
    issue: 'Office door lock malfunction',
    category: 'General',
    priority: 'urgent',
    status: 'pending',
    dateReported: '2024-01-23',
    assignedTo: null,
    estimatedCost: 200,
    notes: 'Security concern - needs immediate attention'
  },
  {
    id: 5,
    property: 'The Oakford',
    unit: '208',
    tenant: 'Emily Chen',
    issue: 'Heating system not working',
    category: 'HVAC',
    priority: 'urgent',
    status: 'completed',
    dateReported: '2024-01-15',
    assignedTo: 'Mike\'s HVAC Services',
    estimatedCost: 450,
    notes: 'Repaired on 1/16 - new thermostat installed'
  },
];

// Vendor/contractor data
const vendors = [
  { name: 'Mike\'s HVAC Services', specialty: 'HVAC', rating: 4.8, jobs: 45 },
  { name: 'Scranton Electric Co.', specialty: 'Electrical', rating: 4.6, jobs: 32 },
  { name: 'Pro Plumbing Solutions', specialty: 'Plumbing', rating: 4.7, jobs: 28 },
  { name: 'HandyPro Services', specialty: 'General', rating: 4.5, jobs: 67 },
];

const Maintenance: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openNewRequest, setOpenNewRequest] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'primary';
      case 'scheduled': return 'info';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return '#f44336';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#9e9e9e';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'HVAC': return <AcUnitIcon />;
      case 'Plumbing': return <PlumbingIcon />;
      case 'Electrical': return <ElectricalServicesIcon />;
      default: return <HandymanIcon />;
    }
  };

  const filteredRequests = maintenanceRequests.filter(request => {
    const statusMatch = filterStatus === 'all' || request.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || request.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  // Summary statistics
  const stats = {
    total: maintenanceRequests.length,
    urgent: maintenanceRequests.filter(r => r.priority === 'urgent').length,
    pending: maintenanceRequests.filter(r => r.status === 'pending').length,
    inProgress: maintenanceRequests.filter(r => r.status === 'in-progress').length,
    completed: maintenanceRequests.filter(r => r.status === 'completed').length,
    totalCost: maintenanceRequests.reduce((sum, r) => sum + r.estimatedCost, 0),
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1e3a5f', mb: 1 }}>
          Maintenance Management
        </Typography>
        <Typography variant="h6" sx={{ color: '#666' }}>
          Track and manage all property maintenance requests
        </Typography>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, textAlign: 'center' }}>
            <BuildIcon sx={{ fontSize: 40, color: '#1e3a5f', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{stats.total}</Typography>
            <Typography variant="body2" color="text.secondary">Total Requests</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, textAlign: 'center', backgroundColor: '#fff3e0' }}>
            <PriorityHighIcon sx={{ fontSize: 40, color: '#ff9800', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ff9800' }}>{stats.urgent}</Typography>
            <Typography variant="body2" color="text.secondary">Urgent Items</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, textAlign: 'center' }}>
            <ScheduleIcon sx={{ fontSize: 40, color: '#2196f3', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{stats.pending}</Typography>
            <Typography variant="body2" color="text.secondary">Pending Assignment</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, textAlign: 'center' }}>
            <AttachMoneyIcon sx={{ fontSize: 40, color: '#4caf50', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>${stats.totalCost}</Typography>
            <Typography variant="body2" color="text.secondary">Estimated Costs</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Filters and Actions */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Status Filter</InputLabel>
          <Select
            value={filterStatus}
            label="Status Filter"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="scheduled">Scheduled</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Priority Filter</InputLabel>
          <Select
            value={filterPriority}
            label="Priority Filter"
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <MenuItem value="all">All Priorities</MenuItem>
            <MenuItem value="urgent">Urgent</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenNewRequest(true)}
          sx={{ 
            backgroundColor: '#1e3a5f',
            '&:hover': {
              backgroundColor: '#2d4a6f'
            }
          }}
        >
          New Request
        </Button>
      </Box>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Maintenance Requests List */}
        <Grid item xs={12} md={8}>
          <Card sx={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Active Maintenance Requests
              </Typography>
            </Box>
            <List sx={{ p: 0 }}>
              {filteredRequests.map((request, index) => (
                <React.Fragment key={request.id}>
                  <ListItem
                    sx={{
                      px: 3,
                      py: 2,
                      '&:hover': {
                        backgroundColor: '#f5f5f5'
                      }
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: getPriorityColor(request.priority) }}>
                        {getCategoryIcon(request.category)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {request.property} - Unit {request.unit}
                          </Typography>
                          <Chip 
                            label={request.status} 
                            size="small" 
                            color={getStatusColor(request.status) as any}
                          />
                          {request.priority === 'urgent' && (
                            <Chip 
                              icon={<PriorityHighIcon />}
                              label="Urgent" 
                              size="small" 
                              color="error"
                            />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            {request.issue}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Tenant: {request.tenant} • Reported: {request.dateReported}
                            {request.assignedTo && ` • Assigned to: ${request.assignedTo}`}
                          </Typography>
                          {request.notes && (
                            <Typography variant="body2" sx={{ mt: 0.5, color: '#666' }}>
                              📝 {request.notes}
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6" sx={{ color: '#1e3a5f' }}>
                        ${request.estimatedCost}
                      </Typography>
                      <IconButton onClick={(e) => handleMenuOpen(e)}>
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  </ListItem>
                  {index < filteredRequests.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Card>
        </Grid>

        {/* Vendor List */}
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 3 }}>
            <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Preferred Vendors
              </Typography>
            </Box>
            <List sx={{ p: 0 }}>
              {vendors.map((vendor, index) => (
                <React.Fragment key={vendor.name}>
                  <ListItem sx={{ px: 3, py: 2 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: '#1e3a5f' }}>
                        {getCategoryIcon(vendor.specialty)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={vendor.name}
                      secondary={
                        <Box>
                          <Typography variant="body2">{vendor.specialty}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2">⭐ {vendor.rating}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              • {vendor.jobs} jobs
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < vendors.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Card>

          {/* Quick Status Overview */}
          <Card sx={{ p: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Status Overview
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Completed</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {stats.completed}/{stats.total}
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={(stats.completed / stats.total) * 100} 
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">In Progress</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {stats.inProgress}/{stats.total}
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={(stats.inProgress / stats.total) * 100} 
                sx={{ height: 8, borderRadius: 4 }}
                color="primary"
              />
            </Box>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Pending</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {stats.pending}/{stats.total}
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={(stats.pending / stats.total) * 100} 
                sx={{ height: 8, borderRadius: 4 }}
                color="warning"
              />
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
        <MenuItem onClick={handleMenuClose}>Assign Vendor</MenuItem>
        <MenuItem onClick={handleMenuClose}>Update Status</MenuItem>
        <MenuItem onClick={handleMenuClose}>Edit Request</MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          Cancel Request
        </MenuItem>
      </Menu>

      {/* New Request Dialog */}
      <Dialog open={openNewRequest} onClose={() => setOpenNewRequest(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Maintenance Request</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Property</InputLabel>
                <Select label="Property">
                  <MenuItem value="317 Linden St">317 Linden St</MenuItem>
                  <MenuItem value="Miller Lofts">Miller Lofts (614 Wyoming)</MenuItem>
                  <MenuItem value="134 Franklin Ave">134 Franklin Ave</MenuItem>
                  <MenuItem value="People's Security">People's Security Bank</MenuItem>
                  <MenuItem value="The Oakford">The Oakford</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Unit Number" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Issue Description" multiline rows={3} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select label="Category">
                  <MenuItem value="HVAC">HVAC</MenuItem>
                  <MenuItem value="Plumbing">Plumbing</MenuItem>
                  <MenuItem value="Electrical">Electrical</MenuItem>
                  <MenuItem value="General">General</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select label="Priority">
                  <MenuItem value="urgent">Urgent</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Estimated Cost" type="number" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Tenant Name" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Notes" multiline rows={2} fullWidth />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewRequest(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenNewRequest(false)}>
            Create Request
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Maintenance;