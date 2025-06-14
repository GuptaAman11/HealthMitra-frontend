import { Therapist, YogaInstructor, Appointment, SessionType, Doctor, Patient } from '../types';

export const therapists: Therapist[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: ['Anxiety', 'Depression', 'Trauma Therapy'],
    bio: 'Licensed clinical psychologist with 8 years of experience specializing in cognitive behavioral therapy and mindfulness-based interventions.',
    avatar: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    rating: 4.9,
    experience: 8,
    price: 120,
    availability: [
      { date: '2024-01-15', time: '09:00', available: true },
      { date: '2024-01-15', time: '10:00', available: false },
      { date: '2024-01-15', time: '14:00', available: true },
    ]
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: ['Stress Management', 'Relationship Counseling', 'ADHD'],
    bio: 'Compassionate therapist focused on helping individuals and couples navigate life\'s challenges with evidence-based therapeutic approaches.',
    avatar: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    rating: 4.8,
    experience: 12,
    price: 135,
    availability: [
      { date: '2024-01-16', time: '11:00', available: true },
      { date: '2024-01-16', time: '15:00', available: true },
    ]
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialization: ['Teen Counseling', 'Family Therapy', 'Eating Disorders'],
    bio: 'Specialized in adolescent and family therapy with a warm, supportive approach that helps families heal and grow together.',
    avatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    rating: 4.9,
    experience: 10,
    price: 125,
    availability: [
      { date: '2024-01-17', time: '09:00', available: true },
      { date: '2024-01-17', time: '13:00', available: true },
    ]
  }
];

export const yogaInstructors: YogaInstructor[] = [
  {
    id: '1',
    name: 'Maya Patel',
    certifications: ['RYT-500', 'Trauma-Informed Yoga', 'Mindfulness-Based Stress Reduction'],
    bio: 'Experienced yoga instructor specializing in therapeutic yoga for mental health and stress relief.',
    avatar: 'https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    rating: 4.9,
    experience: 6,
    price: 45,
    availability: [
      { date: '2024-01-15', time: '07:00', available: true },
      { date: '2024-01-15', time: '18:00', available: true },
    ]
  },
  {
    id: '2',
    name: 'James Wilson',
    certifications: ['RYT-200', 'Yin Yoga', 'Meditation Teacher'],
    bio: 'Gentle yoga practitioner focused on restorative practices for anxiety relief and emotional balance.',
    avatar: 'https://images.pexels.com/photos/3823531/pexels-photo-3823531.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    rating: 4.8,
    experience: 4,
    price: 40,
    availability: [
      { date: '2024-01-16', time: '06:30', available: true },
      { date: '2024-01-16', time: '19:00', available: true },
    ]
  }
];

export const sessionTypes: SessionType[] = [
  {
    id: '1',
    name: 'Individual Counseling',
    description: 'One-on-one therapy session with a licensed mental health professional',
    duration: 50,
    price: 120,
    type: 'counseling'
  },
  {
    id: '2',
    name: 'Couples Counseling',
    description: 'Relationship therapy for couples working through challenges together',
    duration: 75,
    price: 160,
    type: 'counseling'
  },
  {
    id: '3',
    name: 'Therapeutic Yoga',
    description: 'Gentle yoga practice designed for stress relief and emotional healing',
    duration: 60,
    price: 45,
    type: 'yoga'
  },
  {
    id: '4',
    name: 'Mindfulness Meditation',
    description: 'Guided meditation session for anxiety reduction and mental clarity',
    duration: 30,
    price: 35,
    type: 'yoga'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    type: 'counseling',
    providerId: '1',
    providerName: 'Dr. Sarah Johnson',
    patientId: 'p1',
    patientName: 'John Doe',
    date: '2024-01-20',
    time: '14:00',
    duration: 50,
    status: 'scheduled',
    meetingLink: 'https://meet.example.com/session-1'
  },
  {
    id: '2',
    type: 'yoga',
    providerId: '1',
    providerName: 'Maya Patel',
    patientId: 'p1',
    patientName: 'John Doe',
    date: '2024-01-18',
    time: '18:00',
    duration: 60,
    status: 'scheduled',
    meetingLink: 'https://meet.example.com/yoga-1'
  }
];

export const mockDoctors: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@mindfulcare.com',
    phone: '+1-555-0101',
    role: 'doctor',
    specialization: ['Clinical Psychology', 'Anxiety', 'Depression'],
    bio: 'Licensed clinical psychologist with 8 years of experience specializing in cognitive behavioral therapy and mindfulness-based interventions.',
    experience: 8,
    price: 120,
    rating: 4.9,
    licenseNumber: 'PSY12345',
    avatar: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    availability: [
      { date: '2024-01-15', time: '09:00', available: true },
      { date: '2024-01-15', time: '10:00', available: false },
      { date: '2024-01-15', time: '14:00', available: true },
    ],
    createdAt: new Date('2023-01-15')
  }
];

export const mockPatients: Patient[] = [
  {
    id: 'p1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1-555-0102',
    role: 'patient',
    dateOfBirth: '1990-05-15',
    emergencyContact: '+1-555-0103',
    medicalHistory: ['Anxiety', 'Depression'],
    createdAt: new Date('2023-06-01')
  }
];