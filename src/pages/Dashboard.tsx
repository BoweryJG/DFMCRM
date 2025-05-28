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
    icon: <ApartmentIcon sx={{ fontSize: 32 }} />, 
    color: '#1a237e',
    trend: '+2 this year',
    subtitle: '240+ total units',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  { 
    title: 'Occupancy', 
    value: '94%', 
    icon: <CheckCircleIcon sx={{ fontSize: 32 }} />, 
    color: '#1b5e20',
    trend: '↑ 3% vs last month',
    subtitle: '226 of 240 units',
    gradient: 'linear-gradient(135deg, #66bb6a 0%, #43a047 100%)'
  },
  { 
    title: 'Monthly Revenue', 
    value: '$312K', 
    icon: <TrendingUpIcon sx={{ fontSize: 32 }} />, 
    color: '#0d47a1',
    trend: '↑ 8% YoY',
    subtitle: '$3.74M annually',
    gradient: 'linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%)'
  },
  { 
    title: 'Action Items', 
    value: '5', 
    icon: <WarningIcon sx={{ fontSize: 32 }} />, 
    color: '#e65100',
    trend: '2 urgent',
    subtitle: '3 maintenance',
    gradient: 'linear-gradient(135deg, #ffa726 0%, #fb8c00 100%)'
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
  { name: 'Graduate Students', value: 45, color: '#5c6bc0' },
  { name: 'Medical Students', value: 25, color: '#7986cb' },
  { name: 'Young Professionals', value: 20, color: '#9fa8da' },
  { name: 'Commercial', value: 10, color: '#c5cae9' },
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
    <Box sx={{ 
      backgroundColor: theme => theme.palette.grey[50], 
      minHeight: '100vh', 
      p: { xs: 2, sm: 3, md: 4 } 
    }}>
      {/* Header with branding */}
      <Box sx={{ 
        mb: 4, 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'flex-start', md: 'center' }, 
        justifyContent: 'space-between',
        gap: 2
      }}>
        <Box>
          <Typography variant="h3" sx={{ 
            fontWeight: 700, 
            color: theme => theme.palette.primary.dark, 
            mb: 0.5,
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
            letterSpacing: '-0.02em'
          }}>
            DFM Properties
          </Typography>
          <Typography variant="h6" sx={{ 
            color: theme => theme.palette.text.secondary,
            fontSize: { xs: '0.875rem', sm: '0.95rem', md: '1.125rem' },
            fontWeight: 400
          }}>
            Scranton's Premier Student Housing • {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </Typography>
        </Box>
        <Box sx={{ 
          display: { xs: 'none', sm: 'flex' }, 
          gap: 2,
          flexWrap: 'wrap'
        }}>
          <Chip 
            icon={<SchoolIcon />} 
            label="University District" 
            sx={{ 
              backgroundColor: theme => theme.palette.primary.main,
              color: 'white',
              fontWeight: 500,
              '& .MuiChip-icon': { color: 'white' }
            }} 
          />
          <Chip 
            icon={<LocationOnIcon />} 
            label="Downtown Scranton" 
            sx={{ 
              backgroundColor: theme => theme.palette.secondary.main,
              color: 'white',
              fontWeight: 500,
              '& .MuiChip-icon': { color: 'white' }
            }} 
          />
        </Box>
      </Box>

      {/* Key Metrics - Visual and ADD-friendly */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
        {summaryData.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                p: { xs: 2.5, sm: 3 }, 
                height: '100%',
                backgroundColor: 'white',
                boxShadow: theme => `0 1px 3px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.08)'}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                border: theme => `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: theme => `0 4px 12px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.15)'}`,
                  '&::before': {
                    opacity: 1
                  }
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: item.gradient,
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }
              }}
              onClick={() => {
                if (item.title === 'Properties') navigate('/properties');
                if (item.title === 'Action Items') navigate('/maintenance');
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h3" sx={{ 
                    fontWeight: 700, 
                    color: item.color, 
                    mb: 0.5,
                    fontSize: { xs: '2rem', sm: '2.25rem', md: '2.5rem' },
                    letterSpacing: '-0.02em',
                    lineHeight: 1
                  }}>
                    {item.value}
                  </Typography>
                  <Typography variant="h6" sx={{ 
                    color: theme => theme.palette.text.primary, 
                    mb: 0.25,
                    fontSize: { xs: '0.95rem', sm: '1.125rem' },
                    fontWeight: 600,
                    letterSpacing: '0.01em'
                  }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: theme => theme.palette.text.secondary,
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    fontWeight: 400
                  }}>
                    {item.subtitle}
                  </Typography>
                  <Chip 
                    label={item.trend} 
                    size="small" 
                    sx={{ 
                      mt: 1.5, 
                      backgroundColor: item.trend.includes('↑') ? 'rgba(76, 175, 80, 0.08)' : 'rgba(255, 152, 0, 0.08)',
                      color: item.trend.includes('↑') ? '#2e7d32' : '#f57c00',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      height: '24px',
                      border: item.trend.includes('↑') ? '1px solid rgba(76, 175, 80, 0.2)' : '1px solid rgba(255, 152, 0, 0.2)'
                    }} 
                  />
                </Box>
                <Box sx={{ 
                  color: item.color, 
                  opacity: 0.1,
                  position: 'absolute',
                  right: 16,
                  top: 16
                }}>
                  {item.icon}
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions Panel - ADD-friendly */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            p: { xs: 2.5, sm: 3 }, 
            height: '100%', 
            boxShadow: theme => `0 1px 3px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.08)'}`,
            border: theme => `1px solid ${theme.palette.divider}`,
            borderRadius: 2
          }}>
            <Typography variant="h5" sx={{ 
              fontWeight: 600, 
              mb: 3, 
              color: theme => theme.palette.primary.dark,
              fontSize: { xs: '1.125rem', sm: '1.375rem' },
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <Box component="span" sx={{ fontSize: '1.25rem' }}>🎯</Box>
              Quick Actions
            </Typography>
            {quickActions.map((action) => (
              <Box 
                key={action.id}
                sx={{ 
                  p: 2, 
                  mb: 1.5, 
                  borderRadius: 1.5,
                  backgroundColor: action.urgent 
                    ? 'rgba(255, 152, 0, 0.04)' 
                    : theme => theme.palette.grey[50],
                  border: action.urgent 
                    ? '1px solid rgba(255, 152, 0, 0.3)' 
                    : theme => `1px solid ${theme.palette.divider}`,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    backgroundColor: action.urgent 
                      ? 'rgba(255, 152, 0, 0.08)' 
                      : theme => theme.palette.action.hover,
                    transform: 'translateX(2px)',
                    borderColor: action.urgent 
                      ? 'rgba(255, 152, 0, 0.5)' 
                      : theme => theme.palette.primary.light
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ 
                      fontWeight: 600,
                      color: theme => theme.palette.text.primary,
                      mb: 0.25
                    }}>
                      {action.property}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: theme => theme.palette.text.secondary,
                      fontSize: '0.875rem'
                    }}>
                      {action.issue}
                    </Typography>
                  </Box>
                  {action.urgent && <WarningIcon sx={{ 
                    color: '#ff9800', 
                    fontSize: '1.25rem' 
                  }} />}
                </Box>
              </Box>
            ))}
          </Card>
        </Grid>

        {/* Property Performance Visual */}
        <Grid item xs={12} md={8}>
          <Card sx={{ 
            p: { xs: 2.5, sm: 3 }, 
            height: '100%', 
            boxShadow: theme => `0 1px 3px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.08)'}`,
            border: theme => `1px solid ${theme.palette.divider}`,
            borderRadius: 2
          }}>
            <Typography variant="h5" sx={{ 
              fontWeight: 600, 
              mb: 3, 
              color: theme => theme.palette.primary.dark,
              fontSize: { xs: '1.125rem', sm: '1.375rem' },
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <Box component="span" sx={{ fontSize: '1.25rem' }}>📊</Box>
              Property Performance
            </Typography>
            <Grid container spacing={2}>
              {propertyPerformance.map((property) => (
                <Grid item xs={12} sm={6} md={4} key={property.name}>
                  <Box 
                    sx={{ 
                      p: 2, 
                      borderRadius: 1.5,
                      backgroundColor: selectedProperty === property.name 
                        ? theme => theme.palette.primary.main + '08'
                        : theme => theme.palette.grey[50],
                      border: selectedProperty === property.name 
                        ? theme => `2px solid ${theme.palette.primary.main}`
                        : theme => `1px solid ${theme.palette.divider}`,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      '&:hover': {
                        backgroundColor: theme => theme.palette.primary.main + '08',
                        borderColor: theme => theme.palette.primary.light
                      }
                    }}
                    onClick={() => setSelectedProperty(property.name)}
                  >
                    <Typography variant="subtitle2" sx={{ 
                      fontWeight: 600, 
                      mb: 1,
                      color: theme => theme.palette.text.primary
                    }}>
                      {property.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" sx={{ 
                        color: theme => theme.palette.text.secondary, 
                        mr: 1,
                        fontSize: '0.8125rem'
                      }}>Occupancy:</Typography>
                      <Box sx={{ flexGrow: 1, mr: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={property.occupancy} 
                          sx={{ 
                            height: 6, 
                            borderRadius: 3,
                            backgroundColor: theme => theme.palette.grey[200],
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: property.occupancy > 90 ? '#66bb6a' : '#ffa726',
                              borderRadius: 3
                            }
                          }}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ 
                        fontWeight: 600,
                        color: property.occupancy > 90 ? '#2e7d32' : '#f57c00',
                        fontSize: '0.8125rem'
                      }}>
                        {property.occupancy}%
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ 
                        color: theme => theme.palette.text.secondary,
                        fontSize: '0.8125rem'
                      }}>
                        {property.units} units
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        fontWeight: 600, 
                        color: theme => theme.palette.primary.main,
                        fontSize: '0.8125rem'
                      }}>
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
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ 
            p: { xs: 2.5, sm: 3 }, 
            boxShadow: theme => `0 1px 3px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.08)'}`,
            border: theme => `1px solid ${theme.palette.divider}`,
            borderRadius: 2
          }}>
            <Typography variant="h5" sx={{ 
              fontWeight: 600, 
              mb: 3, 
              color: theme => theme.palette.primary.dark,
              fontSize: { xs: '1.125rem', sm: '1.375rem' },
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <Box component="span" sx={{ fontSize: '1.25rem' }}>💰</Box>
              Revenue Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" strokeOpacity={0.5} />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `$${value / 1000}K`} />
                <Tooltip formatter={(value: any) => `$${(value / 1000).toFixed(0)}K`} />
                <Bar dataKey="revenue" fill="#5c6bc0" radius={[6, 6, 0, 0]} />
                <Bar dataKey="target" fill="#e8eaf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            p: { xs: 2.5, sm: 3 }, 
            boxShadow: theme => `0 1px 3px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.08)'}`,
            border: theme => `1px solid ${theme.palette.divider}`,
            borderRadius: 2
          }}>
            <Typography variant="h5" sx={{ 
              fontWeight: 600, 
              mb: 3, 
              color: theme => theme.palette.primary.dark,
              fontSize: { xs: '1.125rem', sm: '1.375rem' },
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <Box component="span" sx={{ fontSize: '1.25rem' }}>👥</Box>
              Tenant Mix
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
