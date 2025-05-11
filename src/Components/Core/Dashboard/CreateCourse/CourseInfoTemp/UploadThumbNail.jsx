import React, { useRef, useState } from 'react';

const UploadThumbNail = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleFile = (file) => {
    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <div
        className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer bg-gray-100 hover:bg-gray-200"
        onClick={handleBrowseClick}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {previewURL ? (
          <img
            src={previewURL}
            alt="Preview"
            className="w-full h-full object-cover mx-auto rounded-md"
          />
        ) : (
          <p className="text-gray-700">
            Drag & Drop or <span className="text-blue-600 underline">Browse</span>
          </p>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {file && (
        <p className="text-center mt-3 text-sm text-gray-800">File: {file.name}</p>
      )}
    </div>
  );
};

export default UploadThumbNail;
