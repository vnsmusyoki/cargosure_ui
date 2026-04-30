import { useQuery } from "@tanstack/react-query";
import { fetchFuelTypes } from "../api/fleetApi";

const useFuelTypes = () => {
  return useQuery({
    queryKey: ["fuelTypes"],
    queryFn: fetchFuelTypes,
  });
};

export default useFuelTypes;
