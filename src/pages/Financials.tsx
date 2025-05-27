import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  Chip,
  Button,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend } from 'recharts';

// Financial summary data
const financialSummary = {
  totalRevenue: 3744000, // Annual
  monthlyRevenue: 312000,
  totalExpenses: 892800, // Annual
  netIncome: 2851200, // Annual
  occupancyRate: 94,
  avgRentPerUnit: 1300,
};

// Monthly revenue trend
const revenueHistory = [
  { month: 'Jul', revenue: 285000, expenses: 68000 },
  { month: 'Aug', revenue: 290000, expenses: 72000 },
  { month: 'Sep', revenue: 295000, expenses: 70000 },
  { month: 'Oct', revenue: 302000, expenses: 75000 },
  { month: 'Nov', revenue: 308000, expenses: 74000 },
  { month: 'Dec', revenue: 312000, expenses: 78000 },
];

// Expense breakdown
const expenseBreakdown = [
  { category: 'Maintenance', amount: 35000, color: '#ff9800' },
  { category: 'Property Tax', amount: 18000, color: '#f44336' },
  { category: 'Insurance', amount: 12000, color: '#9c27b0' },
  { category: 'Utilities', amount: 8000, color: '#3f51b5' },
  { category: 'Management', amount: 5000, color: '#009688' },
];

// Recent transactions
const recentTransactions = [
  { id: 1, date: '2024-01-23', type: 'income', property: '317 Linden St', description: 'Rent Collection - Unit 204', amount: 1300, status: 'completed' },
  { id: 2, date: '2024-01-23', type: 'expense', property: 'Miller Lofts', description: 'HVAC Repair - Unit 312', amount: -350, status: 'completed' },
  { id: 3, date: '2024-01-22', type: 'income', property: '134 Franklin Ave', description: 'Rent Collection - Unit 105', amount: 1450, status: 'completed' },
  { id: 4, date: '2024-01-22', type: 'expense', property: 'All Properties', description: 'Property Insurance Premium', amount: -4000, status: 'pending' },
  { id: 5, date: '2024-01-21', type: 'income', property: 'The Oakford', description: 'Rent Collection - Unit 208', amount: 1500, status: 'completed' },
  { id: 6, date: '2024-01-20', type: 'income', property: 'People\'s Security', description: 'Commercial Rent - Tech Startup', amount: 3500, status: 'completed' },
  { id: 7, date: '2024-01-20', type: 'expense', property: '317 Linden St', description: 'Plumbing Service', amount: -200, status: 'completed' },
  { id: 8, date: '2024-01-19', type: 'income', property: 'Watres Armory', description: 'Museum Space Rent', amount: 45000, status: 'completed' },
];

// Property performance
const propertyPerformance = [
  { name: '317 Linden St', revenue: 72000, occupancy: 96 },
  { name: 'Miller Lofts', revenue: 65000, occupancy: 98 },
  { name: 'Watres Armory', revenue: 45000, occupancy: 100 },
  { name: '327 N Washington', revenue: 42000, occupancy: 95 },
  { name: 'The Oakford', revenue: 36000, occupancy: 92 },
  { name: '134 Franklin Ave', revenue: 28000, occupancy: 90 },
  { name: '1100 Penn Ave', revenue: 14000, occupancy: 91 },
];

const Financials: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    return status === 'completed' ? 'success' : 'warning';
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1e3a5f', mb: 1 }}>
            Financial Overview
          </Typography>
          <Typography variant="h6" sx={{ color: '#666' }}>
            DFM Properties Financial Performance • {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<DownloadIcon />}>
            Export Report
          </Button>
          <Button variant="contained" sx={{ backgroundColor: '#1e3a5f' }}>
            Generate P&L
          </Button>
        </Box>
      </Box>

      {/* Key Financial Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AttachMoneyIcon sx={{ fontSize: 30, color: '#4caf50', mr: 1 }} />
              <Typography variant="h6">Monthly Revenue</Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
              {formatCurrency(financialSummary.monthlyRevenue)}
            </Typography>
            <Chip 
              icon={<TrendingUpIcon />} 
              label="+8% vs last month" 
              size="small" 
              sx={{ mt: 1, backgroundColor: '#e8f5e9', color: '#2e7d32' }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AccountBalanceIcon sx={{ fontSize: 30, color: '#1976d2', mr: 1 }} />
              <Typography variant="h6">Net Income (YTD)</Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              {formatCurrency(financialSummary.netIncome)}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              76% profit margin
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ReceiptIcon sx={{ fontSize: 30, color: '#ff9800', mr: 1 }} />
              <Typography variant="h6">Monthly Expenses</Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
              {formatCurrency(78000)}
            </Typography>
            <Chip 
              icon={<TrendingUpIcon />} 
              label="+5% vs last month" 
              size="small" 
              sx={{ mt: 1, backgroundColor: '#fff3e0', color: '#e65100' }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TrendingUpIcon sx={{ fontSize: 30, color: '#9c27b0', mr: 1 }} />
              <Typography variant="h6">Avg Rent/Unit</Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#9c27b0' }}>
              {formatCurrency(financialSummary.avgRentPerUnit)}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {financialSummary.occupancyRate}% occupancy
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Revenue Trend */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Revenue vs Expenses Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                <RechartsTooltip formatter={(value: any) => formatCurrency(value)} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#4caf50" strokeWidth={3} />
                <Line type="monotone" dataKey="expenses" stroke="#ff9800" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Expense Breakdown */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Monthly Expense Breakdown
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.category}: ${formatCurrency(entry.amount)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value: any) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Total Monthly Expenses: {formatCurrency(78000)}
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Property Performance Table */}
      <Card sx={{ mb: 4 }}>
        <Box sx={{ p: 3, borderBottom: '1px solid #eee' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Property Performance
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Property</TableCell>
                <TableCell align="right">Monthly Revenue</TableCell>
                <TableCell align="center">Occupancy</TableCell>
                <TableCell align="right">Revenue per Unit</TableCell>
                <TableCell align="center">Performance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {propertyPerformance.map((property) => (
                <TableRow key={property.name}>
                  <TableCell>{property.name}</TableCell>
                  <TableCell align="right">{formatCurrency(property.revenue)}</TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={`${property.occupancy}%`} 
                      size="small" 
                      color={property.occupancy > 90 ? 'success' : 'warning'}
                    />
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(property.revenue / (property.occupancy / 10))}
                  </TableCell>
                  <TableCell align="center">
                    <LinearProgress 
                      variant="determinate" 
                      value={property.occupancy} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: property.occupancy > 90 ? '#4caf50' : '#ff9800'
                        }
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <Box sx={{ p: 3, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Recent Transactions
          </Typography>
          <Button variant="text">View All</Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Property</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.property}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell align="right" sx={{ 
                    fontWeight: 'bold',
                    color: transaction.amount > 0 ? '#4caf50' : '#f44336' 
                  }}>
                    {formatCurrency(Math.abs(transaction.amount))}
                  </TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={transaction.status} 
                      size="small" 
                      color={getStatusColor(transaction.status) as any}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View Details">
                      <IconButton size="small">
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default Financials;