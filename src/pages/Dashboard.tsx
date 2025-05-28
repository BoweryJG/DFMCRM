import React, { useState } from 'react';
import { Box, Typography, Card, LinearProgress, Chip } from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import ApartmentIcon from '@mui/icons-material/Apartment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';

const summaryData = [
  { 
    title: 'Properties', 
    value: '9', 
    icon: <ApartmentIcon sx={{ fontSize: 40 }} />, 
    color: '#1e3a5f',
    trend: '+2 this year',
    subtitle: '240+ total units'
  },
  { 
    title: 'Occupancy', 
    value: '94%', 
    icon: <CheckCircleIcon sx={{ fontSize: 40 }} />, 
    color: '#2e7d32',
    trend: '↑ 3% vs last month',
    subtitle: '226 of 240 units'
  },
  { 
    title: 'Monthly Revenue', 
    value: '$312K', 
    icon: <TrendingUpIcon sx={{ fontSize: 40 }} />, 
    color: '#1976d2',
    trend: '↑ 8% YoY',
    subtitle: '$3.74M annually'
  },
  { 
    title: 'Action Items', 
    value: '5', 
    icon: <WarningIcon sx={{ fontSize: 40 }} />, 
    color: '#ed6c02',
    trend: '2 urgent',
    subtitle: '3 maintenance'
  },
];

// Property performance data
const propertyPerformance = [
  { name: 'Miller Lofts', occupancy: 98, revenue: 65000, units: 47, health: 95 },
  { name: '317 Linden', occupancy: 96, revenue: 72000, units: 56, health: 88 },
  { name: '134 Franklin', occupancy: 90, revenue: 28000, units: 20, health: 92 },
  { name: 'The Oakford', occupancy: 92, revenue: 36000, units: 24, health: 90 },
  { name: 'People\'s Security', occupancy: 88, revenue: 55000, units: 40, health: 78 },
  { name: '327 N Washington', occupancy: 95, revenue: 42000, units: 30, health: 85 },
  { name: '1100 Penn Ave', occupancy: 91, revenue: 14000, units: 15, health: 82 },
];

// Tenant type breakdown
const tenantTypes = [
  { name: 'Graduate Students', value: 45, color: '#1e3a5f' },
  { name: 'Medical Students', value: 25, color: '#2196f3' },
  { name: 'Young Professionals', value: 20, color: '#64b5f6' },
  { name: 'Commercial', value: 10, color: '#90caf9' },
];

// Monthly revenue trend - actual DFM scale
const revenueData = [
  { name: 'Jan', revenue: 285000, target: 300000 },
  { name: 'Feb', revenue: 292000, target: 300000 },
  { name: 'Mar', revenue: 298000, target: 300000 },
  { name: 'Apr', revenue: 305000, target: 300000 },
  { name: 'May', revenue: 308000, target: 300000 },
  { name: 'Jun', revenue: 312000, target: 300000 },
];

// Quick actions for ADD-friendly interface
const quickActions = [
  { id: 1, property: 'Miller Lofts #204', issue: 'Lease expiring in 30 days', urgent: true },
  { id: 2, property: '317 Linden #312', issue: 'Maintenance: AC repair needed', urgent: true },
  { id: 3, property: 'People\'s Security', issue: '3 units ready for showing', urgent: false },
  { id: 4, property: '134 Franklin', issue: 'Rent collection pending (2 units)', urgent: false },
  { id: 5, property: 'The Oakford #105', issue: 'Move-out inspection scheduled', urgent: false },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', p: 3 }}>
      {/* Header with branding */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1e3a5f', mb: 1 }}>
            DFM Properties
          </Typography>
          <Typography variant="h6" sx={{ color: '#666' }}>
            Scranton's Premier Student Housing • {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Chip icon={<SchoolIcon />} label="University District" color="primary" />
          <Chip icon={<LocationOnIcon />} label="Downtown Scranton" color="secondary" />
        </Box>
      </Box>

      {/* Key Metrics - Visual and ADD-friendly */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {summaryData.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                p: 3, 
                height: '100%',
                backgroundColor: 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                }
              }}
              onClick={() => {
                if (item.title === 'Properties') navigate('/properties');
                if (item.title === 'Action Items') navigate('/maintenance');
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', color: item.color, mb: 1 }}>
                    {item.value}
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#666', mb: 0.5 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#999' }}>
                    {item.subtitle}
                  </Typography>
                  <Chip 
                    label={item.trend} 
                    size="small" 
                    sx={{ 
                      mt: 1, 
                      backgroundColor: item.trend.includes('↑') ? '#e8f5e9' : '#fff3e0',
                      color: item.trend.includes('↑') ? '#2e7d32' : '#e65100',
                      fontWeight: 'bold'
                    }} 
                  />
                </Box>
                <Box sx={{ color: item.color, opacity: 0.2 }}>
                  {item.icon}
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions Panel - ADD-friendly */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#1e3a5f' }}>
              🎯 Quick Actions
            </Typography>
            {quickActions.map((action) => (
              <Box 
                key={action.id}
                sx={{ 
                  p: 2, 
                  mb: 1, 
                  borderRadius: 2,
                  backgroundColor: action.urgent ? '#fff3e0' : '#f5f5f5',
                  border: action.urgent ? '2px solid #ff9800' : '1px solid #e0e0e0',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: action.urgent ? '#ffe0b2' : '#eeeeee',
                    transform: 'translateX(4px)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      {action.property}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      {action.issue}
                    </Typography>
                  </Box>
                  {action.urgent && <WarningIcon sx={{ color: '#ff9800' }} />}
                </Box>
              </Box>
            ))}
          </Card>
        </Grid>

        {/* Property Performance Visual */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#1e3a5f' }}>
              📊 Property Performance
            </Typography>
            <Grid container spacing={2}>
              {propertyPerformance.map((property) => (
                <Grid item xs={12} sm={6} md={4} key={property.name}>
                  <Box 
                    sx={{ 
                      p: 2, 
                      borderRadius: 2,
                      backgroundColor: selectedProperty === property.name ? '#e3f2fd' : '#f5f5f5',
                      border: selectedProperty === property.name ? '2px solid #2196f3' : '1px solid #e0e0e0',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        backgroundColor: '#e3f2fd',
                      }
                    }}
                    onClick={() => setSelectedProperty(property.name)}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {property.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" sx={{ color: '#666', mr: 1 }}>Occupancy:</Typography>
                      <Box sx={{ flexGrow: 1, mr: 1 }}>
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
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {property.occupancy}%
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        {property.units} units
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                        ${(property.revenue / 1000).toFixed(0)}K/mo
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>

      {/* Revenue and Tenant Mix */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#1e3a5f' }}>
              💰 Revenue Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `$${value / 1000}K`} />
                <Tooltip formatter={(value: any) => `$${(value / 1000).toFixed(0)}K`} />
                <Bar dataKey="revenue" fill="#1976d2" radius={[8, 8, 0, 0]} />
                <Bar dataKey="target" fill="#e0e0e0" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#1e3a5f' }}>
              👥 Tenant Mix
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={tenantTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {tenantTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
