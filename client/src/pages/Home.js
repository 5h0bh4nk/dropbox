import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Box, Typography, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Snackbar, Alert
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchFiles } from "../redux/fileSlice";
import { Visibility, Download, Share } from "@mui/icons-material";
import { motion } from "framer-motion";
import UploadFile from "../components/UploadFile";
import { handleDownload, handleShare } from "../utils/fileUtils";

const Home = () => {
  const [message, setMessage] = useState({type: "", text: ""})
  const { list, loading } = useSelector((state) => state.files);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchFiles());
  }, [dispatch]);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f9f9f9", padding: "20px", position: "relative", justifyItems: "anchor-center" }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4, justifyContent: "space-around", display: "flex" }}>
        Your Uploads
      </Typography>

      <UploadFile onUploadSuccess={() => {
            dispatch(fetchFiles())}
        }
      />

      {/* Show Loading Spinner */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
          <CircularProgress size={50} />
        </Box>
      ) : list.length === 0 ? (
        <Typography sx={{ textAlign: "center", color: "gray", mt: 4 }}>
          No files available. Upload your first file!
        </Typography>
      ) : (
        <Table sx={{ width: "80%" }}>
        {/* Table Header */}
        <TableHead>
          <TableRow sx={{ backgroundColor: "#1976D2", color: "white" }}>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Filename</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>File Type</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">View</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">Download</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">Share</TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {list.map((file) => (
            <TableRow key={file._id} component={motion.tr} whileHover={{ scale: 1.02 }}>
              <TableCell>{file.filename}</TableCell>
              <TableCell>{file.fileType}</TableCell>
              
              {/* View Button */}
              <TableCell align="center">
                <IconButton component={Link} to={`/file/${file._id}`} color="primary">
                  <Visibility />
                </IconButton>
              </TableCell>

              {/* Download Button */}
              <TableCell align="center">
                <IconButton color="secondary" 
                    onClick={() => handleDownload(file.key, file.filename)}
                >
                  <Download />
                </IconButton>
              </TableCell>

              {/* Share Button */}
              <TableCell align="center">
                <IconButton color="secondary" 
                    onClick={() =>{ handleShare(file._id); setMessage({type: "success", text: "Link Copied Successfully !"})}}
                >
                  <Share />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      )}

        <Snackbar open={!!message.text} autoHideDuration={3000} onClose={() => setMessage({ type: "", text: "" })}>
            <Alert severity={message.type}>{message.text}</Alert>
        </Snackbar>
    </Box>
  );
};

export default Home;
