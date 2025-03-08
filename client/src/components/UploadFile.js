import React, { useState } from "react";
import { Box, Typography, Button, CircularProgress, Snackbar, Alert, LinearProgress } from "@mui/material";
import { styled } from "@mui/system";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { uploadFile } from "../api/fileService";

const DragDropContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: "2px dashed #007bff",
  borderRadius: "12px",
  backgroundColor: "#f8f9fa",
  padding: "50px",
  textAlign: "center",
  cursor: "pointer",
  transition: "0.3s",
  "&:hover": {
    backgroundColor: "#e9f5ff",
  },
});

const UploadFile = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);

    try {
      const response = (await uploadFile(file)).data
      if (!response.ok) throw new Error("Upload failed");
      else {
        onUploadSuccess();
      }
      setFile(null);
      setMessage({ type: "success", text: "File uploaded successfully!" });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 4 }}>
      {/* Drag & Drop Box */}
      <DragDropContainer
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => document.getElementById("fileInput").click()}
      >
        <CloudUploadIcon sx={{ fontSize: "60px", color: "#007bff" }} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Drag & Drop files here or click to upload
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Supports: JPG, PNG, PDF, TXT
        </Typography>
      </DragDropContainer>

      {/* Hidden File Input */}
      <input id="fileInput" type="file" hidden onChange={handleFileChange} />

      {/* File Preview */}
      {file && (
        <Box sx={{ mt: 3, textAlign: "center", width: "100%", maxWidth: "400px" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px", p: 2, borderRadius: "8px", backgroundColor: "#ffffff", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
            {file.type.startsWith("image/") ? (
              <img src={URL.createObjectURL(file)} alt="Preview" style={{ width: "50px", height: "50px", borderRadius: "5px", objectFit: "cover" }} />
            ) : (
              <InsertDriveFileIcon sx={{ fontSize: "40px", color: "#007bff" }} />
            )}
            <Typography variant="body1">{file.name} ({(file.size / 1024).toFixed(2)} KB)</Typography>
          </Box>
        </Box>
      )}

      {/* Upload Button */}
      <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? <CircularProgress size={24} /> : "Upload File"}
      </Button>

      {/* Upload Progress Bar */}
      {uploading && <LinearProgress sx={{ width: "100%", mt: 2, maxWidth: "400px" }} variant="determinate" value={progress} />}

      {/* Snackbar for Success/Error Messages */}
      <Snackbar open={!!message.text} autoHideDuration={3000} onClose={() => setMessage({ type: "", text: "" })}>
        <Alert severity={message.type}>{message.text}</Alert>
      </Snackbar>
    </Box>
  );
};

export default UploadFile;
