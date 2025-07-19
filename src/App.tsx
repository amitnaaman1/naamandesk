import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Box, Typography, InputBase, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
// import './App.css';
import FilesPage from './features/files';

// Styled components for navigation
const StyledLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 16px',
  borderRadius: '4px',
  textDecoration: 'none',
  color: 'inherit',
  fontSize: '14px',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
  [theme.breakpoints.down('md')]: {
    padding: '8px',
    fontSize: '12px',
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
  return (
    <Router>
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'grey.50' }}>
        {/* Sidebar */}
        <Box
          component="aside"
          sx={{
            width: { xs: 64, md: 256 },
            bgcolor: 'white',
            borderRight: 1,
            borderColor: 'grey.300',
            display: 'flex',
            flexDirection: 'column',
            transition: 'width 0.3s',
          }}
        >
          <Box
            sx={{
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: 1,
              borderColor: 'grey.300',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                display: { xs: 'none', md: 'block' },
              }}
            >
              NaamanDesk
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                display: { xs: 'block', md: 'none' },
              }}
            >
              ND
            </Typography>
          </Box>
          <Box
            component="nav"
            sx={{
              flex: 1,
              p: { xs: 1, md: 2 },
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 0.5, md: 1 },
            }}
          >
            <StyledLink to="/dashboard">
              <Box component="span" sx={{ display: { xs: 'block', md: 'none' } }}>
                📊
              </Box>
              <Box component="span" sx={{ display: { xs: 'none', md: 'block' } }}>
                Dashboard
              </Box>
            </StyledLink>
            <StyledLink to="/clients">
              <Box component="span" sx={{ display: { xs: 'block', md: 'none' } }}>
                👥
              </Box>
              <Box component="span" sx={{ display: { xs: 'none', md: 'block' } }}>
                Clients
              </Box>
            </StyledLink>
            <StyledLink to="/files">
              <Box component="span" sx={{ display: { xs: 'block', md: 'none' } }}>
                📁
              </Box>
              <Box component="span" sx={{ display: { xs: 'none', md: 'block' } }}>
                Files
              </Box>
            </StyledLink>
            <StyledLink to="/policies">
              <Box component="span" sx={{ display: { xs: 'block', md: 'none' } }}>
                📋
              </Box>
              <Box component="span" sx={{ display: { xs: 'none', md: 'block' } }}>
                Policies
              </Box>
            </StyledLink>
            <StyledLink to="/claims">
              <Box component="span" sx={{ display: { xs: 'block', md: 'none' } }}>
                ⚠️
              </Box>
              <Box component="span" sx={{ display: { xs: 'none', md: 'block' } }}>
                Claims
              </Box>
            </StyledLink>
            <StyledLink to="/agents">
              <Box component="span" sx={{ display: { xs: 'block', md: 'none' } }}>
                👤
              </Box>
              <Box component="span" sx={{ display: { xs: 'none', md: 'block' } }}>
                Agents
              </Box>
            </StyledLink>
            <StyledLink to="/settings">
              <Box component="span" sx={{ display: { xs: 'block', md: 'none' } }}>
                ⚙️
              </Box>
              <Box component="span" sx={{ display: { xs: 'none', md: 'block' } }}>
                Settings
              </Box>
            </StyledLink>
          </Box>
        </Box>
        {/* Main content */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <Box
            component="header"
            sx={{
              height: 64,
              bgcolor: 'white',
              borderBottom: 1,
              borderColor: 'grey.300',
              display: 'flex',
              alignItems: 'center',
              px: { xs: 2, md: 3 },
              justifyContent: 'space-between',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: { xs: '1rem', md: '1.25rem' },
              }}
            >
              Welcome to NaamanDesk
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }}>
              <InputBase
                placeholder="Search..."
                sx={{
                  border: 1,
                  borderColor: 'grey.300',
                  borderRadius: 1,
                  px: 1,
                  py: 0.5,
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  width: { xs: 96, md: 'auto' },
                }}
              />
              <Avatar sx={{ width: { xs: 24, md: 32 }, height: { xs: 24, md: 32 } }} />
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
