const MIME_TO_EXTENSION: Record<string, string> = {
  "application/pdf": ".pdf",
  "application/json": ".json",
  "application/xml": ".xml",
  "application/zip": ".zip",
  "application/msword": ".doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    ".docx",
  "application/vnd.ms-excel": ".xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ".xlsx",
  "application/vnd.ms-powerpoint": ".ppt",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    ".pptx",
  "text/plain": ".txt",
  "text/html": ".html",
  "text/css": ".css",
  "text/javascript": ".js",
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
  "image/webp": ".webp",
  "audio/mpeg": ".mp3",
  "audio/wav": ".wav",
  "audio/ogg": ".ogg",
  "video/mp4": ".mp4",
  "video/webm": ".webm",
  "video/ogg": ".ogv",
};

export async function downloadFile(
  fileUrl: string | undefined,
  fileName: string,
) {
  if (!fileUrl) return;
  try {
    // Fetch the file
    const response = await fetch(fileUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Get the Content-Type header
    const contentType = response.headers.get("content-type")?.split(";")[0];
    if (!contentType) {
      throw new Error("No content type specified in response");
    }

    // Get the file extension based on MIME type
    const fileExtension = MIME_TO_EXTENSION[contentType] ?? ".bin";

    // Get the blob data
    const blob = await response.blob();

    // Determine the filename
    let finalFileName = fileName;

    if (!finalFileName) {
      // Try to get filename from Content-Disposition header
      const contentDisposition = response.headers.get("content-disposition");
      if (contentDisposition) {
        const regex = /filename="(.+?)"/;
        const matched = regex.exec(contentDisposition);
        if (matched) {
          finalFileName = matched?.[0];
          // Remove any existing extension if we found one in the header
          finalFileName = finalFileName.replace(/\.[^/.]+$/, "");
        }
      }

      // If still no filename, generate one based on timestamp
      if (!finalFileName) {
        finalFileName = `download-${Date.now()}`;
      }
    }

    // Add the correct extension
    finalFileName += fileExtension;

    // Create a blob URL
    const blobUrl = window.URL.createObjectURL(
      new Blob([blob], { type: contentType }),
    );

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = finalFileName;

    // Append to document, click, and cleanup
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Release the blob URL
    window.URL.revokeObjectURL(blobUrl);

    return {
      fileName: finalFileName,
      mimeType: contentType,
      size: blob.size,
    };
  } catch (error) {
    console.error("Download failed:", error);
    throw error;
  }
}
