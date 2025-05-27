import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Report templates
const reportTemplates = [
  {
    id: 1,
    name: 'Monthly Financial Summary',
    description: 'Comprehensive P&L, revenue by property, expense breakdown',
    icon: <AccountBalanceIcon />,
    lastGenerated: '2024-01-15',
    frequency: 'Monthly',
  },
  {
    id: 2,
    name: 'Occupancy Report',
    description: 'Occupancy rates, vacant units, lease expiration forecast',
    icon: <AssessmentIcon />,
    lastGenerated: '2024-01-20',
    frequency: 'Weekly',
  },
  {
    id: 3,
    name: 'Maintenance Summary',
    description: 'Maintenance costs, vendor performance, request status',
    icon: <ReceiptIcon />,
    lastGenerated: '2024-01-18',
    frequency: 'Monthly',
  },
  {
    id: 4,
    name: 'Rent Roll Report',
    description: 'Current tenants, rent amounts, payment history',
    icon: <DescriptionIcon />,
    lastGenerated: '2024-01-22',
    frequency: 'On-demand',
  },
  {
    id: 5,
    name: 'Annual Tax Report',
    description: 'Income, expenses, depreciation for tax preparation',
    icon: <AccountBalanceIcon />,
    lastGenerated: '2023-12-31',
    frequency: 'Annual',
  },
];

// Recent reports
const recentReports = [
  { name: 'January 2024 Financial Summary', date: '2024-01-15', size: '2.4 MB', type: 'Financial' },
  { name: 'Q4 2023 Performance Report', date: '2024-01-10', size: '5.8 MB', type: 'Performance' },
  { name: 'Occupancy Report - Week 3', date: '2024-01-20', size: '1.2 MB', type: 'Occupancy' },
  { name: 'December Maintenance Summary', date: '2024-01-05', size: '3.1 MB', type: 'Maintenance' },
  { name: '2023 Annual Report', date: '2024-01-01', size: '12.5 MB', type: 'Annual' },
];

// Key metrics for quick view
const keyMetrics = {
  ytdRevenue: 312000,
  ytdExpenses: 78000,
  netIncome: 234000,
  avgOccupancy: 94,
  totalUnits: 240,
  vacantUnits: 14,
  maintenanceYTD: 35000,
  collectionRate: 98.5,
};

// Property performance data
const propertyData = [
  { name: '317 Linden', revenue: 72000, expenses: 15000, noi: 57000 },
  { name: 'Miller Lofts', revenue: 65000, expenses: 12000, noi: 53000 },
  { name: 'Watres Armory', revenue: 45000, expenses: 8000, noi: 37000 },
  { name: '327 N Wash', revenue: 42000, expenses: 9000, noi: 33000 },
  { name: 'The Oakford', revenue: 36000, expenses: 7500, noi: 28500 },
];

// Expense categories
const expenseData = [
  { name: 'Maintenance', value: 35, color: '#ff9800' },
  { name: 'Property Tax', value: 23, color: '#f44336' },
  { name: 'Insurance', value: 15, color: '#9c27b0' },
  { name: 'Utilities', value: 10, color: '#3f51b5' },
  { name: 'Management', value: 6, color: '#009688' },
  { name: 'Other', value: 11, color: '#607d8b' },
];

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedProperty, setSelectedProperty] = useState('all');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1e3a5f', mb: 1 }}>
          Reports & Analytics
        </Typography>
        <Typography variant="h6" sx={{ color: '#666' }}>
          Generate and view comprehensive property reports
        </Typography>
      </Box>

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Quick Report Generation
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Report Type</InputLabel>
                  <Select defaultValue="financial" label="Report Type">
                    <MenuItem value="financial">Financial Summary</MenuItem>
                    <MenuItem value="occupancy">Occupancy Report</MenuItem>
                    <MenuItem value="maintenance">Maintenance Report</MenuItem>
                    <MenuItem value="rentroll">Rent Roll</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Period</InputLabel>
                  <Select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)} label="Period">
                    <MenuItem value="month">This Month</MenuItem>
                    <MenuItem value="quarter">This Quarter</MenuItem>
                    <MenuItem value="year">This Year</MenuItem>
                    <MenuItem value="custom">Custom Range</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Property</InputLabel>
                  <Select value={selectedProperty} onChange={(e) => setSelectedProperty(e.target.value)} label="Property">
                    <MenuItem value="all">All Properties</MenuItem>
                    <MenuItem value="linden">317 Linden St</MenuItem>
                    <MenuItem value="miller">Miller Lofts</MenuItem>
                    <MenuItem value="franklin">134 Franklin Ave</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button variant="contained" startIcon={<AssessmentIcon />} sx={{ backgroundColor: '#1e3a5f' }}>
                Generate Report
              </Button>
              <Button variant="outlined" startIcon={<CalendarTodayIcon />}>
                Schedule Report
              </Button>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, height: '100%', backgroundColor: '#1e3a5f', color: 'white' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Quick Stats
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>YTD Revenue</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {formatCurrency(keyMetrics.ytdRevenue)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Net Income</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {formatCurrency(keyMetrics.netIncome)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Occupancy</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {keyMetrics.avgOccupancy}%
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Collection Rate</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {keyMetrics.collectionRate}%
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Property Performance - Net Operating Income
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={propertyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip formatter={(value: any) => formatCurrency(value)} />
                <Bar dataKey="revenue" fill="#4caf50" name="Revenue" />
                <Bar dataKey="expenses" fill="#ff9800" name="Expenses" />
                <Bar dataKey="noi" fill="#2196f3" name="NOI" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Expense Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>

      {/* Report Templates and Recent Reports */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <Box sx={{ p: 3, borderBottom: '1px solid #eee' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Report Templates
              </Typography>
            </Box>
            <List>
              {reportTemplates.map((template, index) => (
                <ListItem key={template.id} sx={{ borderBottom: index < reportTemplates.length - 1 ? '1px solid #eee' : 'none' }}>
                  <ListItemIcon>
                    {template.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={template.name}
                    secondary={
                      <Box>
                        <Typography variant="body2">{template.description}</Typography>
                        <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                          <Chip label={template.frequency} size="small" />
                          <Typography variant="caption" color="text.secondary">
                            Last: {template.lastGenerated}
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" sx={{ mr: 1 }}>
                      <DownloadIcon />
                    </IconButton>
                    <IconButton edge="end">
                      <EmailIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <Box sx={{ p: 3, borderBottom: '1px solid #eee' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Recent Reports
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Report Name</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentReports.map((report) => (
                    <TableRow key={report.name}>
                      <TableCell>
                        <Box>
                          <Typography variant="body2">{report.name}</Typography>
                          <Chip label={report.type} size="small" variant="outlined" />
                        </Box>
                      </TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{report.size}</TableCell>
                      <TableCell align="center">
                        <IconButton size="small">
                          <DownloadIcon />
                        </IconButton>
                        <IconButton size="small">
                          <PrintIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reports;