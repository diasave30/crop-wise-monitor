export type ZoneStatus = "healthy" | "moderate" | "stress";
export type Priority = "high" | "medium" | "low";

export type Zone = {
  id: string;
  name: string;
  status: ZoneStatus;
  healthScore: number;
  ndvi: number;
  soilMoisture: number;
  waterStress: "Low" | "Moderate" | "High";
  irrigationPriority: Priority;
  crop: string;
  lastUpdated: string;
  recommendation: string;
};

export type Farm = {
  id: string;
  name: string;
  location: string;
  cropType: string;
  zones: number;
  overallHealth: number;
  attentionZones: number;
  lastAnalysis: string;
  zoneIds: string[];
};

export type Alert = {
  id: string;
  zone: string;
  severity: "High" | "Medium" | "Resolved";
  title: string;
  reason: string;
  timestamp: string;
  status: "Open" | "Monitoring" | "Resolved";
};

export type Recommendation = {
  id: string;
  zone: string;
  priority: Priority;
  reason: string;
  action: string;
  updated: string;
};