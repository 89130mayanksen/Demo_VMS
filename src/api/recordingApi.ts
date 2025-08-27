import axios from "axios";

const API_BASE = "http://localhost:3000/api/v1";

// Fetch all cameras from backend
export const getCameras = async () => {
  try {
    const res = await axios.get(`${API_BASE}/cameras`);
    return res.data.data; // assuming backend sends { data: camerasArray }
  } catch (err: any) {
    console.error("Error fetching cameras:", err.response?.data || err.message);
    return [];
  }
};
