import axios from "axios";

const API_URL = `${process.env.EXPO_PUBLIC_BASE_URL}/smart`;

export const isInFence = async (longitude: number, latitude: number) => {
  try {
    const response = await axios.post(`${API_URL}/geoFencing`, {
      longitude,
      latitude,
    });
    if (response.status === 200 && response.data.status) {
      return { status: true, message: "User is inside the office" };
    } else {
      return { status: false, message: "User is not inside the office" };
    }
  } catch (error) {
    return { status: false, message: "Error checking geofence" };
  }
};
