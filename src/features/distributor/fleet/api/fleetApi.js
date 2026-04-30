import api from "@/services/api";

export const fetchVehicleTypes = async () => {
  const response = await api.get("/VehicleTypes/vehicle-types");
  return response.data;
};

export const fetchFuelTypes = async () => {
  const response = await api.get("/FuelTypes/fuel-types");
  return response.data;
};

const OWNER_TYPE_MAP = { company: 1, leased: 2, 'owner-driver': 3 };
const TYRE_CONDITION_MAP = { new: 1, good: 2, fair: 3, poor: 4, critical: 5 };
const VEHICLE_CONDITION_MAP = { excellent: 1, good: 2, fair: 3, poor: 4 };
const STATUS_MAP = { active: 1, inactive: 2, maintenance: 3, retired: 4 };

const toUtcDate = (dateStr) => {
  if (!dateStr) return null;
  return new Date(dateStr + 'T00:00:00Z').toISOString();
};

export const registerVehicle = async (formData) => {
  const maxLoadKg = formData.loadCapacityUnit === 'tonnes'
    ? parseFloat(formData.maxLoadCapacity || 0) * 1000
    : parseFloat(formData.maxLoadCapacity || 0);

  const payload = {
    // Basic info
    plateNumber: formData.registrationNumber,
    vehicleTypeId: parseInt(formData.vehicleType) || 0,
    make: formData.make,
    model: formData.model,
    year: parseInt(formData.year) || 0,
    colour: formData.color || '',
    chassisNumber: formData.chassisNumber,
    engineNumber: formData.engineNumber,
    fuelTypeId: parseInt(formData.fuelType) || 0,

    // Capacity
    maxLoadKg,
    volumeCubicMeters: parseFloat(formData.volumeCapacity) || 0,
    palletCapacity: parseInt(formData.palletCapacity) || 0,
    hasRefrigeration: formData.hasRefrigeration,
    minTemperature: formData.hasRefrigeration && formData.refrigerationTempMin
      ? parseFloat(formData.refrigerationTempMin) : null,
    maxTemperature: formData.hasRefrigeration && formData.refrigerationTempMax
      ? parseFloat(formData.refrigerationTempMax) : null,

    // Ownership
    ownerTypeId: OWNER_TYPE_MAP[formData.ownerType] || 0,
    assignedDepotName: formData.assignedDepot || null,
    primaryDriverName: formData.primaryDriver || null,
    backupDriverName: formData.backupDriver || null,
    assignedRoute: formData.assignedRoute || null,
    assignedZones: formData.assignedZones || [],

    // Compliance
    insurancePolicyNumber: formData.insurancePolicyNo,
    insuranceExpiryDate: toUtcDate(formData.insuranceExpiry),
    roadTaxCertificateNumber: formData.roadTaxCertNo || null,
    roadTaxExpiryDate: toUtcDate(formData.roadTaxExpiry),
    fitnessCertificateNumber: formData.fitnessCertNo,
    fitnessCertificateExpiryDate: toUtcDate(formData.fitnessExpiry),
    speedGovernorCertificate: formData.speedGovernorCertNo || null,
    speedGovernorExpiryDate: toUtcDate(formData.speedGovernorExpiry),
    gpsDeviceId: formData.trackerDeviceId || null,
    policeClearance: formData.policeClearanceNo || null,
    policeClearanceExpiryDate: toUtcDate(formData.policeClearanceExpiry),

    // Maintenance
    currentMileage: parseInt(formData.currentMileage) || 0,
    lastServiceDate: toUtcDate(formData.lastServiceDate),
    lastServiceMileage: formData.lastServiceMileage ? parseInt(formData.lastServiceMileage) : null,
    nextServiceDueDate: toUtcDate(formData.nextServiceDue),
    nextServiceMileage: formData.nextServiceMileage ? parseInt(formData.nextServiceMileage) : null,
    tyreConditionId: TYRE_CONDITION_MAP[formData.tyreCondition] || 0,
    lastTyreReplacementDate: toUtcDate(formData.tyreLastReplacement),
    tyreReplacementMileage: formData.tyreReplacementMileage ? parseInt(formData.tyreReplacementMileage) : null,
    vehicleConditionId: VEHICLE_CONDITION_MAP[formData.vehicleCondition] || 0,
    conditionNotes: formData.conditionNotes || null,

    // Operational
    statusId: STATUS_MAP[formData.status] || 1,
    availabilitySchedule: formData.availabilitySchedule || [],
    fuelCardNumber: formData.fuelCardNumber || null,
    trackingProvider: formData.trackingProvider || null,

    notes: formData.generalNotes || null,
  };

  const response = await api.post('/Vehicles/register', payload);
  return response.data;
};