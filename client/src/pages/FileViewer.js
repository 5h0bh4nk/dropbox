import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchFiles } from "../redux/fileSlice";
import { Card, CardContent, Typography, Button, CircularProgress } from "@mui/material";
import { handleDownload } from "../utils/fileUtils";

const FileViewer = () => {
  const { _id } = useParams();;
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.files);

  let fileData = list.find((file) => file._id === _id);
  
  useEffect(() => {
    if (!fileData) {
      dispatch(fetchFiles());
    }
  }, [dispatch, fileData]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress size={50} />
      </div>
    );
  }

  if (!fileData) {
    return <Typography color="error" sx={{ p: 5 }}>File not found</Typography>;
  }

  const { filename, url, fileType } = fileData;

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f5f5f5", padding: "20px" }}>
      <Card sx={{ maxWidth: "800px", width: "100%", padding: "20px", boxShadow: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Viewing File: {filename}
        </Typography>

        <CardContent sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
          {fileType.startsWith("image/") ? (
            <img src={url} alt={filename} style={{ maxWidth: "100%", borderRadius: "8px", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" }} />
          ) : fileType === "application/pdf" ? (
            <iframe src={url} title={filename} style={{ width: "100%", height: "500px", border: "none" }}></iframe>
          ) : fileType.startsWith("text/") ? (
            <iframe src={url} title={filename} style={{ width: "100%", height: "300px", border: "1px solid #ccc", background: "#fff", padding: "10px" }}></iframe>
          ) : (
            <Typography color="textSecondary">
              Unsupported file type. <a href={url} target="_blank" rel="noopener noreferrer">Download</a>
            </Typography>
          )}
        </CardContent>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <Button variant="outlined" color="primary" onClick={() => window.history.back()}>
            Go Back
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleDownload(fileData.key, fileData.filename)}>
            Download
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default FileViewer;
