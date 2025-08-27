import axios from "axios";

const API_BASE = "http://localhost:3000/api/v1";

export const getCameras = async () => {
  const res = await axios.get(`${API_BASE}/cameras`);
  console.log(res.data.data);
  return res.data.data;
};

export const addCamera = async (camera: { name: string; rtspUrl: string; pathName: string }) => {
  const res = await axios.post(`${API_BASE}/cameras`, camera);
  return res.data;
};
