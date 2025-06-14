import React, { useState } from 'react';
import { Heart, Eye, EyeOff, User, Stethoscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSignupApi } from '../../hooks/authHook';

interface SignupPageProps {
  onSignup: (userData: any) => void;
  onSwitchToLogin: () => void;
  onBack: () => void;
} 

export const SignupPage: React.FC<SignupPageProps> = ({ onSignup, onSwitchToLogin, onBack }) => {
  const { signup, loading } = useSignupApi();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'patient' as 'patient' | 'doctor',
    // Doctor specific fields
    specialization: '',
    licenseNumber: '',
    experience: '',
    bio: '',
    // Patient specific fields
    dateOfBirth: '',
    emergencyContact: ''
  });
  const navigate = useNavigate();
  const [gender, setGender] = useState('');
  const [language, setLanguage] = useState([]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.role === 'doctor') {
      if (!formData.specialization.trim()) newErrors.specialization = 'Specialization is required';
      if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required';
      if (!formData.experience.trim()) newErrors.experience = 'Experience is required';
      if (!formData.bio.trim()) newErrors.bio = 'Bio is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
  
    try {
      await signup(formData); // Call the custom hook
      navigate('/login');
    } catch (err) {
      // Error already handled in hook via toast
    }
  };
  
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-3 rounded-xl">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-gray-600">Join our mental health community</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">I am a:</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role: 'patient' }))}
                className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                  formData.role === 'patient'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <User className="h-5 w-5" />
                <span className="font-medium">Patient</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role: 'doctor' }))}
                className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                  formData.role === 'doctor'
                    ? 'border-teal-500 bg-teal-50 text-teal-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Stethoscope className="h-5 w-5" />
                <span className="font-medium">Doctor</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.firstName ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                    errors.lastName ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.phone ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your phone number"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>
            {/* Gender Selection */}
<div className="mt-4">
  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
    Gender *
  </label>
  <select
    id="gender"
    name="gender"
    required
    value={gender}
    onChange={(e) => setGender(e.target.value)}
    className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
      errors.gender ? 'border-red-300' : 'border-gray-300'
    }`}
  >
    <option value="">Select your gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>
  {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
</div>

{/* Language Selection */}
{/* <div className="mt-4">
  <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
    Preferred Language *
  </label>
  <select
    id="language"
    name="language"
    required
    value={language}
    onChange={(e) => setLanguage(e.target.value)}
    className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
      errors.language ? 'border-red-300' : 'border-gray-300'
    }`}
  >
    <option value="">Select your language</option>
    <option value="english">English</option>
    <option value="hindi">Hindi</option>
  </select>
  {errors.language && <p className="mt-1 text-sm text-red-600">{errors.language}</p>}
</div> */}

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-3 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.password ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-3 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Role-specific fields */}
            {formData.role === 'doctor' && (
              <div className="space-y-6 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900">Professional Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-2">
                      Specialization *
                    </label>
                    <input
                      id="specialization"
                      name="specialization"
                      type="text"
                      required
                      value={formData.specialization}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                        errors.specialization ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Clinical Psychology, Psychiatry"
                    />
                    {errors.specialization && <p className="mt-1 text-sm text-red-600">{errors.specialization}</p>}
                  </div>

                  <div>
                    <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      License Number *
                    </label>
                    <input
                      id="licenseNumber"
                      name="licenseNumber"
                      type="text"
                      required
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                        errors.licenseNumber ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter your license number"
                    />
                    {errors.licenseNumber && <p className="mt-1 text-sm text-red-600">{errors.licenseNumber}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience *
                  </label>
                  <input
                    id="experience"
                    name="experience"
                    type="number"
                    required
                    value={formData.experience}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.experience ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter years of experience"
                  />
                  {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
                </div>

                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Bio *
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    required
                    value={formData.bio}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.bio ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Tell us about your background and approach to therapy"
                  />
                  {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio}</p>}
                </div>
              </div>
            )}

            {formData.role === 'patient' && (
              <div className="space-y-6 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900">Additional Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact
                    </label>
                    <input
                      id="emergencyContact"
                      name="emergencyContact"
                      type="tel"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors"
                      placeholder="Emergency contact number"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <button type="button" className="text-blue-600 hover:text-blue-500">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button type="button" className="text-blue-600 hover:text-blue-500">
                  Privacy Policy
                </button>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
                formData.role === 'patient'
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-teal-600 hover:bg-teal-700'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => {
                  onSwitchToLogin();
                  navigate('/login'); // Uncomment if using react-router
                }
                }
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>

          <div className="mt-4 text-center">
          <button
            onClick={() => {
              navigate('/');
            }}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            ← Back to home
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};