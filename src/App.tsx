import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Box, Typography, InputBase, Avatar, IconButton, Drawer, AppBar, Toolbar } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
// import './App.css';
import FilesPage from './features/files';
import NaamanLogo from './components/NaamanLogo';

// Styled components for navigation
const StyledLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '12px 16px',
  borderRadius: '8px',
  textDecoration: 'none',
  color: 'inherit',
  fontSize: '16px',
  fontWeight: 500,
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    transform: 'translateX(4px)',
  },
  [theme.breakpoints.down('md')]: {
    padding: '16px 20px',
    fontSize: '18px',
    borderBottom: '1px solid #f0f0f0',
    borderRadius: 0,
    '&:hover': {
      backgroundColor: '#f8f9fa',
      transform: 'none',
    },
  },
}));

// Placeholder page components
const Dashboard = () => (
  <Box sx={{ p: { xs: 2, md: 3 } }}>
    <Typography variant="h4">Dashboard Page</Typography>
  </Box>
);
const Clients = () => (
  <Box sx={{ p: { xs: 2, md: 3 } }}>
    <Typography variant="h4">Clients Page</Typography>
  </Box>
);
const Policies = () => (
  <Box sx={{ p: { xs: 2, md: 3 } }}>
    <Typography variant="h4">Policies Page</Typography>
  </Box>
);
const Claims = () => (
  <Box sx={{ p: { xs: 2, md: 3 } }}>
    <Typography variant="h4">Claims Page</Typography>
  </Box>
);
const Agents = () => (
  <Box sx={{ p: { xs: 2, md: 3 } }}>
    <Typography variant="h4">Agents Page</Typography>
  </Box>
);
const Settings = () => (
  <Box sx={{ p: { xs: 2, md: 3 } }}>
    <Typography variant="h4">Settings Page</Typography>
  </Box>
);

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/clients', label: 'Clients', icon: '👥' },
    { path: '/files', label: 'Files', icon: '📁' },
    { path: '/policies', label: 'Policies', icon: '📋' },
    { path: '/claims', label: 'Claims', icon: '⚠️' },
    { path: '/agents', label: 'Agents', icon: '👤' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: 1,
          borderColor: 'grey.300',
          bgcolor: 'white',
          color: 'white',
        }}
      >
        <Box sx={{ width: 200 }}>
          <NaamanLogo size="medium" />
        </Box>
      </Box>
      <Box
        component="nav"
        sx={{
          flex: 1,
          p: { xs: 1, md: 2 },
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 0, md: 1 },
        }}
      >
        {navigationItems.map((item) => (
          <StyledLink key={item.path} to={item.path} onClick={handleNavClick}>
            <Box component="span" sx={{ display: { xs: 'block', md: 'none' }, mr: 2, fontSize: '20px' }}>
              {item.icon}
            </Box>
            <Box component="span" sx={{ display: { xs: 'block', md: 'block' } }}>
              {item.label}
            </Box>
          </StyledLink>
        ))}
      </Box>
    </Box>
  );

  return (
    <Router>
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'grey.50' }}>
        {/* Mobile App Bar */}
        <AppBar
          position="fixed"
          sx={{
            display: { xs: 'flex', md: 'none' },
            zIndex: (theme) => theme.zIndex.drawer + 1,
            bgcolor: 'white',
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
                <NaamanLogo size="small" />
            </Box>
            <Avatar sx={{ width: 32, height: 32 }} />
          </Toolbar>
        </AppBar>

        {/* Desktop Sidebar */}
        <Box
          component="aside"
          sx={{
            width: 256,
            bgcolor: 'white',
            borderRight: 1,
            borderColor: 'grey.300',
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            position: 'fixed',
            height: '100vh',
            zIndex: 1,
          }}
        >
          {drawer}
        </Box>

        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 280,
              bgcolor: 'white',
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
          {drawer}
        </Drawer>

        {/* Main content */}
        <Box 
          sx={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column',
            ml: { xs: 0, md: '256px' },
            mt: { xs: '64px', md: 0 },
          }}
        >
          {/* Desktop Header */}
          <Box
            component="header"
            sx={{
              height: 64,
              bgcolor: 'white',
              borderBottom: 1,
              borderColor: 'grey.300',
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              px: 3,
              justifyContent: 'space-between',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: '1.25rem',
              }}
            >
              Welcome to NaamanDesk
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <InputBase
                placeholder="Search..."
                sx={{
                  border: 1,
                  borderColor: 'grey.300',
                  borderRadius: 1,
                  px: 1,
                  py: 0.5,
                  fontSize: '1rem',
                  width: 200,
                }}
              />
              <Avatar sx={{ width: 32, height: 32 }} />
            </Box>
          </Box>
          
          {/* Page content */}
          <Box component="main" sx={{ flex: 1, overflowY: 'auto' }}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/files" element={<FilesPage />} />
              <Route path="/policies" element={<Policies />} />
              <Route path="/claims" element={<Claims />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
