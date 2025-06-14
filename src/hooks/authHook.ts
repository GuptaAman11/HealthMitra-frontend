import { useState } from 'react';
import { toast } from 'react-toastify';

interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword?: string;
  role: 'patient' | 'doctor';
  specialization?: string;
  licenseNumber?: string;
  experience?: string;
  bio?: string;
  dateOfBirth?: string;
  emergencyContact?: string;
}
const base_url = import.meta.env.VITE_API_BASE_URL || 'http://localhost:1234';

export const useSignupApi = () => {
  const [loading, setLoading] = useState(false);

  const signup = async (data: SignupPayload) => {
    setLoading(true);

    try {

      const payload = {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        password: data.password,
        userType: data.role === 'patient' ? 'Patient' : 'Doctor',
        ...(data.role === 'doctor'
          ? {
              specialization: data.specialization,
              licenseNumber: data.licenseNumber,
              experience: data.experience,
              bio: data.bio,
            }
          : {
              dateOfBirth: data.dateOfBirth,
              emergencyContact: data.emergencyContact,
            }),
      };

      const res = await fetch(`${base_url}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || 'Signup failed');
        throw new Error(result.message);
      }

      toast.success('Signup successful!');
      return result;
    } catch (error: any) {
      console.error('Signup error:', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};


interface LoginData {
    phone: string;
    password: string;
    role: 'patient' | 'doctor';
  }
  
  export const useLoginApi = () => {
    const [loading, setLoading] = useState(false);
  
    const login = async (data: LoginData) => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:1234/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone: data.phone,
            password: data.password,
            userType: data.role,
          }),
        });
  
        const result = await res.json();
  
        if (!res.ok) {
          toast.error(result.message || 'Login failed');
          throw new Error(result.message);
        }
  
        toast.success('Login successful!');
        return result;
      } catch (err: any) {
        console.error(err);
        throw err;
      } finally {
        setLoading(false);
      }
    };
  
    return { login, loading };
  };