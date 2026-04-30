import api from "@/services/api";

export const fetchVehicleTypes = async () => {
  const response = await api.get("/vehicle-types");
  return response.data;
};

export const fetchFuelTypes = async () => {
  const response = await api.get("/fuel-types");
  return response.data;
};