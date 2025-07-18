import React, { useState } from 'react';
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
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">File Upload</h1>
      <FileUpload onFilesSelect={handleFilesSelect} />
      {uploadedFiles.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Uploaded Files</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {uploadedFiles.map(file => (
              <FileCard key={file.name + file.size} file={file} onDelete={handleDelete} onPreview={handlePreview} />
            ))}
          </div>
        </div>
      )}
      {/* Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-auto p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
              onClick={closeModal}
              title="Close"
            >
              ×
            </button>
            <h3 className="text-lg font-bold mb-4">Preview: {previewFile.name}</h3>
            {previewError && <div className="text-red-500 mb-2">{previewError}</div>}
            {previewData ? (
              <div className="overflow-auto">
                <table className="min-w-full border text-xs">
                  <tbody>
                    {previewData.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j} className="border px-2 py-1 truncate max-w-[120px]">{String(cell)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="text-gray-400 mt-2">Showing first 20 rows</div>
              </div>
            ) : !previewError ? (
              <div>Loading preview...</div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilesPage; 