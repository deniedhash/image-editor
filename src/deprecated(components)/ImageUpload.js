import React, { useRef } from "react";

const ImageUpload = ({ onUpload }) => {
  const inputRef = useRef();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        style={{ display: "none" }}
      />
      <button onClick={() => inputRef.current.click()}>Upload Image</button>
    </div>
  );
};

export default ImageUpload;
