
export type Role = 'patient' | 'doctor';

export enum SOSStatus {
  IDLE = 'IDLE',
  SENDING = 'SENDING',
  SENT = 'SENT',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export interface MedicalProfile {
  name: string;
  bloodGroup: string;
  allergies: string[];
  medicalConditions: string[];
  emergencyContact: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export interface SOSRequest {
  patient: MedicalProfile;
  location: Location;
  timestamp: number;
}

export interface Patient {
  id: string;
  name: string;
  condition: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
}
