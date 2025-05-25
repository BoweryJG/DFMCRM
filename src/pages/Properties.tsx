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
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';

// Mock data for properties
const propertiesData = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
    id: 4,
    address: '220 Penn Ave',
    city: 'Scranton',
    state: 'PA',
    zipCode: '18503',
    units: 6,
    occupancyRate: 83,
    monthlyRevenue: 7500,
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    type: 'Apartment Building',
  },
  {
    id: 5,
    address: '501 Lackawanna Ave',
    city: 'Scranton',
    state: 'PA',
    zipCode: '18503',
    units: 1,
    occupancyRate: 100,
    monthlyRevenue: 3200,
    image: 'https://images.unsplash.com/photo-1594540637720-9b14714212b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    type: 'Commercial Space',
  },
  {
    id: 6,
    address: '125 N Washington Ave',
    city: 'Scranton',
    state: 'PA',
    zipCode: '18503',
    units: 10,
    occupancyRate: 90,
    monthlyRevenue: 12000,
    image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    type: 'Apartment Building',
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
      case 'Apartment Building':
        return <ApartmentIcon />;
      case 'Commercial Space':
        return <BusinessIcon />;
      case 'Mixed-Use Building':
        return <HomeIcon />; // Or a combination icon if available
      default:
        return <LocationOnIcon />;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Properties
        </Typography>
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
          <Grid xs={12} sm={6} md={4} key={property.id}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column', 
                height: '100%',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 6,
                }
              }}
              onClick={() => navigate(`/properties/${property.id}`)}
            >
              <CardMedia
                component="img"
                height="200"
                image={property.image}
                alt={property.address}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {property.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {property.city}, {property.state} {property.zipCode}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
                  {getPropertyIcon(property.type)}
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    {property.type}
                  </Typography>
                </Box>
                <Chip 
                  label={`${property.units} Units`} 
                  size="small" 
                  sx={{ mr: 1, mb: 1 }} 
                />
                <Chip 
                  label={`Occupancy: ${property.occupancyRate}%`} 
                  size="small" 
                  color={property.occupancyRate > 90 ? "success" : property.occupancyRate > 75 ? "warning" : "error"}
                  sx={{ mb: 1 }} 
                />
              </CardContent>
              <Box sx={{ p: 2, borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" color="primary">
                  ${property.monthlyRevenue.toLocaleString()}/mo
                </Typography>
                <Button 
                  size="small" 
                  variant="outlined"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click
                    navigate(`/properties/${property.id}`);
                  }}
                >
                  View Details
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
