import { useState, useCallback } from "react";

const DragDropUploader = () => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [dragActive, setDragActive] = useState(false);
  const maxFileSize = 5 * 1024 * 1024; // 5MB limit

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(event.dataTransfer.files);
    const validFiles = droppedFiles.filter(file => file.size <= maxFileSize);

    if (validFiles.length < droppedFiles.length) {
      alert("Some files were too large and were not added (Max: 5MB).");
    }

    if (validFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
      simulateUpload(validFiles);
    }
  }, []);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragEnter = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
  }, []);

  const simulateUpload = (newFiles) => {
    newFiles.forEach((file) => {
      let progress = 0;
      const interval = setInterval(() => {
        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: progress,
        }));
        progress += 10;
        if (progress > 100) clearInterval(interval);
      }, 200);
    });
  };

  const removeFile = (fileName) => {
    setFiles(files.filter(file => file.name !== fileName));
    setUploadProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[fileName];
      return newProgress;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div
        className={`w-96 h-48 border-2 border-dashed rounded-lg flex items-center justify-center text-center
          transition-all duration-300 ease-in-out cursor-pointer backdrop-blur-md bg-opacity-20 ${
            dragActive ? "border-green-400 bg-gray-700 shadow-lg shadow-green-500" : "border-blue-500 bg-gray-800"
          }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        <p className="text-lg text-gray-300">
          {dragActive ? "📂 Drop Files Here" : "Drag & Drop Files Here or Click to Upload"}
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-xl w-96">
          <h3 className="text-blue-400 font-semibold">Uploaded Files:</h3>
          <ul className="mt-3 space-y-3">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between p-2 bg-gray-700 rounded-lg shadow-md">
                <div className="flex items-center space-x-3">
                  {file.type.startsWith("image/") ? (
                    <img src={URL.createObjectURL(file)} alt={file.name} className="w-10 h-10 rounded-lg object-cover" />
                  ) : (
                    <span className="text-xl">📄</span>
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-200">{file.name}</span>
                    <div className="w-36 bg-gray-600 rounded-full h-2 mt-1">
                      <div
                        className="h-2 bg-blue-400 rounded-full transition-all"
                        style={{ width: `${uploadProgress[file.name] || 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => removeFile(file.name)}
                  className="text-red-400 hover:text-red-500 transition"
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DragDropUploader;
