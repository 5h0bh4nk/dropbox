import { downloadFile } from "../api/fileService";

export const handleDownload = async (fileKey, fileName) => {
    try {
        const response = await downloadFile(fileKey)
        const url = window.URL.createObjectURL(response.data);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();

        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Download failed:", error);
    }
}

export const handleShare = async (fileId) => {
    try {
        // Generate a shareable link (assuming your API serves files via a public URL)
        const shareableLink = `${window.location.origin}/file/${fileId}`;
        await navigator.clipboard.writeText(shareableLink);
        
    } catch (error) {
        console.error("Error sharing file:", error);
    }
};