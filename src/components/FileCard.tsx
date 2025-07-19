import React from 'react';
import { Box, Typography, IconButton, Card, CardContent } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';

interface FileCardProps {
  file: File;
  onDelete: (file: File) => void;
  onPreview: (file: File) => void;
}

const getFileIcon = () => {
  // Use FontAwesome Excel file icon
  return (
    <FontAwesomeIcon icon={faFileExcel} className="text-green-600 text-2xl md:text-3xl mr-2" title="Excel" />
  );
};

const formatSize = (size: number) => {
  if (size > 1e6) return (size / 1e6).toFixed(1) + ' MB';
  if (size > 1e3) return (size / 1e3).toFixed(1) + ' KB';
  return size + ' B';
};

const FileCard: React.FC<FileCardProps> = ({ file, onDelete, onPreview }) => {
  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent preview if delete button is clicked
    if ((e.target as HTMLElement).closest('button')) return;
    onPreview(file);
  };

  return (
    <Card
      sx={{
        position: 'relative',
        cursor: 'pointer',
        transition: 'box-shadow 0.3s',
        '&:hover': {
          boxShadow: 3
        }
      }}
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      title="Click to preview"
    >
      <CardContent sx={{ p: { xs: 1.5, md: 2 }, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, justifyContent: 'center' }}>
          {getFileIcon()}
          <Typography
            variant="body1"
            sx={{
              fontWeight: 500,
              fontSize: { xs: '0.875rem', md: '1rem' },
              maxWidth: { xs: 100, md: 120 },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
            title={file.name}
          >
            {file.name}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {formatSize(file.size)}
        </Typography>
        <IconButton
          onClick={(e) => { e.stopPropagation(); onDelete(file); }}
          sx={{
            position: 'absolute',
            top: { xs: 4, md: 8 },
            right: { xs: 4, md: 8 },
            opacity: 0,
            bgcolor: 'error.main',
            color: 'white',
            '&:hover': {
              opacity: 1,
              bgcolor: 'error.dark'
            },
            width: { xs: 24, md: 32 },
            height: { xs: 24, md: 32 }
          }}
          size="small"
          title="Delete"
        >
          <DeleteIcon sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }} />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default FileCard; 