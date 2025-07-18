import React from 'react';
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
    <FontAwesomeIcon icon={faFileExcel} className="text-green-600 text-3xl mr-2" title="Excel" />
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
    <div
      className="relative group bg-white border rounded-lg shadow-sm p-4 flex flex-col items-center transition hover:shadow-lg cursor-pointer"
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      title="Click to preview"
    >
      <div className="flex items-center mb-2">
        {getFileIcon()}
        <span className="font-medium text-sm truncate max-w-[120px]" title={file.name}>{file.name}</span>
      </div>
      <div className="text-xs text-gray-500 mb-2">{formatSize(file.size)}</div>
      <button
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full p-1 text-xs transition"
        onClick={e => { e.stopPropagation(); onDelete(file); }}
        title="Delete"
      >
        ✕
      </button>
    </div>
  );
};

export default FileCard; 