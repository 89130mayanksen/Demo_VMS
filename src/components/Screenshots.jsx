import UploadTile from "./UploadTile";
import React, { useState, useRef } from "react";
import ScreenshotViewer from "./ScreenshotViewer";
import screenshot17 from "../assets/screenshots/screenshot17.png";
import screenshot18 from "../assets/screenshots/screenshot18.png";
import screenshot19 from "../assets/screenshots/screenshot19.png";
import screenshot20 from "../assets/screenshots/screenshot20.png";

export default function Screenshots() {
  const [screenshots, setScreenshots] = useState([
    {
      fileName: "screenshot-17154212.png",
      dataUrl: screenshot17,
    },
    {
      fileName: "my-favorite-ss.png",
      dataUrl: screenshot18,
    },
    {
      fileName: "project-demo.png",
      dataUrl: screenshot19,
    },
    {
      fileName: "project-demo-333.png",
      dataUrl: screenshot20,
    },
    {
      fileName: "child-study-table.png",
      dataUrl: screenshot20,
    },
  ]);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newScreenshot = {
          fileName: file.name,
          dataUrl: e.target.result,
        };
        setScreenshots((prevScreenshots) => [
          ...prevScreenshots,
          newScreenshot,
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex mt-[40px] h-[600px] w-[1200px]">
      <ScreenshotViewer screenshots={screenshots} />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <div onClick={handleUploadClick}>
        <UploadTile />
      </div>
    </div>
  );
}
