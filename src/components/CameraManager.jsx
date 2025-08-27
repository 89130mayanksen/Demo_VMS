import axios from "axios"; // axios is still used for the GET and DELETE calls
import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

const API_BASE =
  "https://ec2-65-0-181-71.ap-south-1.compute.amazonaws.com:5000";

const CameraManager = () => {
  const [name, setName] = useState("");
  const [rtspUrl, setRtspUrl] = useState("");
  const [pathName, setPathName] = useState("");
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const response = await axios.get(`${API_BASE}/cameras`);
        setCameras(response.data);
      } catch (err) {
        console.error("Failed to fetch cameras:", err);
      }
    };
    fetchCameras();
  }, []);

  const handlePresetChange = (preset) => {
    if (preset === "cam1") {
      setName("Test Cam 1");
      setRtspUrl("rtsp://192.168.0.100:8080/h264_ulaw.sdp");
      setPathName("test-cam-1");
    } else if (preset === "cam2") {
      setName("Test Cam 2");
      setRtspUrl("rtsp://test-cam-2-url");
      setPathName("test-cam-2");
    } else {
      setName("");
      setRtspUrl("");
      setPathName("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // ✅ Use the fetch function to add the camera
      const data = { name, rtspUrl };
      const response = await fetch(`${API_BASE}/add-camera`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newCamera = await response.json();
      setCameras((prevCameras) => [...prevCameras, newCamera]);
      setName("");
      setRtspUrl("");
      setPathName("");
    } catch (err) {
      console.error(err);
      alert("Failed to add camera");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (cameraId) => {
    try {
      await axios.delete(`${API_BASE}/cameras/${cameraId}`);
      setCameras((prevCameras) =>
        prevCameras.filter((cam) => cam.id !== cameraId)
      );
    } catch (err) {
      console.error(err);
      alert("Failed to delete camera");
    }
  };

  return (
    <div className="fixed right-0 top-[50px] w-[280px] flex justify-center items-start min-h-screen bg-gray-900 text-white p-6">
      <div className="w-[300px]">
        <h1 className="text-xl font-bold mb-4 text-center">
          Camera Management
        </h1>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <select
              onChange={(e) => handlePresetChange(e.target.value)}
              className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Preset</option>
              <option value="cam1">Test Cam 1</option>
              <option value="cam2">Test Cam 2</option>
            </select>
            <input
              type="text"
              placeholder="Camera Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 rounded bg-gray-700 text-white border border-gray-600"
              required
            />
            <input
              type="text"
              placeholder="RTSP URL"
              value={rtspUrl}
              onChange={(e) => setRtspUrl(e.target.value)}
              className="p-2 rounded bg-gray-700 text-white border border-gray-600"
              required
            />
            <input
              type="text"
              placeholder="Path Name"
              value={pathName}
              onChange={(e) => setPathName(e.target.value)}
              className="p-2 rounded bg-gray-700 text-white border border-gray-600"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:bg-gray-500"
            >
              <Plus size={20} />
            </button>
          </form>
        </div>

        <h2 className="text-lg font-bold mb-3 text-center">Existing Cameras</h2>
        <ul className="space-y-3">
          {cameras.map((cam) => (
            <li
              key={cam.id}
              className="flex justify-between items-center p-3 bg-gray-800 rounded-lg shadow-md"
            >
              <div className="min-w-0 mr-2">
                <h3 className="text-sm font-semibold truncate">{cam.name}</h3>
                <p className="text-xs text-gray-400 truncate">{cam.rtspUrl}</p>
                <p className="text-xs text-gray-400 truncate">
                  Path: {cam.pathName}
                </p>
              </div>
              <button
                onClick={() => handleDelete(cam.id)}
                className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CameraManager;
