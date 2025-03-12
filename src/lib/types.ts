
export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  primary: boolean;
}

export interface AlertHistoryItem {
  id: string;
  timestamp: Date;
  detectedSound: string;
  confidenceScore: number;
  resolved: boolean;
  contactsNotified: EmergencyContact[];
}

export interface SystemStatus {
  listening: boolean;
  batteryLevel: number;
  signalStrength: number;
  lastHeartbeat: Date;
}

export type DetectionSensitivity = 'low' | 'medium' | 'high';

export interface UserSettings {
  sensitivity: DetectionSensitivity;
  autoResolveTimeout: number; // in minutes
  notificationSounds: boolean;
  detectKeywords: string[];
}
