import { useQuery } from "@tanstack/react-query";
import { fetchOrganizationVehicles } from "../api/fleetApi";

const useFleetVehicles = () => {
  return useQuery({
    queryKey: ["fleet-vehicles"],
    queryFn: fetchOrganizationVehicles,
    staleTime: 1000 * 60 * 5,
  });
};

export default useFleetVehicles;
