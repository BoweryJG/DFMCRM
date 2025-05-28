import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, useTheme, CircularProgress } from '@mui/material';

// Layout components
import { Navigation } from './components/Navigation';
import { LoginModal } from './components/LoginModal';

// Auth
import { useAuth } from './contexts/AuthContext';

// Pages
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import Tenants from './pages/Tenants';
import TenantDetails from './pages/TenantDetails';
import Maintenance from './pages/Maintenance';
import Financials from './pages/Financials';
import Alerts from './pages/Alerts';
import Reports from './pages/Reports';

const App: React.FC = () => {
  const theme = useTheme();
  const { user, loading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // Show login modal if user is not authenticated
    if (!loading && !user) {
      setShowLoginModal(true);
    }
  }, [user, loading]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <CircularProgress size={48} />
      </Box>
    );
  }

  return (
    <>
      <LoginModal 
        open={showLoginModal && !user} 
        onClose={() => setShowLoginModal(false)} 
      />
      
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {user && <Navigation />}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            mt: { xs: user ? 8 : 0, md: 0 },
            ml: { md: user ? '240px' : 0 },
            width: { xs: '100%', md: user ? 'calc(100% - 240px)' : '100%' },
            backgroundColor: theme.palette.background.default,
            minHeight: '100vh',
          }}
        >
          <Routes>
            <Route 
              path="/" 
              element={user ? <Navigate to="/dashboard" replace /> : <LandingPage onLogin={() => setShowLoginModal(true)} />} 
            />
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/properties" 
              element={user ? <Properties /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/properties/:id" 
              element={user ? <PropertyDetails /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/tenants" 
              element={user ? <Tenants /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/tenants/:id" 
              element={user ? <TenantDetails /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/maintenance" 
              element={user ? <Maintenance /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/financials" 
              element={user ? <Financials /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/alerts" 
              element={user ? <Alerts /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/reports" 
              element={user ? <Reports /> : <Navigate to="/" replace />} 
            />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

// Simple landing page component
const LandingPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        px: 3,
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Box 
          component="h1" 
          sx={{ 
            fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
            fontWeight: 800,
            color: theme.palette.primary.main,
            letterSpacing: '-0.02em',
            mb: 2,
            lineHeight: 1,
          }}
        >
          DFM Properties
        </Box>
        <Box 
          component="p" 
          sx={{ 
            fontSize: { xs: '1.125rem', sm: '1.25rem' },
            color: theme.palette.text.secondary,
            maxWidth: '600px',
            mx: 'auto',
          }}
        >
          Professional property management CRM for Scranton's premier student housing
        </Box>
      </Box>
      <Box
        component="button"
        onClick={onLogin}
        sx={{
          px: { xs: 3, sm: 4 },
          py: { xs: 1.5, sm: 2 },
          fontSize: { xs: '1rem', sm: '1.125rem' },
          fontWeight: 600,
          color: 'white',
          backgroundColor: theme.palette.primary.main,
          border: 'none',
          borderRadius: 2,
          cursor: 'pointer',
          transition: 'all 0.2s',
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent',
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            transform: 'translateY(-2px)',
            boxShadow: theme.shadows[8],
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        }}
      >
        Get Started
      </Box>
    </Box>
  );
};

export default App;
