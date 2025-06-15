import { useEffect, useState } from 'react';

interface Appointment {
  _id: string;
  date: string;
  time: string;
  doctorId: {
    _id: string;
    name: string;
    specialization: string;
  };
  patientId: {
    _id: string;
    name: string;
    phone: string;
  };
}

export const useMyAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pendingCount, setPendingCount] = useState<Number>()
  const [completedCount, setCompletedCount] = useState<Number>()

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:1234/api/appointments/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to fetch appointments');
      }

      const data = await response.json();
      console.log(data)
      setAppointments(data.appointments);
        setPendingCount(data.pendingCount);
        setCompletedCount(data.completedCount);
        
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return { appointments, loading, error, refetch: fetchAppointments , pendingCount, completedCount};
};

export const useMyCompletedAppointments = () => {
    const [completedAppointments, setCompletedAppointments] = useState<Appointment[]>([]);
    
  
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    const fetchCompletedAppointments = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:1234/api/appointments/completed-appointment', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || 'Failed to fetch appointments');
        }
  
        const data = await response.json();
        console.log(data)
        setCompletedAppointments(data);
          
          
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchCompletedAppointments();
    }, []);
  
    return { completedAppointments, loading, error, refetched: fetchCompletedAppointments};
  };
