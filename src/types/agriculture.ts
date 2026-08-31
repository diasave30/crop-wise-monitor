export type ZoneStatus = "healthy" | "moderate" | "stress";
export type Priority = "high" | "medium" | "low";
export type WaterStressLevel = "Low" | "Medium" | "Moderate" | "High";

export type CropIntelligenceSummaryData = {
  detectedCrop: string;
  healthScore: number;
  waterStress: WaterStressLevel;
  irrigationPriority: "High" | "Medium" | "Low" | Priority;
  confidence?: number;
  ndvi?: number;
  soilMoisture?: number;
  reasoning?: string;
  actionWhy?: string;
};

export type PipelineStage = {
  id: string;
  name: string;
  status: "completed" | "processing" | "pending";
  output: string;
  details: string;
};

export type ZoneTrendPoint = {
  time: string;
  ndvi: number;
  soilMoisture: number;
  healthScore: number;
};

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
  reasoning?: string;
  canopyTemp?: number;
  evapotranspiration?: number;
  trend?: ZoneTrendPoint[];
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
  suggestedMitigation?: string;
};

export type Recommendation = {
  id: string;
  zone: string;
  priority: Priority;
  reason: string;
  action: string;
  updated: string;
  detectedCrop?: string;
  healthScore?: number;
  waterStress?: WaterStressLevel;
  whyExplanation?: string;
  soilMoistureCurrent?: number;
  soilMoistureTarget?: number;
};

export type DashboardData = {
  overallHealth: number;
  totalZones: number;
  zonesUnderStress: number;
  highPriorityIrrigationZones: number;
  activeAlertsCount: number;
  primarySummary: CropIntelligenceSummaryData;
  recentAlerts: Alert[];
  topRecommendations: Recommendation[];
  healthTrend: { day: string; value: number }[];
  farm: Farm;
};
