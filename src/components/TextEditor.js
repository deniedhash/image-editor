import React from "react";
import { SketchPicker } from "react-color";

const TextEditor = ({
  onTextChange,
  onFontChange,
  onFontSizeChange,
  onColorChange,
}) => {
  return (
    <div>
      <input type="text" placeholder="Enter text" onChange={onTextChange} />
      <select onChange={onFontChange}>
        <option value="Arial">Arial</option>
        <option value="Verdana">Verdana</option>
        <option value="Tahoma">Tahoma</option>
      </select>
      <input
        type="number"
        placeholder="Font size"
        min="1"
        max="200"
        onChange={onFontSizeChange}
      />
      <SketchPicker color={"#000"} onChangeComplete={(color) => onColorChange(color.hex)} />
    </div>
  );
};

export default TextEditor;
