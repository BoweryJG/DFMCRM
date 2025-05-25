import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Stack,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventIcon from '@mui/icons-material/Event';
import ReceiptIcon from '@mui/icons-material/Receipt';
import BuildIcon from '@mui/icons-material/Build';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define tenant types
interface BaseTenant {
  id: number;
  name: string;
  unit: string;
  property: string;
  propertyId: number;
  leaseStart: string;
  leaseEnd: string;
  rent: number;
  status: string;
  phone: string;
  email: string;
  moveInDate: string;
  securityDeposit: number;
  documents: {
    name: string;
    date: string;
    type: string;
  }[];
  paymentHistory: {
    month: string;
    status: string;
    date: string;
    amount: number;
  }[];
  maintenanceRequests: {
    id: number;
    description: string;
    status: string;
    date: string;
    priority: string;
  }[];
}

interface ResidentialTenant extends BaseTenant {
  commercial?: false;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  occupants: number;
  pets: string;
  notes?: string;
}

interface CommercialTenant extends BaseTenant {
  commercial: true;
  businessType: string;
  businessHours: string;
  contactPerson: string;
  contactPosition: string;
  notes?: string;
}

type Tenant = ResidentialTenant | CommercialTenant;

// Type guard to check if tenant is commercial
function isCommercialTenant(tenant: Tenant): tenant is CommercialTenant {
  return (tenant as CommercialTenant).commercial === true;
}

// Mock data for tenant details
const tenantsData: Record<number, Tenant> = {
  101: { 
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
    emergencyContact: {
      name: 'Mary Smith',
      relationship: 'Wife',
      phone: '570-555-5678',
    },
    occupants: 2,
    pets: 'None',
    notes: 'Tenant has been reliable with payments. Prefers communication via email.',
    documents: [
      { name: 'Lease Agreement', date: '2022-12-15', type: 'PDF' },
      { name: 'Background Check', date: '2022-12-10', type: 'PDF' },
      { name: 'Security Deposit Receipt', date: '2022-12-28', type: 'PDF' },
    ],
    paymentHistory: [
      { month: 'January', status: 'Paid', date: '2023-01-03', amount: 1300 },
      { month: 'February', status: 'Paid', date: '2023-02-02', amount: 1300 },
      { month: 'March', status: 'Paid', date: '2023-03-01', amount: 1300 },
      { month: 'April', status: 'Paid', date: '2023-04-03', amount: 1300 },
      { month: 'May', status: 'Paid', date: '2023-05-02', amount: 1300 },
      { month: 'June', status: 'Paid', date: '2023-06-01', amount: 1300 },
      { month: 'July', status: 'Paid', date: '2023-07-03', amount: 1300 },
      { month: 'August', status: 'Paid', date: '2023-08-02', amount: 1300 },
    ],
    maintenanceRequests: [
      { id: 201, description: 'Leaking faucet in bathroom', status: 'Open', date: '2023-08-15', priority: 'Medium' },
      { id: 101, description: 'Light bulb replacement in kitchen', status: 'Completed', date: '2023-06-10', priority: 'Low' },
    ],
  },
  102: { 
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
    emergencyContact: {
      name: 'Robert Johnson',
      relationship: 'Father',
      phone: '570-555-6789',
    },
    occupants: 1,
    pets: 'Cat',
    notes: 'Tenant has been occasionally late with payments. Prefers communication via phone.',
    documents: [
      { name: 'Lease Agreement', date: '2022-10-01', type: 'PDF' },
      { name: 'Background Check', date: '2022-09-25', type: 'PDF' },
      { name: 'Security Deposit Receipt', date: '2022-10-10', type: 'PDF' },
      { name: 'Pet Addendum', date: '2022-10-01', type: 'PDF' },
    ],
    paymentHistory: [
      { month: 'January', status: 'Paid', date: '2023-01-05', amount: 1250 },
      { month: 'February', status: 'Paid', date: '2023-02-04', amount: 1250 },
      { month: 'March', status: 'Paid', date: '2023-03-03', amount: 1250 },
      { month: 'April', status: 'Paid', date: '2023-04-05', amount: 1250 },
      { month: 'May', status: 'Paid', date: '2023-05-04', amount: 1250 },
      { month: 'June', status: 'Paid', date: '2023-06-03', amount: 1250 },
      { month: 'July', status: 'Paid', date: '2023-07-05', amount: 1250 },
      { month: 'August', status: 'Late', date: '2023-08-08', amount: 1250 },
    ],
    maintenanceRequests: [
      { id: 202, description: 'Broken dishwasher', status: 'In Progress', date: '2023-08-10', priority: 'High' },
    ],
  },
  313: { 
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
    businessType: 'Retail Store',
    businessHours: 'Mon-Sat: 10am-8pm, Sun: 12pm-6pm',
    contactPerson: 'Michael Scott',
    contactPosition: 'Store Manager',
    documents: [
      { name: 'Commercial Lease Agreement', date: '2020-06-15', type: 'PDF' },
      { name: 'Business License', date: '2020-06-20', type: 'PDF' },
      { name: 'Insurance Certificate', date: '2023-01-05', type: 'PDF' },
      { name: 'Signage Approval', date: '2020-06-25', type: 'PDF' },
    ],
    paymentHistory: [
      { month: 'January', status: 'Paid', date: '2023-01-01', amount: 2500 },
      { month: 'February', status: 'Paid', date: '2023-02-01', amount: 2500 },
      { month: 'March', status: 'Paid', date: '2023-03-01', amount: 2500 },
      { month: 'April', status: 'Paid', date: '2023-04-01', amount: 2500 },
      { month: 'May', status: 'Paid', date: '2023-05-01', amount: 2500 },
      { month: 'June', status: 'Paid', date: '2023-06-01', amount: 2500 },
      { month: 'July', status: 'Paid', date: '2023-07-01', amount: 2500 },
      { month: 'August', status: 'Paid', date: '2023-08-01', amount: 2500 },
    ],
    maintenanceRequests: [
      { id: 404, description: 'Storefront window crack', status: 'Open', date: '2023-08-10', priority: 'High' },
      { id: 350, description: 'HVAC maintenance', status: 'Completed', date: '2023-05-15', priority: 'Medium' },
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
      id={`tenant-tabpanel-${index}`}
      aria-labelledby={`tenant-tab-${index}`}
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

const TenantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [openMaintenanceDialog, setOpenMaintenanceDialog] = useState(false);
  
  const tenant = tenantsData[Number(id) as keyof typeof tenantsData];

  if (!tenant) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5">Tenant not found</Typography>
      </Box>
    );
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handlePaymentDialogOpen = () => {
    setOpenPaymentDialog(true);
  };

  const handlePaymentDialogClose = () => {
    setOpenPaymentDialog(false);
  };

  const handleMaintenanceDialogOpen = () => {
    setOpenMaintenanceDialog(true);
  };

  const handleMaintenanceDialogClose = () => {
    setOpenMaintenanceDialog(false);
  };

  // Generate payment chart data
  const paymentChartData = tenant.paymentHistory.map(payment => ({
    month: payment.month,
    amount: payment.amount,
    status: payment.status,
  }));

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {tenant.name}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
        >
          Edit Tenant
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap' }}>
          <Box sx={{ width: { xs: '100%', md: '32%' } }}>
            <Card>
              <CardHeader 
                avatar={
                  <Avatar sx={{ bgcolor: isCommercialTenant(tenant) ? 'secondary.main' : 'primary.main' }}>
                    {isCommercialTenant(tenant) ? 'C' : tenant.name.charAt(0)}
                  </Avatar>
                }
                title={tenant.name}
                subheader={isCommercialTenant(tenant) ? 'Commercial Tenant' : 'Residential Tenant'}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Property:</strong> {tenant.property}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Unit:</strong> {tenant.unit}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Phone:</strong> {tenant.phone}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Email:</strong> {tenant.email}
                </Typography>
                {isCommercialTenant(tenant) ? (
                  <>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Business Type:</strong> {tenant.businessType}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Contact Person:</strong> {tenant.contactPerson}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Occupants:</strong> {tenant.occupants}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Pets:</strong> {tenant.pets}
                    </Typography>
                  </>
                )}
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ width: { xs: '100%', md: '32%' } }}>
            <Card>
              <CardHeader 
                avatar={
                  <Avatar sx={{ bgcolor: 'info.main' }}>
                    <EventIcon />
                  </Avatar>
                }
                title="Lease Information"
                subheader={`Status: ${tenant.status}`}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Lease Period:</strong> {tenant.leaseStart} to {tenant.leaseEnd}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Monthly Rent:</strong> ${tenant.rent}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Security Deposit:</strong> ${tenant.securityDeposit}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Move-in Date:</strong> {tenant.moveInDate}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip 
                    label={new Date(tenant.leaseEnd) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? "Lease Ending Soon" : "Active Lease"} 
                    color={new Date(tenant.leaseEnd) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? "warning" : "success"} 
                    size="small" 
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ width: { xs: '100%', md: '32%' } }}>
            <Card>
              <CardHeader 
                avatar={
                  <Avatar sx={{ bgcolor: 'success.main' }}>
                    <AttachMoneyIcon />
                  </Avatar>
                }
                title="Payment Status"
                subheader={tenant.paymentHistory && tenant.paymentHistory.length > 0 ? 
                  `Last Payment: ${tenant.paymentHistory[tenant.paymentHistory.length - 1].month}` : 
                  'No payment history'
                }
              />
              <CardContent>
                {tenant.paymentHistory && tenant.paymentHistory.length > 0 && (
                  <>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Last Payment Date:</strong> {tenant.paymentHistory[tenant.paymentHistory.length - 1].date}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Last Payment Amount:</strong> ${tenant.paymentHistory[tenant.paymentHistory.length - 1].amount}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Payment Status:</strong> {tenant.paymentHistory[tenant.paymentHistory.length - 1].status}
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                      <Chip 
                        label={tenant.paymentHistory[tenant.paymentHistory.length - 1].status} 
                        color={
                          tenant.paymentHistory[tenant.paymentHistory.length - 1].status === 'Paid' ? "success" : 
                          tenant.paymentHistory[tenant.paymentHistory.length - 1].status === 'Late' ? "warning" : 
                          "error"
                        } 
                        size="small" 
                      />
                      <Button 
                        size="small" 
                        variant="outlined" 
                        color="primary"
                        onClick={handlePaymentDialogOpen}
                      >
                        Record Payment
                      </Button>
                    </Box>
                  </>
                )}
              </CardContent>
            </Card>
          </Box>
        </Stack>
      </Box>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="tenant tabs">
            <Tab label="Overview" />
            <Tab label="Payment History" />
            <Tab label="Maintenance" />
            <Tab label="Documents" />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap' }}>
            <Box sx={{ width: { xs: '100%', md: '48%' } }}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Tenant Information</Typography>
                {isCommercialTenant(tenant) ? (
                  <>
                    <Typography variant="body1" gutterBottom>
                      <strong>Business Type:</strong> {tenant.businessType}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>Business Hours:</strong> {tenant.businessHours}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>Contact Person:</strong> {tenant.contactPerson}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>Contact Position:</strong> {tenant.contactPosition}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="body1" gutterBottom>
                      <strong>Emergency Contact:</strong> {tenant.emergencyContact?.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>Relationship:</strong> {tenant.emergencyContact?.relationship}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>Emergency Phone:</strong> {tenant.emergencyContact?.phone}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>Occupants:</strong> {tenant.occupants}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>Pets:</strong> {tenant.pets}
                    </Typography>
                  </>
                )}
              </Paper>
            </Box>
            <Box sx={{ width: { xs: '100%', md: '48%' } }}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Property Information</Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Property:</strong> {tenant.property}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Unit:</strong> {tenant.unit}
                </Typography>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  startIcon={<HomeIcon />}
                  onClick={() => navigate(`/properties/${tenant.propertyId}`)}
                  sx={{ mt: 2 }}
                >
                  View Property Details
                </Button>
              </Paper>
            </Box>
            {tenant.notes && (
              <Box sx={{ width: '100%', mt: 3 }}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>Notes</Typography>
                  <Typography variant="body1">{tenant.notes}</Typography>
                </Paper>
              </Box>
            )}
          </Stack>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Payment History</Typography>
            <Button 
              variant="contained" 
              color="primary"
              startIcon={<AttachMoneyIcon />}
              onClick={handlePaymentDialogOpen}
            >
              Record Payment
            </Button>
          </Box>
          <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap' }}>
            <Box sx={{ width: { xs: '100%', md: '66%' } }}>
              <Paper sx={{ p: 2, height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={paymentChartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Box>
            <Box sx={{ width: { xs: '100%', md: '30%' } }}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>Payment Summary</Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Monthly Rent:</strong> ${tenant.rent}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Security Deposit:</strong> ${tenant.securityDeposit}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Total Payments:</strong> ${tenant.paymentHistory.reduce((sum, payment) => sum + payment.amount, 0)}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Payment Status:</strong> {tenant.paymentHistory[tenant.paymentHistory.length - 1].status}
                </Typography>
              </Paper>
            </Box>
            <Box sx={{ width: '100%', mt: 3 }}>
              <Paper>
                <List>
                  {tenant.paymentHistory.map((payment, index) => (
                    <React.Fragment key={index}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ 
                            bgcolor: payment.status === 'Paid' ? 'success.main' : 
                                    payment.status === 'Late' ? 'warning.main' : 
                                    'error.main' 
                          }}>
                            <ReceiptIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${payment.month} - $${payment.amount}`}
                          secondary={`Date: ${payment.date || 'Not paid'} • Status: ${payment.status}`}
                        />
                        <Chip 
                          label={payment.status} 
                          color={
                            payment.status === 'Paid' ? "success" : 
                            payment.status === 'Late' ? "warning" : 
                            "error"
                          } 
                          size="small" 
                        />
                      </ListItem>
                      {index < tenant.paymentHistory.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Box>
          </Stack>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Maintenance Requests</Typography>
            <Button 
              variant="contained" 
              color="primary"
              startIcon={<BuildIcon />}
              onClick={handleMaintenanceDialogOpen}
            >
              New Maintenance Request
            </Button>
          </Box>
          {tenant.maintenanceRequests && tenant.maintenanceRequests.length > 0 ? (
            <Paper>
              <List>
                {tenant.maintenanceRequests.map((request, index) => (
                  <React.Fragment key={request.id}>
                    <ListItem
                      sx={{ 
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        },
                      }}
                      onClick={() => navigate(`/maintenance/${request.id}`)}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ 
                          bgcolor: request.status === 'Open' ? 'error.main' : 
                                  request.status === 'In Progress' ? 'warning.main' : 
                                  'success.main' 
                        }}>
                          <BuildIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={request.description}
                        secondary={`Date: ${request.date} • Priority: ${request.priority}`}
                      />
                      <Chip 
                        label={request.status} 
                        color={
                          request.status === 'Open' ? "error" : 
                          request.status === 'In Progress' ? "warning" : 
                          "success"
                        } 
                        size="small" 
                      />
                    </ListItem>
                    {index < tenant.maintenanceRequests.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          ) : (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1">No maintenance requests found.</Typography>
            </Paper>
          )}
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Documents</Typography>
            <Button 
              variant="contained" 
              color="primary"
            >
              Upload Document
            </Button>
          </Box>
          {tenant.documents && tenant.documents.length > 0 ? (
            <Paper>
              <List>
                {tenant.documents.map((document, index) => (
                  <React.Fragment key={index}>
                    <ListItem
                      sx={{ 
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <EventIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={document.name}
                        secondary={`Date: ${document.date} • Type: ${document.type}`}
                      />
                      <Button size="small" variant="outlined">
                        View
                      </Button>
                    </ListItem>
                    {index < tenant.documents.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          ) : (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1">No documents found.</Typography>
            </Paper>
          )}
        </TabPanel>
      </Box>

      {/* Record Payment Dialog */}
      <Dialog open={openPaymentDialog} onClose={handlePaymentDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Record Payment</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Box>
              <TextField
                label="Amount"
                type="number"
                defaultValue={tenant.rent}
                fullWidth
              />
            </Box>
            <Box>
              <TextField
                label="Payment Date"
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="payment-status-label">Payment Status</InputLabel>
                <Select
                  labelId="payment-status-label"
                  id="payment-status"
                  defaultValue="Paid"
                  label="Payment Status"
                >
                  <MenuItem value="Paid">Paid</MenuItem>
                  <MenuItem value="Late">Late</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePaymentDialogClose}>Cancel</Button>
          <Button onClick={handlePaymentDialogClose} variant="contained" color="primary">
            Save Payment
          </Button>
        </DialogActions>
      </Dialog>

      {/* Maintenance Request Dialog */}
      <Dialog open={openMaintenanceDialog} onClose={handleMaintenanceDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>New Maintenance Request</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Box>
              <TextField
                label="Description"
                multiline
                rows={4}
                fullWidth
                placeholder="Describe the maintenance issue..."
              />
            </Box>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                  labelId="priority-label"
                  id="priority"
                  defaultValue="Medium"
                  label="Priority"
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Emergency">Emergency</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleMaintenanceDialogClose}>Cancel</Button>
          <Button onClick={handleMaintenanceDialogClose} variant="contained" color="primary">
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TenantDetails;
