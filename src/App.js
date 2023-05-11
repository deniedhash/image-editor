import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import ImageUpload from "./components/ImageUpload";
import TextEditor from "./components/TextEditor";
import DownloadButton from "./components/DownloadButton";
import "./App.css";

function App() {
  const [canvas, setCanvas] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas("canvas");
    setCanvas(fabricCanvas);
  }, []);

  useEffect(() => {
    if (canvas && imageURL) {
      fabric.Image.fromURL(imageURL, (img) => {
        img.scaleToWidth(canvas.width);
        img.scaleToHeight(canvas.height);
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      });
    }
  }, [canvas, imageURL]);

  const handleImageUpload = (url) => {
    setImageURL(url);
  };

  const handleTextChange = (e) => {
    const newText = new fabric.Text(e.target.value, {
      left: 10,
      top: 10,
      fontFamily: "Arial",
      fontSize: 30,
      fill: "#000",
    });
    canvas.add(newText);
    canvas.setActiveObject(newText);
  };

  const handleFontChange = (e) => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === "text") {
      activeObject.set("fontFamily", e.target.value);
      canvas.renderAll();
    }
  };

  const handleFontSizeChange = (e) => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === "text") {
      activeObject.set("fontSize", parseInt(e.target.value));
      canvas.renderAll();
    }
  };

  const handleColorChange = (color) => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === "text") {
      activeObject.set("fill", color);
      canvas.renderAll();
    }
  };

  return (
    <div className="App">
      <ImageUpload onUpload={handleImageUpload} />
      <TextEditor
        onTextChange={handleTextChange}
        onFontChange={handleFontChange}
        onFontSizeChange={handleFontSizeChange}
        onColorChange={handleColorChange}
      />
      <canvas id="canvas" width="800" height="600"></canvas>
      {canvas && <DownloadButton canvas={canvas} />}
    </div>
  );
}

export default App;
