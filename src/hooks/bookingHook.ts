import { useEffect, useState } from 'react';

export interface Doctor {
  _id: string;
  name: string;
  specialization: string[];
  avatar?: string;
  rating?: number;
  availability: {
    day: string;
    slots: string[];
  }[];
  [key: string]: any; // for optional additional fields
}

export const useAllDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:1234/api/doctors/alldoctor' , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token') || ''}`
            }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setDoctors(data.doctors || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch doctors');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return { doctors, loading, error };
};





interface UseBookedSlotsProps {
  doctorId: string | null;
  date: string | null; // format: "YYYY-MM-DD"
}

export const useBookedSlots = ({ doctorId, date }: UseBookedSlotsProps) => {
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!doctorId || !date) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch('http://localhost:5000/api/appointments/get-booked-slots', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`, 
          },
          body: JSON.stringify({ doctorId, date }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch booked slots');
        }

        setBookedSlots(data.bookedSlots || []);
      } catch (err: any) {
        setError(err.message);
        setBookedSlots([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedSlots();
  }, [doctorId, date]);

  return { bookedSlots, loading, error };
};
