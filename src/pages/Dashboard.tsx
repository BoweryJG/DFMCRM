import React from 'react';
import { Box, Typography, Paper, Card } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BuildIcon from '@mui/icons-material/Build';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const summaryData = [
  { title: 'Total Properties', value: '12', icon: <ApartmentIcon fontSize="large" color="primary" />, color: '#2196f3' },
  { title: 'Total Tenants', value: '150', icon: <PeopleIcon fontSize="large" color="primary" />, color: '#4caf50' },
  { title: 'Monthly Rent', value: '$120,500', icon: <AttachMoneyIcon fontSize="large" color="primary" />, color: '#ff9800' },
  { title: 'Maintenance Requests', value: '8', icon: <BuildIcon fontSize="large" color="primary" />, color: '#f44336' },
];

const occupancyData = [
  { name: 'Jan', occupancy: 85 },
  { name: 'Feb', occupancy: 88 },
  { name: 'Mar', occupancy: 90 },
  { name: 'Apr', occupancy: 92 },
  { name: 'May', occupancy: 95 },
  { name: 'Jun', occupancy: 93 },
];

const revenueData = [
  { name: 'Jan', revenue: 110000 },
  { name: 'Feb', revenue: 115000 },
  { name: 'Mar', revenue: 118000 },
  { name: 'Apr', revenue: 120000 },
  { name: 'May', revenue: 122000 },
  { name: 'Jun', revenue: 120500 },
];

const Dashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {summaryData.map((item, index) => (
          <Grid xs={12} sm={6} md={3} key={index}>
            <Card sx={{ display: 'flex', alignItems: 'center', p: 2, backgroundColor: item.color, color: 'white' }}>
              <Box sx={{ mr: 2 }}>{item.icon}</Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{item.value}</Typography>
                <Typography variant="subtitle1">{item.title}</Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid xs={12} md={6}>
          <Paper sx={{ p: 2, height: 300 }}>
            <Typography variant="h6" gutterBottom>Occupancy Rate (%)</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={occupancyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="occupancy" stroke="#8884d8" strokeWidth={2} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid xs={12} md={6}>
          <Paper sx={{ p: 2, height: 300 }}>
            <Typography variant="h6" gutterBottom>Monthly Revenue ($)</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Bar dataKey="revenue" fill="#82ca9d" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
