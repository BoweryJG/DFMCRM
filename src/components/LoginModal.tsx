import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Alert,
  CircularProgress,
  useTheme,
  InputAdornment,
} from '@mui/material';
import {
  Close as CloseIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const { signInWithEmail } = useAuth();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Always use the hardcoded email for login
      const hardcodedEmail = 'admin@dfmproperties.com';
      await signInWithEmail(hardcodedEmail, password);
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };


  const handleClose = () => {
    if (!loading) {
      setPassword('');
      setError(null);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: { xs: 0, sm: 3 },
          boxShadow: theme.shadows[24],
          maxHeight: { xs: '100vh', sm: '90vh' },
          m: { xs: 0, sm: 2 },
          width: { xs: '100%', sm: 'auto' },
        },
      }}
    >
      <DialogTitle sx={{ 
        pb: 0, 
        pt: 3,
        px: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Box>
          <Typography variant="h4" sx={{ 
            fontWeight: 700,
            color: theme.palette.primary.main,
            letterSpacing: '-0.5px'
          }}>
            DFM Properties
          </Typography>
          <Typography variant="body2" sx={{ 
            color: theme.palette.text.secondary,
            mt: 0.5
          }}>
            Enter password to continue
          </Typography>
        </Box>
        <IconButton 
          onClick={handleClose}
          disabled={loading}
          sx={{ 
            color: theme.palette.grey[500],
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pb: 3 }}>
        {error && (
          <Alert 
            severity="error" 
            onClose={() => setError(null)}
            sx={{ mb: 2, borderRadius: 2 }}
          >
            {error}
          </Alert>
        )}


        {/* Email Form */}
        <Box component="form" onSubmit={handleEmailAuth} sx={{ mt: 3 }}>

          <TextField
            fullWidth
            label="Password (hint: golden)"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
            sx={{ mb: 3 }}
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: theme.palette.text.secondary }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              boxShadow: theme.shadows[4],
              '&:hover': {
                boxShadow: theme.shadows[8],
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Sign In'
            )}
          </Button>
        </Box>

      </DialogContent>
    </Dialog>
  );
};