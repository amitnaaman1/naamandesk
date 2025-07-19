import React, { useRef } from 'react';

interface FileUploadProps {
  onFilesSelect: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFilesSelect }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelect(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelect(Array.from(e.dataTransfer.files));
    }
  };

  return (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition"
      onClick={() => inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={e => e.preventDefault()}
    >
      <p className="mb-2 text-gray-600">Drag and drop CSV, XLSX, or PDF files here, or click to select</p>
      <input
        ref={inputRef}
        type="file"
        accept=".csv, .pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf"
        className="hidden"
        multiple
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUpload; 