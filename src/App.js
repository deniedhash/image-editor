import React, { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import { TextField, Button } from "@mui/material";

const App = () => {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 960,
      height: 540,
      backgroundColor: "black",
    });

    // Set Canvas object on window for debugging
    window.canvas = canvas;
  }, []);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (f) => {
      const data = f.target.result;
      fabric.Image.fromURL(data, (img) => {
        // Calculate the scale
        const scaleX = canvasRef.current.width / img.width;
        const scaleY = canvasRef.current.height / img.height;
        const scale = Math.min(scaleX, scaleY);

        // Scale the image
        img.scaleX = scale;
        img.scaleY = scale;

        // Set the image as the background of the canvas
        window.canvas.setBackgroundImage(
          img,
          window.canvas.renderAll.bind(window.canvas),
          {
            top: 0,
            left: 0,
            originX: "left",
            originY: "top",
            scaleX: scaleX,
            scaleY: scaleY,
          }
        );

        // Set the canvas background color
        window.canvas.setBackgroundColor(
          backgroundColor,
          window.canvas.renderAll.bind(window.canvas)
        );
      });
    };
    reader.readAsDataURL(file);
  };

  const [text, setText] = useState("");
  const [color, setColor] = useState("black");
  const [font, setFont] = useState("Arial");
  const [size, setSize] = useState(16);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [backgroundColor, setBackgroundColor] = useState("");

  const handleTextChange = (event) => setText(event.target.value);
  const handleColorChange = (event) => setColor(event.target.value);
  const handleFontChange = (event) => setFont(event.target.value);
  const handleSizeChange = (event) => setSize(event.target.value);
  //   const handleCoordsChange = (event) => setCoords(event.target.value);

  useEffect(() => {
    if (window.canvas) {
      window.canvas.setBackgroundColor(
        backgroundColor,
        window.canvas.renderAll.bind(window.canvas)
      );
    }
  }, [backgroundColor]);

  const addText = () => {
    const textObj = new fabric.IText(text, {
      left: coords.x,
      top: coords.y,
      fill: color,
      fontFamily: font,
      fontSize: size,
      editable: true,
    });
    window.canvas.add(textObj);
    window.canvas.setActiveObject(textObj);
  };

  const download = () => {
    const dataUrl = window.canvas.toDataURL({ format: "png" });
    const link = document.createElement("a");
    link.download = "edited_image.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleUpload}
      />
      <Button onClick={() => fileInputRef.current.click()}>Upload Image</Button>
      <TextField
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text"
      />
      <label htmlFor="textColor">Text Color: </label>
      <input
        type="color"
        id="textColor"
        name="textColor"
        value={color}
        onChange={handleColorChange}
      />
      <label htmlFor="textSize">Text Size: </label>
      <input
        type="number"
        id="textSize"
        name="textSize"
        value={size}
        onChange={handleSizeChange}
      />
      <label htmlFor="font">Font: </label>
      <select id="font" name="font" value={font} onChange={handleFontChange}>
        <option value="Arial">Arial</option>
        <option value="Helvetica">Helvetica</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
        <option value="Verdana">Verdana</option>
        <option value="Trebuchet MS">Trebuchet MS</option>
        <option value="Georgia">Georgia</option>
      </select>

      <label htmlFor="xCoord">X Coordinate: </label>
      <input
        type="number"
        id="xCoord"
        name="xCoord"
        value={coords.x}
        onChange={(e) => setCoords({ ...coords, x: Number(e.target.value) })}
      />

      <label htmlFor="yCoord">Y Coordinate: </label>
      <input
        type="number"
        id="yCoord"
        name="yCoord"
        value={coords.y}
        onChange={(e) => setCoords({ ...coords, y: Number(e.target.value) })}
      />

      <Button onClick={addText}>Add Text</Button>
      <label htmlFor="backgroundColor">Background Color: </label>
      <input
        type="color"
        id="backgroundColor"
        name="backgroundColor"
        value={backgroundColor}
        onChange={(e) => setBackgroundColor(e.target.value)}
      />

      <Button onClick={download}>Download</Button>
      <canvas ref={canvasRef} id="c" />
    </div>
  );
};

export default App;
