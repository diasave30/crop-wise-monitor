import type { Alert, Farm, Recommendation, Zone } from "@/types/agriculture";

export const farms: Farm[] = [
  {
    id: "green-valley",
    name: "Green Valley Farm",
    location: "Davis, California",
    cropType: "Winter wheat",
    zones: 12,
    overallHealth: 84,
    attentionZones: 3,
    lastAnalysis: "22 min ago",
    zoneIds: ["Z01", "Z02", "Z03", "Z04", "Z05", "Z06", "Z07", "Z08", "Z09", "Z10", "Z11", "Z12"],
  },
  {
    id: "north-meadow",
    name: "North Meadow Estate",
    location: "Salinas, California",
    cropType: "Leafy greens",
    zones: 8,
    overallHealth: 91,
    attentionZones: 1,
    lastAnalysis: "48 min ago",
    zoneIds: ["N01", "N02", "N03", "N04", "N05", "N06", "N07", "N08"],
  },
  {
    id: "redwood-orchard",
    name: "Redwood Orchard",
    location: "Healdsburg, California",
    cropType: "Almonds",
    zones: 6,
    overallHealth: 78,
    attentionZones: 2,
    lastAnalysis: "1 hr ago",
    zoneIds: ["R01", "R02", "R03", "R04", "R05", "R06"],
  },
];

export const zones: Zone[] = [
  { id: "Z01", name: "North field", status: "healthy", healthScore: 92, ndvi: 0.78, soilMoisture: 61, waterStress: "Low", irrigationPriority: "low", crop: "Winter wheat", lastUpdated: "18 min ago", recommendation: "Maintain current irrigation cycle." },
  { id: "Z02", name: "North east field", status: "healthy", healthScore: 88, ndvi: 0.73, soilMoisture: 58, waterStress: "Low", irrigationPriority: "low", crop: "Winter wheat", lastUpdated: "18 min ago", recommendation: "Maintain current irrigation cycle." },
  { id: "Z03", name: "East field", status: "moderate", healthScore: 76, ndvi: 0.61, soilMoisture: 41, waterStress: "Moderate", irrigationPriority: "medium", crop: "Winter wheat", lastUpdated: "20 min ago", recommendation: "Review soil nutrient baseline this cycle." },
  { id: "Z04", name: "Central field", status: "healthy", healthScore: 86, ndvi: 0.70, soilMoisture: 54, waterStress: "Low", irrigationPriority: "low", crop: "Winter wheat", lastUpdated: "21 min ago", recommendation: "Maintain current irrigation cycle." },
  { id: "Z05", name: "South east field", status: "healthy", healthScore: 89, ndvi: 0.74, soilMoisture: 57, waterStress: "Low", irrigationPriority: "low", crop: "Winter wheat", lastUpdated: "21 min ago", recommendation: "Maintain current irrigation cycle." },
  { id: "Z06", name: "South field", status: "healthy", healthScore: 90, ndvi: 0.76, soilMoisture: 60, waterStress: "Low", irrigationPriority: "low", crop: "Winter wheat", lastUpdated: "22 min ago", recommendation: "Maintain current irrigation cycle." },
  { id: "Z07", name: "West north field", status: "healthy", healthScore: 85, ndvi: 0.69, soilMoisture: 52, waterStress: "Low", irrigationPriority: "low", crop: "Winter wheat", lastUpdated: "22 min ago", recommendation: "Maintain current irrigation cycle." },
  { id: "Z08", name: "West field", status: "stress", healthScore: 58, ndvi: 0.42, soilMoisture: 16, waterStress: "High", irrigationPriority: "high", crop: "Winter wheat", lastUpdated: "23 min ago", recommendation: "Prioritize irrigation within the next cycle." },
  { id: "Z09", name: "South west field", status: "healthy", healthScore: 83, ndvi: 0.67, soilMoisture: 49, waterStress: "Low", irrigationPriority: "low", crop: "Winter wheat", lastUpdated: "24 min ago", recommendation: "Maintain current irrigation cycle." },
  { id: "Z10", name: "West central field", status: "healthy", healthScore: 87, ndvi: 0.71, soilMoisture: 55, waterStress: "Low", irrigationPriority: "low", crop: "Winter wheat", lastUpdated: "24 min ago", recommendation: "Maintain current irrigation cycle." },
  { id: "Z11", name: "South central field", status: "moderate", healthScore: 72, ndvi: 0.58, soilMoisture: 35, waterStress: "Moderate", irrigationPriority: "medium", crop: "Winter wheat", lastUpdated: "25 min ago", recommendation: "Monitor moisture and verify soil nutrient levels." },
  { id: "Z12", name: "Lower field", status: "healthy", healthScore: 81, ndvi: 0.65, soilMoisture: 46, waterStress: "Low", irrigationPriority: "low", crop: "Winter wheat", lastUpdated: "25 min ago", recommendation: "Maintain current irrigation cycle." },
];

export const alerts: Alert[] = [
  { id: "a1", zone: "Z08", severity: "High", title: "High water stress detected", reason: "Soil moisture below 20% threshold", timestamp: "4 min ago", status: "Open" },
  { id: "a2", zone: "Z03", severity: "Medium", title: "Vegetation health declining", reason: "NDVI down 8% over the last 48 hours", timestamp: "2 hr ago", status: "Monitoring" },
  { id: "a3", zone: "Z11", severity: "Medium", title: "Moisture variance detected", reason: "Readings differ from neighboring zones", timestamp: "5 hr ago", status: "Monitoring" },
  { id: "a4", zone: "Z05", severity: "Resolved", title: "Irrigation cycle complete", reason: "Target soil moisture reached", timestamp: "Yesterday", status: "Resolved" },
];

export const recommendations: Recommendation[] = [
  { id: "r1", zone: "Z08", priority: "high", reason: "Low moisture and declining vegetation health.", action: "Prioritize irrigation within the next recommended cycle.", updated: "2 min ago" },
  { id: "r2", zone: "Z03", priority: "medium", reason: "Moderate moisture with a downward NDVI trend.", action: "Review soil baseline and monitor through the next scan.", updated: "18 min ago" },
  { id: "r3", zone: "Z11", priority: "medium", reason: "Moisture below the local field average.", action: "Recheck sensor reading before the next irrigation cycle.", updated: "25 min ago" },
];

export const healthTrend = [
  { day: "Aug 01", value: 76 }, { day: "Aug 05", value: 79 }, { day: "Aug 09", value: 78 },
  { day: "Aug 13", value: 82 }, { day: "Aug 17", value: 85 }, { day: "Aug 21", value: 83 },
  { day: "Aug 25", value: 86 }, { day: "Aug 29", value: 84 },
];

export const getZone = (id: string) => zones.find((zone) => zone.id === id) ?? zones[7];