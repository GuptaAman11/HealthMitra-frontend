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
const base_url = import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:1234';

export const useAllDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${base_url}/api/doctors/alldoctor` , {
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
        const response = await fetch(`${base_url}/api/appointments/get-booked-slots`, {
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




interface BookAppointmentParams {
  doctorId: string;
  date: string; // format: YYYY-MM-DD
  timeSlot: string; // e.g. "11:00"
  serviceType: string; // e.g. "yoga", "counseling"
}

export const useBookAppointment = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const bookAppointment = async ({ doctorId, date, timeSlot, serviceType }: BookAppointmentParams) => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`${base_url}/api/appointments/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
        body: JSON.stringify({ doctorId, date, timeSlot, serviceType }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Booking failed');
      }

      setSuccessMessage('Appointment booked successfully!');
      return data.appointment; // Optional return of the created appointment
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    bookAppointment,
    loading,
    successMessage,
    errorMessage,
  };
};


// hooks/useCompleteAppointment.ts

export const useAttendedAppointment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const attendedAppointment = async (id: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(`${base_url}/api/appointments/attendedappointment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to complete appointment');

      setSuccess(true);
      return data; // Contains appointment and message
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return { attendedAppointment, loading, error, success };
};



