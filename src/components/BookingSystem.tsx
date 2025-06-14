import React, { useState } from 'react';
import { Calendar, Clock, User, Star, ArrowLeft, CheckCircle } from 'lucide-react';
import { therapists, yogaInstructors, sessionTypes } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { useAllDoctors, useBookedSlots } from '../hooks/bookingHook';

interface BookingSystemProps {
  serviceType?: string;
  onBack: () => void;
}

export const BookingSystem: React.FC<BookingSystemProps> = ({ serviceType, onBack }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(serviceType || '');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingComplete, setBookingComplete] = useState(false);

  const { doctors, loading, error } = useAllDoctors();

  // Conditional fetch inside Step 3
  let bookedSlotsData: { bookedSlots: string[]; loading: boolean; error: string | null } = { bookedSlots: [], loading: false, error: null };
  if (step === 3 && selectedProvider && selectedDate) {
    bookedSlotsData = useBookedSlots({
      doctorId: selectedProvider,
      date: selectedDate,
    });
  }

  const handleBooking = () => {
    setBookingComplete(true);
  };

  const filteredServices = sessionTypes.filter(service =>
    !selectedService ||
    selectedService === 'all' ||
    service.type === selectedService ||
    (selectedService === 'counseling' && service.type === 'counseling') ||
    (selectedService === 'yoga' && service.type === 'yoga')
  );

  const providers = selectedService === 'yoga' ? yogaInstructors : therapists;

  if (loading) return <p>Loading doctors...</p>;
  if (error) return <p>Error: {error}</p>;

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-8">Your appointment has been successfully scheduled.</p>
            <button
              onClick={onBack}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span onClick={() => navigate('/services')}>Back to Services</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-gray-50 px-8 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Step {step} of 4</span>
              <span className="text-sm text-gray-500">Book Your Session</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="p-8">
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Service</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredServices.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => {
                        setSelectedService(service.type);
                        setStep(2);
                      }}
                      className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all"
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-blue-600">${service.price}</span>
                        <span className="text-gray-500">{service.duration} min</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Provider</h2>
                <div className="space-y-6">
                  {doctors.map((provider) => (
                    <div
                      key={provider.id}
                      onClick={() => {
                        setSelectedProvider(provider.id);
                        setStep(3);
                      }}
                      className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all"
                    >
                      <div className="flex items-start space-x-4">
                        <img
                          src={provider.avatar || 'https://via.placeholder.com/64'}
                          alt={provider.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">{provider.name}</h3>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-gray-600">{provider.rating || 4}</span>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-3">{provider.bio}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Date & Time</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Dates</h3>
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                        <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                          {day}
                        </div>
                      ))}
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => {
                        const formattedDate = `2024-01-${date.toString().padStart(2, '0')}`;
                        return (
                          <button
                            key={date}
                            onClick={() => setSelectedDate(formattedDate)}
                            className={`p-2 text-sm rounded-lg hover:bg-blue-100 transition-colors ${
                              selectedDate === formattedDate
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-700 hover:text-blue-600'
                            }`}
                          >
                            {date}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Times</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'].map((time) => {
                        const isBooked = bookedSlotsData.bookedSlots.includes(time);
                        return (
                          <button
                            key={time}
                            onClick={() => {
                              if (!isBooked) {
                                setSelectedTime(time);
                                setStep(4);
                              }
                            }}
                            disabled={isBooked}
                            className={`p-3 text-sm rounded-lg border-2 transition-all ${
                              selectedTime === time
                                ? 'border-blue-600 bg-blue-50 text-blue-600'
                                : isBooked
                                ? 'bg-red-100 text-red-500 cursor-not-allowed'
                                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                    {bookedSlotsData.loading && <p className="mt-2 text-sm text-gray-500">Loading slots...</p>}
                    {bookedSlotsData.error && <p className="mt-2 text-sm text-red-500">{bookedSlotsData.error}</p>}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Confirm Your Booking</h2>
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-medium">{selectedService}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{selectedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:border-gray-400 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleBooking}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
