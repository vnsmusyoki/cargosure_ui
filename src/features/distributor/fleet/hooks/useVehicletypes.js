import { useQuery } from "@tanstack/react-query";
import { fetchVehicleTypes } from "../api/fleetApi";

const useVehicleTypes = () => {
  return useQuery({
    queryKey: ["vehicleTypes"],
    queryFn: fetchVehicleTypes,
  });
};

export default useVehicleTypes;
