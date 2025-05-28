import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  InputAdornment,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  Tooltip,
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import MuseumIcon from '@mui/icons-material/Museum';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ConstructionIcon from '@mui/icons-material/Construction';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

// DFM Properties actual portfolio data
const propertiesData = [
  {
    id: 1,
    address: '317 Linden St',
    city: 'Scranton',
    state: 'PA',
    zipCode: '18503',
    units: 56,
    occupancyRate: 96,
    monthlyRevenue: 72000,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    type: 'Luxury Student Housing',
    yearBuilt: 2003,
    amenities: ['Fitness Center', 'Rec Room', 'Laundry', 'Parking'],
    description: 'Premium housing for graduate and medical students',
    propertyHealth: 88,
  },
  {
    id: 2,
    address: '614 Wyoming Ave',
    city: 'Scranton',
    state: 'PA',
    zipCode: '18503',
    units: 47,
    occupancyRate: 98,
    monthlyRevenue: 65000,
    image: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    type: 'Historic Luxury Lofts',
    yearBuilt: 1896,
    renovated: 2021,
    amenities: ['In-Unit W/D', 'Parking', 'Historic Architecture', 'Downtown Location'],
    description: 'Miller Lofts - 12 studios, 29 one-beds, 6 two-beds in historic building',
    propertyHealth: 95,
  },
  {
    id: 3,
    address: '134 Franklin Ave',
    city: 'Scranton',
    state: 'PA',
    zipCode: '18503',
    units: 20,
    occupancyRate: 90,
    monthlyRevenue: 28000,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    type: 'Mixed-Use Building',
    yearBuilt: 1920,
    renovated: 2019,
    amenities: ['High-End Lofts', 'Commercial Space', 'Modern Finishes'],
    description: '20 luxury lofts with ground-level commercial (Color Bar Salon)',
    propertyHealth: 92,
  },
  {
    id: 4,
    address: 'People\'s Security Bank Building',
    city: 'Scranton',
    state: 'PA',
    zipCode: '18503',
    units: 40,
    occupancyRate: 88,
    monthlyRevenue: 55000,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    type: 'Historic Skyscraper',
    yearBuilt: 1896,
    acquired: 2023,
    amenities: ['Courthouse Square Location', 'Historic Architecture', 'Premium Offices'],
    description: 'Scranton\'s first skyscraper, acquired for $3.75M',
    propertyHealth: 78,
  },
  {
    id: 5,
    address: 'The Oakford',
    city: 'Scranton',
    state: 'PA',
    zipCode: '18503',
    units: 24,
    occupancyRate: 92,
    monthlyRevenue: 36000,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    type: 'Luxury Apartments',
    yearBuilt: 1910,
    renovated: 2022,
    amenities: ['Warehouse-Style', 'Field Views', 'Modern Amenities'],
    description: '24 luxury apartments overlooking Scranton Prep fields',
    propertyHealth: 90,
  },
  {
    id: 6,
    address: '327 N Washington Ave',
    city: 'Scranton',
    state: 'PA',
    zipCode: '18503',
    units: 30,
    occupancyRate: 95,
    monthlyRevenue: 42000,
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    type: 'Medical Arts Building',
    yearBuilt: 1950,
    renovated: 2020,
    amenities: ['Medical/Professional Offices', 'Prime Downtown Location'],
    description: 'Professional Medical Arts Building in Downtown Scranton',
    propertyHealth: 85,
  },
  {
    id: 7,
    address: '1100 Penn Ave',
    city: 'Scranton',
    state: 'PA',
    zipCode: '18509',
    units: 15,
    occupancyRate: 91,
    monthlyRevenue: 14000,
    image: 'https://images.unsplash.com/photo-1555883006-0f5a0915a80f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    type: 'Mixed-Use Development',
    yearBuilt: 1965,
    renovated: 2023,
    amenities: ['120,000 sq ft', 'Commercial/Medical/Residential'],
    description: 'Large mixed-use space for commercial, medical offices, and luxury apartments',
    propertyHealth: 82,
  },
  {
    id: 8,
    address: 'Watres Armory',
    city: 'Scranton',
    state: 'PA',
    zipCode: '18503',
    units: 1,
    occupancyRate: 100,
    monthlyRevenue: 45000,
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    type: 'Private Museum',
    yearBuilt: 1895,
    renovated: 2021,
    amenities: ['110,000 sq ft', 'World-Renowned Artist Tenant', 'Historic Landmark'],
    description: 'Former armory converted to private museum for Hunt Slonem collection',
    propertyHealth: 98,
  },
  {
    id: 9,
    address: 'Woolworth Estate',
    city: 'Scranton',
    state: 'PA',
    zipCode: '18503',
    units: 1,
    occupancyRate: 0,
    monthlyRevenue: 0,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    type: 'Historic Mansion',
    yearBuilt: 1912,
    status: 'Under Renovation',
    amenities: ['Historic Landmark', 'Premium Location'],
    description: 'Historic Woolworth family mansion currently under renovation',
    propertyHealth: 65,
  },
];

const Properties: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event: any) => {
    setFilterType(event.target.value);
  };

  const filteredProperties = propertiesData.filter((property) => {
    const matchesSearch = 
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || property.type === filterType;
    
    return matchesSearch && matchesType;
  });

  // Get unique property types for filter
  const propertyTypes = [...new Set(propertiesData.map(property => property.type))];

  const getPropertyIcon = (type: string) => {
    switch (type) {
      case 'Luxury Student Housing':
        return <ApartmentIcon />;
      case 'Historic Luxury Lofts':
        return <HomeIcon />;
      case 'Mixed-Use Building':
      case 'Mixed-Use Development':
        return <BusinessIcon />;
      case 'Historic Skyscraper':
        return <AccountBalanceIcon />;
      case 'Medical Arts Building':
        return <LocalHospitalIcon />;
      case 'Private Museum':
        return <MuseumIcon />;
      case 'Historic Mansion':
        return <AccountBalanceIcon />;
      case 'Luxury Apartments':
        return <ApartmentIcon />;
      default:
        return <LocationOnIcon />;
    }
  };


  const getHealthIcon = (health: number) => {
    if (health >= 90) return <CheckCircleIcon sx={{ color: '#4caf50' }} />;
    if (health >= 80) return <WarningIcon sx={{ color: '#ff9800' }} />;
    return <ConstructionIcon sx={{ color: '#f44336' }} />;
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1e3a5f' }}>
            Property Portfolio
          </Typography>
          <Typography variant="h6" sx={{ color: '#666', mt: 1 }}>
            {propertiesData.length} Properties • {propertiesData.reduce((sum, p) => sum + p.units, 0)} Total Units • ${(propertiesData.reduce((sum, p) => sum + p.monthlyRevenue, 0) / 1000).toFixed(0)}K Monthly Revenue
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          // onClick={handleAddDialogOpen} // Add dialog functionality later
        >
          Add Property
        </Button>
      </Box>

      <Box sx={{ display: 'flex', mb: 3, gap: 2 }}>
        <TextField
          fullWidth
          placeholder="Search by address, city, or type"
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
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="property-type-filter-label">Property Type</InputLabel>
          <Select
            labelId="property-type-filter-label"
            id="property-type-filter"
            value={filterType}
            label="Property Type"
            onChange={handleFilterChange}
          >
            <MenuItem value="all">All Types</MenuItem>
            {propertyTypes.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {filteredProperties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property.id}> {/* Changed size prop to item and direct props */}
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column', 
                height: '100%',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                },
                position: 'relative',
                overflow: 'hidden',
              }}
              onClick={() => navigate(`/properties/${property.id}`)}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={property.image}
                  alt={property.address}
                />
                {/* Property Health Badge */}
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: 10, 
                    right: 10,
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    borderRadius: 2,
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}
                >
                  <Tooltip title="Property Health Score">
                    {getHealthIcon(property.propertyHealth || 85)}
                  </Tooltip>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {property.propertyHealth || 85}%
                  </Typography>
                </Box>
                {property.status === 'Under Renovation' && (
                  <Chip 
                    icon={<ConstructionIcon />}
                    label="Under Renovation"
                    sx={{ 
                      position: 'absolute', 
                      bottom: 10, 
                      left: 10,
                      backgroundColor: 'rgba(255,152,0,0.9)',
                      color: 'white'
                    }}
                  />
                )}
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                  {property.address}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {property.city}, {property.state} {property.zipCode}
                </Typography>
                
                {/* Property Type with Icon */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ color: '#1e3a5f', mr: 1 }}>
                    {getPropertyIcon(property.type)}
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    {property.type}
                  </Typography>
                </Box>

                {/* Visual Occupancy Bar */}
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">
                      Occupancy
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {property.occupancyRate}%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={property.occupancyRate} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      backgroundColor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: property.occupancyRate > 90 ? '#4caf50' : property.occupancyRate > 75 ? '#ff9800' : '#f44336'
                      }
                    }}
                  />
                </Box>

                {/* Key Stats */}
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                  <Chip 
                    label={`${property.units} ${property.units === 1 ? 'Unit' : 'Units'}`} 
                    size="small" 
                    variant="outlined"
                  />
                  {property.yearBuilt && (
                    <Chip 
                      label={`Built ${property.yearBuilt}`} 
                      size="small" 
                      variant="outlined"
                    />
                  )}
                  {property.renovated && (
                    <Chip 
                      label={`Renovated ${property.renovated}`} 
                      size="small" 
                      variant="outlined"
                      color="primary"
                    />
                  )}
                </Box>

                {/* Description */}
                {property.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: '0.875rem' }}>
                    {property.description}
                  </Typography>
                )}
              </CardContent>
              <Box sx={{ p: 2, borderTop: '1px solid #eee', backgroundColor: '#fafafa' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Box>
                    <Typography variant="h6" sx={{ color: '#1e3a5f', fontWeight: 'bold' }}>
                      ${property.monthlyRevenue ? property.monthlyRevenue.toLocaleString() : '0'}/mo
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${property.monthlyRevenue ? (property.monthlyRevenue * 12 / 1000).toFixed(0) : '0'}K annually
                    </Typography>
                  </Box>
                  {property.monthlyRevenue > 0 && (
                    <Chip 
                      icon={<TrendingUpIcon />}
                      label="+8% YoY" 
                      size="small" 
                      color="success"
                      sx={{ backgroundColor: '#e8f5e9', color: '#2e7d32' }}
                    />
                  )}
                </Box>
                <Button 
                  fullWidth
                  variant="contained"
                  size="small"
                  sx={{ 
                    backgroundColor: '#1e3a5f',
                    '&:hover': {
                      backgroundColor: '#2d4a6f'
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/properties/${property.id}`);
                  }}
                >
                  View Details →
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Properties;
