export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'patient' | 'doctor';
  createdAt: Date;
}

export interface Doctor extends User {
  role: 'doctor';
  specialization: string[];
  bio: string;
  experience: number;
  price: number;
  rating: number;
  licenseNumber: string;
  availability: TimeSlot[];
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth?: string;
  emergencyContact?: string;
  medicalHistory?: string[];
}

export interface Therapist {
  id: string;
  name: string;
  specialization: string[];
  bio: string;
  avatar: string;
  rating: number;
  experience: number;
  price: number;
  availability: TimeSlot[];
}

export interface YogaInstructor {
  id: string;
  name: string;
  certifications: string[];
  bio: string;
  avatar: string;
  rating: number;
  experience: number;
  price: number;
  availability: TimeSlot[];
}

export interface TimeSlot {
  date: string;
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  type: 'counseling' | 'yoga';
  providerId: string;
  providerName: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  meetingLink?: string;
}

export interface SessionType {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  type: 'counseling' | 'yoga';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}