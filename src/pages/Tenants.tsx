import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

// Mock data for tenants
const tenantsData = [
  { 
    id: 101, 
    name: 'John Smith', 
    unit: '101', 
    property: '317 Linden St',
    propertyId: 1,
    leaseStart: '2023-01-01',
    leaseEnd: '2023-12-31', 
    rent: 1300,
    status: 'Active',
    phone: '570-555-1234',
    email: 'john.smith@example.com',
    moveInDate: '2023-01-01',
    securityDeposit: 1300,
    paymentHistory: [
      { month: 'January', status: 'Paid', date: '2023-01-03' },
      { month: 'February', status: 'Paid', date: '2023-02-02' },
      { month: 'March', status: 'Paid', date: '2023-03-01' },
      { month: 'April', status: 'Paid', date: '2023-04-03' },
      { month: 'May', status: 'Paid', date: '2023-05-02' },
      { month: 'June', status: 'Paid', date: '2023-06-01' },
      { month: 'July', status: 'Paid', date: '2023-07-03' },
      { month: 'August', status: 'Paid', date: '2023-08-02' },
    ],
  },
  { 
    id: 102, 
    name: 'Sarah Johnson', 
    unit: '102', 
    property: '317 Linden St',
    propertyId: 1,
    leaseStart: '2022-10-15',
    leaseEnd: '2023-10-15', 
    rent: 1250,
    status: 'Active',
    phone: '570-555-2345',
    email: 'sarah.johnson@example.com',
    moveInDate: '2022-10-15',
    securityDeposit: 1250,
    paymentHistory: [
      { month: 'January', status: 'Paid', date: '2023-01-05' },
      { month: 'February', status: 'Paid', date: '2023-02-04' },
      { month: 'March', status: 'Paid', date: '2023-03-03' },
      { month: 'April', status: 'Paid', date: '2023-04-05' },
      { month: 'May', status: 'Paid', date: '2023-05-04' },
      { month: 'June', status: 'Paid', date: '2023-06-03' },
      { month: 'July', status: 'Paid', date: '2023-07-05' },
      { month: 'August', status: 'Late', date: '2023-08-08' },
    ],
  },
  { 
    id: 201, 
    name: 'William Johnson', 
    unit: '101', 
    property: '134 Franklin Ave',
    propertyId: 2,
    leaseStart: '2022-12-01',
    leaseEnd: '2023-11-30', 
    rent: 1350,
    status: 'Active',
    phone: '570-555-3456',
    email: 'william.johnson@example.com',
    moveInDate: '2022-12-01',
    securityDeposit: 1350,
    paymentHistory: [
      { month: 'January', status: 'Paid', date: '2023-01-02' },
      { month: 'February', status: 'Paid', date: '2023-02-01' },
      { month: 'March', status: 'Paid', date: '2023-03-02' },
      { month: 'April', status: 'Paid', date: '2023-04-03' },
      { month: 'May', status: 'Paid', date: '2023-05-02' },
      { month: 'June', status: 'Paid', date: '2023-06-01' },
      { month: 'July', status: 'Paid', date: '2023-07-03' },
      { month: 'August', status: 'Paid', date: '2023-08-02' },
    ],
  },
  { 
    id: 301, 
    name: 'Richard Brown', 
    unit: '101', 
    property: '614 Wyoming Ave',
    propertyId: 3,
    leaseStart: '2023-02-15',
    leaseEnd: '2024-02-15', 
    rent: 1400,
    status: 'Active',
    phone: '570-555-4567',
    email: 'richard.brown@example.com',
    moveInDate: '2023-02-15',
    securityDeposit: 1400,
    paymentHistory: [
      { month: 'March', status: 'Paid', date: '2023-03-02' },
      { month: 'April', status: 'Paid', date: '2023-04-03' },
      { month: 'May', status: 'Paid', date: '2023-05-02' },
      { month: 'June', status: 'Paid', date: '2023-06-01' },
      { month: 'July', status: 'Paid', date: '2023-07-03' },
      { month: 'August', status: 'Unpaid', date: '' },
    ],
  },
  { 
    id: 313, 
    name: 'Scranton Retail Co.', 
    unit: 'C101', 
    property: '614 Wyoming Ave',
    propertyId: 3,
    leaseStart: '2020-07-01',
    leaseEnd: '2025-06-30', 
    rent: 2500,
    status: 'Active',
    phone: '570-555-7890',
    email: 'info@scrantonretail.com',
    moveInDate: '2020-07-01',
    securityDeposit: 5000,
    commercial: true,
    paymentHistory: [
      { month: 'January', status: 'Paid', date: '2023-01-01' },
      { month: 'February', status: 'Paid', date: '2023-02-01' },
      { month: 'March', status: 'Paid', date: '2023-03-01' },
      { month: 'April', status: 'Paid', date: '2023-04-01' },
      { month: 'May', status: 'Paid', date: '2023-05-01' },
      { month: 'June', status: 'Paid', date: '2023-06-01' },
      { month: 'July', status: 'Paid', date: '2023-07-01' },
      { month: 'August', status: 'Paid', date: '2023-08-01' },
    ],
  },
];

const Tenants: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterProperty, setFilterProperty] = useState('all');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAddDialogOpen = () => {
    setOpenAddDialog(true);
  };

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
  };

  const handleFilterStatusChange = (event: any) => {
    setFilterStatus(event.target.value);
  };

  const handleFilterPropertyChange = (event: any) => {
    setFilterProperty(event.target.value);
  };

  const filteredTenants = tenantsData.filter((tenant) => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.property.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || tenant.status === filterStatus;
    const matchesProperty = filterProperty === 'all' || tenant.property === filterProperty;
    
    return matchesSearch && matchesStatus && matchesProperty;
  });

  // Get unique properties for filter
  const properties = [...new Set(tenantsData.map(tenant => tenant.property))];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Tenants
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddDialogOpen}
        >
          Add Tenant
        </Button>
      </Box>

      <Box sx={{ display: 'flex', mb: 3, gap: 2 }}>
        <TextField
          fullWidth
          placeholder="Search by name, unit, or property"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="tenant-status-filter-label">Status</InputLabel>
          <Select
            labelId="tenant-status-filter-label"
            id="tenant-status-filter"
            value={filterStatus}
            label="Status"
            onChange={handleFilterStatusChange}
          >
            <MenuItem value="all">All Statuses</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Late">Late Payment</MenuItem>
            <MenuItem value="Notice">Given Notice</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="tenant-property-filter-label">Property</InputLabel>
          <Select
            labelId="tenant-property-filter-label"
            id="tenant-property-filter"
            value={filterProperty}
            label="Property"
            onChange={handleFilterPropertyChange}
          >
            <MenuItem value="all">All Properties</MenuItem>
            {properties.map((property) => (
              <MenuItem key={property} value={property}>{property}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Card>
        <List>
          {filteredTenants.map((tenant) => (
            <React.Fragment key={tenant.id}>
              <ListItem 
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
                onClick={() => navigate(`/tenants/${tenant.id}`)}
              >
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={tenant.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {tenant.property} • Unit {tenant.unit}
                      </Typography>
                      {tenant.commercial ? ' — Commercial Tenant' : ''}
                      <br />
                      Lease: {tenant.leaseStart} to {tenant.leaseEnd} • Rent: ${tenant.rent}/month
                    </React.Fragment>
                  }
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <Chip 
                    label={new Date(tenant.leaseEnd) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? "Lease Ending Soon" : "Active Lease"} 
                    color={new Date(tenant.leaseEnd) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? "warning" : "success"} 
                    size="small" 
                    sx={{ mb: 1 }}
                  />
                  {tenant.paymentHistory && tenant.paymentHistory.length > 0 && (
                    <Chip 
                      label={`${tenant.paymentHistory[tenant.paymentHistory.length - 1].month}: ${tenant.paymentHistory[tenant.paymentHistory.length - 1].status}`} 
                      color={
                        tenant.paymentHistory[tenant.paymentHistory.length - 1].status === 'Paid' ? "success" : 
                        tenant.paymentHistory[tenant.paymentHistory.length - 1].status === 'Late' ? "warning" : 
                        "error"
                      } 
                      size="small" 
                    />
                  )}
                </Box>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Card>

      {/* Add Tenant Dialog */}
      <Dialog open={openAddDialog} onClose={handleAddDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Add New Tenant</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField label="Full Name" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Email" type="email" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Phone Number" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Property</InputLabel>
                <Select label="Property">
                  {properties.map((property) => (
                    <MenuItem key={property} value={property}>{property}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Unit Number" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Monthly Rent" type="number" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Lease Start Date"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Lease End Date"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Security Deposit" type="number" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Tenant Type</InputLabel>
                <Select label="Tenant Type">
                  <MenuItem value="residential">Residential</MenuItem>
                  <MenuItem value="commercial">Commercial</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleAddDialogClose}>
            Add Tenant
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Tenants;
