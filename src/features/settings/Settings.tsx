import React, { useState } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Settings = ({ language, setLanguage }: { language: string; setLanguage: (lang: string) => void }) => {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="language-select-label">Language</InputLabel>
        <Select
          labelId="language-select-label"
          value={language}
          label="Language"
          onChange={(e) => setLanguage(e.target.value)}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="he">עברית</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Settings; 