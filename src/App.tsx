import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Box, Typography, InputBase, Avatar, IconButton, Drawer, AppBar, Toolbar } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import FilesPage from './features/files';
import NaamanLogo from './components/NaamanLogo';
import Settings from './features/settings/Settings';
import en from './i18n/en';
import he from './i18n/he';

const translations: Record<string, typeof en> = { en, he };
type Language = keyof typeof translations;
const LanguageContext = createContext<{ language: Language; setLanguage: (lang: Language) => void }>({ language: 'en', setLanguage: () => {} });

export const useLanguage = () => useContext(LanguageContext);

function useT() {
  const { language } = useLanguage();
  return (key: keyof typeof en) => translations[language][key] || key;
}

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
const Dashboard = () => {
  const t = useT();
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h4">{t('dashboard')}</Typography>
    </Box>
  );
};
const Clients = () => {
  const t = useT();
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h4">{t('clients')}</Typography>
    </Box>
  );
};
const Policies = () => {
  const t = useT();
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h4">{t('policies')}</Typography>
    </Box>
  );
};
const Claims = () => {
  const t = useT();
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h4">{t('claims')}</Typography>
    </Box>
  );
};
const Agents = () => {
  const t = useT();
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h4">{t('agents')}</Typography>
    </Box>
  );
};

function App() {
  const [language, setLanguage] = useState<Language>('en');
  const t = (key: keyof typeof en) => translations[language][key] || key;
  const [mobileOpen, setMobileOpen] = useState(false);

  // RTL support
  useEffect(() => {
    document.body.setAttribute('dir', language === 'he' ? 'rtl' : 'ltr');
  }, [language]);

  const theme = createTheme({
    direction: language === 'he' ? 'rtl' : 'ltr',
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  const navigationItems = [
    { path: '/dashboard', label: t('dashboard'), icon: '📊' },
    { path: '/clients', label: t('clients'), icon: '👥' },
    { path: '/files', label: t('files'), icon: '📁' },
    { path: '/policies', label: t('policies'), icon: '📋' },
    { path: '/claims', label: t('claims'), icon: '⚠️' },
    { path: '/agents', label: t('agents'), icon: '👤' },
    { path: '/settings', label: t('settings'), icon: '⚙️' },
  ];

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          height: 64,
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
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <ThemeProvider theme={theme}>
        <Router>
          <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'grey.50', direction: language === 'he' ? 'rtl' : 'ltr' }}>
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
                    sx={{ 
                      mr: 1,
                      ...(language === 'he' && {
                        mr: 0,
                        ml: 2,
                      }),
                      padding: 0,
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <NaamanLogo size="small-medium" />
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
                borderRight: language === 'he' ? 0 : 1,
                borderLeft: language === 'he' ? 1 : 0,
                borderColor: 'grey.300',
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh',
                zIndex: 1,
                ...(language === 'he' && {
                  right: 0,
                  left: 'auto',
                }),
                ...(language !== 'he' && {
                  left: 0,
                  right: 'auto',
                }),
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
                  ...(language === 'he' && {
                    right: 0,
                    left: 'auto',
                  }),
                  ...(language !== 'he' && {
                    left: 0,
                    right: 'auto',
                  }),
                },
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                justifyContent: language === 'he' ? 'flex-start' : 'flex-end', 
                p: 1 
              }}>
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
                marginInlineStart: { xs: 0, md: language === 'he' ? 0 : '256px' },
                marginInlineEnd: { xs: 0, md: language === 'he' ? '256px' : 0 },
                mt: { xs: '64px', md: 0 },
                minWidth: 0,
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
                  width: '100%',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: '1.25rem',
                    textAlign: 'start',
                    flex: 1,
                  }}
                >
                  {t('welcome')}
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2,
                  flexDirection: language === 'he' ? 'row-reverse' : 'row'
                }}>
                  <InputBase
                    placeholder={t('search')}
                    sx={{
                      border: 1,
                      borderColor: 'grey.300',
                      borderRadius: 1,
                      px: 1,
                      py: 0.5,
                      fontSize: '1rem',
                      width: 200,
                      marginInlineEnd: 2,
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
                  <Route path="/settings" element={<Settings language={language} setLanguage={setLanguage} />} />
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </Box>
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </LanguageContext.Provider>
  );
}

export default App;
