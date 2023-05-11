import React from "react";

const DownloadButton = ({ canvas }) => {
  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "edited-image.png";
    link.click();
  };

  return <button onClick={downloadImage}>Download Image</button>;
};

export default DownloadButton;
