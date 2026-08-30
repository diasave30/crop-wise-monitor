import { alerts, farms, getZone, recommendations, zones } from "@/data/mock-data";

export const api = {
  async getFarms() { return farms; },
  async getFarmDetails(id: string) { return farms.find((farm) => farm.id === id) ?? farms[0]; },
  async getZoneAnalysis(id: string) { return getZone(id); },
  async getAlerts() { return alerts; },
  async getIrrigationRecommendations() { return recommendations; },
  async getZones() { return zones; },
};