import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import BuildIcon from '@mui/icons-material/Build';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventIcon from '@mui/icons-material/Event';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Mock data for property details
const propertyData = {
  1: {
    id: 1,
    address: '317 Linden St',
    city: 'Scranton',
    state: 'PA',
    zipCode: '18503',
    units: 12,
    occupancyRate: 92,
    monthlyRevenue: 15600,
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    type: 'Apartment Building',
    constructionYear: 1985,
    lastRenovation: 2018,
    squareFeet: 10500,
    parkingSpaces: 8,
    amenities: ['Laundry Room', 'Storage Units', 'Security System'],
    description: 'A well-maintained apartment building in downtown Scranton with 12 units. The building features modern amenities and has been recently renovated.',
    tenants: [
      { id: 101, name: 'John Smith', unit: '101', leaseEnd: '2023-12-31', rent: 1300 },
      { id: 102, name: 'Sarah Johnson', unit: '102', leaseEnd: '2023-10-15', rent: 1250 },
      { id: 103, name: 'Michael Brown', unit: '103', leaseEnd: '2024-02-28', rent: 1300 },
      { id: 104, name: 'Emily Davis', unit: '104', leaseEnd: '2023-11-30', rent: 1350 },
      { id: 105, name: 'Robert Wilson', unit: '201', leaseEnd: '2024-01-15', rent: 1400 },
      { id: 106, name: 'Jennifer Lee', unit: '202', leaseEnd: '2023-09-30', rent: 1250 },
      { id: 107, name: 'David Martinez', unit: '203', leaseEnd: '2024-03-31', rent: 1300 },
      { id: 108, name: 'Lisa Anderson', unit: '204', leaseEnd: '2023-12-15', rent: 1350 },
      { id: 109, name: 'James Taylor', unit: '301', leaseEnd: '2024-02-15', rent: 1400 },
      { id: 110, name: 'Patricia Garcia', unit: '302', leaseEnd: '2023-10-31', rent: 1250 },
      { id: 111, name: 'Thomas Rodriguez', unit: '303', leaseEnd: '2024-01-31', rent: 1300 },
    ],
    maintenanceRequests: [
      { id: 201, unit: '102', description: 'Leaking faucet in bathroom', status: 'Open', date: '2023-08-15' },
      { id: 202, unit: '204', description: 'Broken dishwasher', status: 'In Progress', date: '2023-08-10' },
      { id: 203, unit: '301', description: 'HVAC not cooling properly', status: 'Completed', date: '2023-07-28' },
    ],
    financials: {
      monthlyIncome: 15600,
      monthlyExpenses: 6200,
      netOperatingIncome: 9400,
      annualReturn: 7.2,
      propertyValue: 1560000,
      mortgage: 950000,
      equity: 610000,
    },
    occupancyHistory: [
      { month: 'Jan', occupancy: 83 },
      { month: 'Feb', occupancy: 83 },
      { month: 'Mar', occupancy: 92 },
      { month: 'Apr', occupancy: 92 },
      { month: 'May', occupancy: 92 },
      { month: 'Jun', occupancy: 92 },
    ],
    revenueHistory: [
      { month: 'Jan', revenue: 13650 },
      { month: 'Feb', revenue: 13650 },
      { month: 'Mar', revenue: 15600 },
      { month: 'Apr', revenue: 15600 },
      { month: 'May', revenue: 15600 },
      { month: 'Jun', revenue: 15600 },
    ],
  },
  2: {
    id: 2,
    address: '134 Franklin Ave',
    city: 'Scranton',
    state: 'PA',
    zipCode: '18503',
    units: 8,
    occupancyRate: 100,
    monthlyRevenue: 10400,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    type: 'Apartment Building',
    constructionYear: 1992,
    lastRenovation: 2020,
    squareFeet: 7200,
    parkingSpaces: 6,
    amenities: ['Laundry Room', 'Rooftop Deck', 'Security System', 'Bike Storage'],
    description: 'A modern apartment building in downtown Scranton with 8 units. The building features premium amenities and has been recently renovated with high-end finishes.',
    tenants: [
      { id: 201, name: 'William Johnson', unit: '101', leaseEnd: '2023-11-30', rent: 1350 },
      { id: 202, name: 'Amanda Miller', unit: '102', leaseEnd: '2024-01-15', rent: 1300 },
      { id: 203, name: 'Christopher Davis', unit: '103', leaseEnd: '2023-12-31', rent: 1350 },
      { id: 204, name: 'Jessica Wilson', unit: '104', leaseEnd: '2024-02-28', rent: 1300 },
      { id: 205, name: 'Daniel Thompson', unit: '201', leaseEnd: '2023-10-15', rent: 1350 },
      { id: 206, name: 'Michelle Garcia', unit: '202', leaseEnd: '2024-03-31', rent: 1300 },
      { id: 207, name: 'Kevin Martinez', unit: '203', leaseEnd: '2023-09-30', rent: 1250 },
      { id: 208, name: 'Laura Anderson', unit: '204', leaseEnd: '2024-01-31', rent: 1200 },
    ],
    maintenanceRequests: [
      { id: 301, unit: '103', description: 'Clogged kitchen sink', status: 'Completed', date: '2023-08-05' },
      { id: 302, unit: '201', description: 'Broken window blinds', status: 'Open', date: '2023-08-12' },
    ],
    financials: {
      monthlyIncome: 10400,
      monthlyExpenses: 4100,
      netOperatingIncome: 6300,
      annualReturn: 6.8,
      propertyValue: 1120000,
      mortgage: 680000,
      equity: 440000,
    },
    occupancyHistory: [
      { month: 'Jan', occupancy: 100 },
      { month: 'Feb', occupancy: 100 },
      { month: 'Mar', occupancy: 100 },
      { month: 'Apr', occupancy: 100 },
      { month: 'May', occupancy: 100 },
      { month: 'Jun', occupancy: 100 },
    ],
    revenueHistory: [
      { month: 'Jan', revenue: 10400 },
      { month: 'Feb', revenue: 10400 },
      { month: 'Mar', revenue: 10400 },
      { month: 'Apr', revenue: 10400 },
      { month: 'May', revenue: 10400 },
      { month: 'Jun', revenue: 10400 },
    ],
  },
  3: {
    id: 3,
    address: '614 Wyoming Ave',
    city: 'Scranton',
    state: 'PA',
    zipCode: '18509',
    units: 15,
    occupancyRate: 87,
    monthlyRevenue: 18200,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    type: 'Mixed-Use Building',
    constructionYear: 1978,
    lastRenovation: 2015,
    squareFeet: 14500,
    parkingSpaces: 12,
    amenities: ['Elevator', 'Security System', 'Commercial Space', 'Storage Units'],
    description: 'A mixed-use building in Scranton with retail spaces on the ground floor and residential units above. The building has been well-maintained and offers a variety of amenities.',
    tenants: [
      { id: 301, name: 'Richard Brown', unit: '101', leaseEnd: '2024-02-15', rent: 1400 },
      { id: 302, name: 'Susan Wilson', unit: '102', leaseEnd: '2023-11-30', rent: 1350 },
      { id: 303, name: 'Joseph Davis', unit: '103', leaseEnd: '2023-12-31', rent: 1300 },
      { id: 304, name: 'Nancy Garcia', unit: '104', leaseEnd: '2024-01-15', rent: 1250 },
      { id: 305, name: 'Charles Martinez', unit: '201', leaseEnd: '2023-10-15', rent: 1400 },
      { id: 306, name: 'Margaret Anderson', unit: '202', leaseEnd: '2024-03-31', rent: 1350 },
      { id: 307, name: 'Thomas Taylor', unit: '203', leaseEnd: '2023-09-30', rent: 1300 },
      { id: 308, name: 'Betty Johnson', unit: '204', leaseEnd: '2024-01-31', rent: 1250 },
      { id: 309, name: 'Robert Smith', unit: '301', leaseEnd: '2023-12-15', rent: 1400 },
      { id: 310, name: 'Linda Miller', unit: '302', leaseEnd: '2024-02-28', rent: 1350 },
      { id: 311, name: 'James Wilson', unit: '303', leaseEnd: '2023-10-31', rent: 1300 },
      { id: 312, name: 'Patricia Davis', unit: '304', leaseEnd: '2024-01-15', rent: 1250 },
      { id: 313, name: 'Scranton Retail Co.', unit: 'C101', leaseEnd: '2025-06-30', rent: 2500, commercial: true },
    ],
    maintenanceRequests: [
      { id: 401, unit: '102', description: 'Water damage on ceiling', status: 'In Progress', date: '2023-08-08' },
      { id: 402, unit: '204', description: 'Broken garbage disposal', status: 'Open', date: '2023-08-14' },
      { id: 403, unit: '301', description: 'Bathroom fan not working', status: 'Completed', date: '2023-08-01' },
      { id: 404, unit: 'C101', description: 'Storefront window crack', status: 'Open', date: '2023-08-10' },
    ],
    financials: {
      monthlyIncome: 18200,
      monthlyExpenses: 7800,
      netOperatingIncome: 10400,
      annualReturn: 6.5,
      propertyValue: 1920000,
      mortgage: 1150000,
      equity: 770000,
    },
    occupancyHistory: [
      { month: 'Jan', occupancy: 80 },
      { month: 'Feb', occupancy: 80 },
      { month: 'Mar', occupancy: 87 },
      { month: 'Apr', occupancy: 87 },
      { month: 'May', occupancy: 87 },
      { month: 'Jun', occupancy: 87 },
    ],
    revenueHistory: [
      { month: 'Jan', revenue: 16800 },
      { month: 'Feb', revenue: 16800 },
      { month: 'Mar', revenue: 18200 },
      { month: 'Apr', revenue: 18200 },
      { month: 'May', revenue: 18200 },
      { month: 'Jun', revenue: 18200 },
    ],
  },
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`property-tabpanel-${index}`}
      aria-labelledby={`property-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tabValue, setTabValue] = useState(0);
  const property = propertyData[Number(id) as keyof typeof propertyData];

  if (!property) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5">Property not found</Typography>
      </Box>
    );
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {property.address}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
        >
          Edit Property
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <img 
              src={property.image} 
              alt={property.address} 
              style={{ width: '100%', borderRadius: '8px', maxHeight: '300px', objectFit: 'cover' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>Property Details</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Address</Typography>
                  <Typography variant="body1">{property.address}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">City, State, Zip</Typography>
                  <Typography variant="body1">{property.city}, {property.state} {property.zipCode}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Property Type</Typography>
                  <Typography variant="body1">{property.type}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Units</Typography>
                  <Typography variant="body1">{property.units}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Square Feet</Typography>
                  <Typography variant="body1">{property.squareFeet.toLocaleString()}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Parking Spaces</Typography>
                  <Typography variant="body1">{property.parkingSpaces}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Construction Year</Typography>
                  <Typography variant="body1">{property.constructionYear}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Last Renovation</Typography>
                  <Typography variant="body1">{property.lastRenovation}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Amenities</Typography>
                  <Box sx={{ mt: 1 }}>
                    {property.amenities.map((amenity, index) => (
                      <Chip 
                        key={index} 
                        label={amenity} 
                        size="small" 
                        sx={{ mr: 1, mb: 1 }} 
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="property tabs">
            <Tab label="Overview" />
            <Tab label="Tenants" />
            <Tab label="Maintenance" />
            <Tab label="Financials" />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom>Occupancy Rate (%)</Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={property.occupancyHistory} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="occupancy" stroke="#8884d8" strokeWidth={2} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom>Monthly Revenue ($)</Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={property.revenueHistory} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Bar dataKey="revenue" fill="#82ca9d" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Property Description</Typography>
                <Typography variant="body1">{property.description}</Typography>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Paper>
            <List>
              {property.tenants.map((tenant) => (
                <React.Fragment key={tenant.id}>
                  <ListItem 
                    button 
                    alignItems="flex-start"
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
                            Unit {tenant.unit}
                          </Typography>
                          {tenant.commercial ? ' — Commercial Tenant' : ''}
                          <br />
                          Lease ends: {tenant.leaseEnd} • Rent: ${tenant.rent}/month
                        </React.Fragment>
                      }
                    />
                    <Chip 
                      label={new Date(tenant.leaseEnd) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? "Lease Ending Soon" : "Active Lease"} 
                      color={new Date(tenant.leaseEnd) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? "warning" : "success"} 
                      size="small" 
                      sx={{ ml: 2 }}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Paper>
            <List>
              {property.maintenanceRequests.map((request) => (
                <React.Fragment key={request.id}>
                  <ListItem 
                    button 
                    alignItems="flex-start"
                    onClick={() => navigate(`/maintenance/${request.id}`)}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <BuildIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`Unit ${request.unit}: ${request.description}`}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Reported: {request.date}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    <Chip 
                      label={request.status} 
                      color={
                        request.status === 'Open' ? "error" : 
                        request.status === 'In Progress' ? "warning" : 
                        "success"
                      } 
                      size="small" 
                      sx={{ ml: 2 }}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Monthly Financial Summary" />
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'success.main' }}>
                          <AttachMoneyIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Monthly Income" 
                        secondary={`$${property.financials.monthlyIncome.toLocaleString()}`} 
                        secondaryTypographyProps={{ sx: { fontWeight: 'bold', color: 'success.main' } }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'error.main' }}>
                          <AttachMoneyIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Monthly Expenses" 
                        secondary={`$${property.financials.monthlyExpenses.toLocaleString()}`} 
                        secondaryTypographyProps={{ sx: { fontWeight: 'bold', color: 'error.main' } }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'info.main' }}>
                          <AttachMoneyIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Net Operating Income" 
                        secondary={`$${property.financials.netOperatingIncome.toLocaleString()}`} 
                        secondaryTypographyProps={{ sx: { fontWeight: 'bold', color: 'info.main' } }}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Property Value & Mortgage" />
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <AttachMoneyIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Property Value" 
                        secondary={`$${property.financials.propertyValue.toLocaleString()}`} 
                        secondaryTypographyProps={{ sx: { fontWeight: 'bold' } }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'warning.main' }}>
                          <AttachMoneyIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Mortgage Balance" 
                        secondary={`$${property.financials.mortgage.toLocaleString()}`} 
                        secondaryTypographyProps={{ sx: { fontWeight: 'bold' } }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'success.main' }}>
                          <AttachMoneyIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Equity" 
                        secondary={`$${property.financials.equity.toLocaleString()}`} 
                        secondaryTypographyProps={{ sx: { fontWeight: 'bold', color: 'success.main' } }}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardHeader 
                  title="Investment Performance" 
                  subheader={`Annual Return: ${property.financials.annualReturn}%`}
                />
                <CardContent>
                  <Typography variant="body1">
                    This property is generating a {property.financials.annualReturn}% annual return on investment, 
                    with a monthly net operating income of ${property.financials.netOperatingIncome.toLocaleString()}.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default PropertyDetails;
