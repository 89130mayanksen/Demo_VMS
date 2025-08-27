import axios from "axios";
const API_BASE = "http://localhost:3000/api/v1";

export const startStream = async (cameraId: string, sdpOffer: string) => {
  const res = await axios.post(`${API_BASE}/streams/${cameraId}/start`, {
    sdpOffer,
  });
  console.log("startStream response:", res.data);
  return res.data; // contains sdpAnswer
};
