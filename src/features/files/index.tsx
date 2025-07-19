import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Modal, 
  Table, 
  TableBody, 
  TableRow, 
  TableCell, 
  Paper,
  IconButton
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import FileUpload from './FileUpload';
import FileCard from '../../components/FileCard';
import * as XLSX from 'xlsx-republish';

const FilesPage: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[][] | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);

  const handleFilesSelect = (files: File[]) => {
    setUploadedFiles(prev => {
      const existing = new Set(prev.map(f => f.name + f.size));
      return [
        ...prev,
        ...files.filter(f => !existing.has(f.name + f.size)),
      ];
    });
  };

  const handleDelete = (fileToDelete: File) => {
    setUploadedFiles(prev => prev.filter(f => f !== fileToDelete));
    if (previewFile === fileToDelete) {
      setPreviewFile(null);
      setPreviewData(null);
      setPreviewError(null);
    }
  };

  const handlePreview = (file: File) => {
    setPreviewFile(file);
    setPreviewError(null);
    setPreviewData(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];
        setPreviewData(rows.slice(0, 20));
      } catch (err: any) {
        setPreviewError(err.message || 'Failed to parse file');
      }
    };
    reader.onerror = () => setPreviewError('Failed to read file');
    reader.readAsArrayBuffer(file);
  };

  const closeModal = () => {
    setPreviewFile(null);
    setPreviewData(null);
    setPreviewError(null);
  };

  return (
    <Box sx={{ maxWidth: '7xl', mx: 'auto', mt: { xs: 3, md: 5 }, px: { xs: 2, md: 3 } }}>
      <Typography 
        variant="h3" 
        sx={{ 
          mb: 2, 
          fontSize: { xs: '1.5rem', md: '2rem' },
          fontWeight: 'bold'
        }}
      >
        File Upload
      </Typography>
      <FileUpload onFilesSelect={handleFilesSelect} />
      {uploadedFiles.length > 0 && (
        <Box sx={{ mt: 3 }}>
          
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
                xl: 'repeat(4, 1fr)'
              },
              gap: 2
            }}
          >
            {uploadedFiles.map(file => (
              <FileCard key={file.name + file.size} file={file} onDelete={handleDelete} onPreview={handlePreview} />
            ))}
          </Box>
        </Box>
      )}
      {/* Preview Modal */}
      <Modal
        open={!!previewFile}
        onClose={closeModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
        }}
      >
        <Paper
          sx={{
            width: '100%',
            maxWidth: '4xl',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative'
          }}
        >
          <Box sx={{ p: { xs: 2, md: 3 }, position: 'relative' }}>
            <IconButton
              onClick={closeModal}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'grey.500',
                '&:hover': { color: 'black' }
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography 
              variant="h4" 
              sx={{ 
                mb: 2, 
                pr: 4,
                fontWeight: 'bold'
              }}
            >
              Preview: {previewFile?.name}
            </Typography>
            {previewError && (
              <Typography color="error" sx={{ mb: 2 }}>
                {previewError}
              </Typography>
            )}
            {previewData ? (
              <Box sx={{ overflow: 'auto' }}>
                <Table size="small">
                  <TableBody>
                    {previewData.map((row, i) => (
                      <TableRow key={i}>
                        {row.map((cell, j) => (
                          <TableCell key={j} sx={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {String(cell)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Showing first 20 rows
                </Typography>
              </Box>
            ) : !previewError ? (
              <Typography>Loading preview...</Typography>
            ) : null}
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
};

export default FilesPage; 