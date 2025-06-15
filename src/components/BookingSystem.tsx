import React, { useState, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar, Clock, User, Star, ArrowLeft, CheckCircle } from 'lucide-react';
import { therapists, yogaInstructors, sessionTypes } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { useAllDoctors, useBookedSlots, useBookAppointment } from '../hooks/bookingHook';
import PaymentOptionModal from './PaymentOptionModal';

interface BookingSystemProps {
  serviceType?: string;
  onBack: () => void;
}

export const BookingSystem: React.FC<BookingSystemProps> = ({ serviceType, onBack }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedService, setSelectedService] = useState(serviceType || '');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingComplete, setBookingComplete] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState({
    name: '',
    specialization: '',
    rating: ''
  });

  const { bookAppointment, loading, successMessage, errorMessage } = useBookAppointment();
  const { doctors, loading: doctorsLoading, error } = useAllDoctors();

  const formattedDate = selectedDate ? selectedDate.toISOString().split('T')[0] : null;

  const bookedSlotsData = useBookedSlots({
    doctorId: step === 3 ? selectedProvider : null,
    date: step === 3 && formattedDate ? formattedDate : null,
  });

  const handleBooking = async () => {
    if (!formattedDate) return;
    const appointment = await bookAppointment({
      doctorId: selectedProvider,
      date: formattedDate,
      timeSlot: selectedTime,
      serviceType: selectedService,
    });
    if (appointment) setBookingComplete(true);
  };

  const filteredServices = sessionTypes.filter(service =>
    !selectedService ||
    selectedService === 'all' ||
    service.type === selectedService ||
    (selectedService === 'counseling' && service.type === 'counseling') ||
    (selectedService === 'yoga' && service.type === 'yoga')
  );
  const getFullyBookedDates = useMemo(() => {
    const bookedDates = bookedSlotsData?.bookedSlots || [];
    return bookedDates.map((dateStr: string) => new Date(dateStr));
  }, [bookedSlotsData?.bookedSlots]);

  const providers = selectedService === 'yoga' ? yogaInstructors : therapists;

  if (doctorsLoading) return <p>Loading doctors...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleBookingClick = () => {
    if (!formattedDate || !selectedProvider || !selectedTime ){
      return alert('Please select all fields before proceeding.');
      
    } ;
    setShowPaymentOptions(true);
  };
  const handleDummyBooking = async () => {
    if (!formattedDate) return;
    const appointment = await bookAppointment({
      doctorId: selectedProvider,
      date: formattedDate,
      timeSlot: selectedTime,
      serviceType: selectedService,
    });
    if (appointment) {
      setBookingComplete(true);
      setShowPaymentOptions(false);
    }
  };
  const handleRazorpayPayment = () => {
    setShowPaymentOptions(false);
    // Proceed with Razorpay flow here
  };
  
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
              onClick={() => navigate('/')}
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
                  {/* kddk */}
                    <div
                      onClick={() => {
                        setSelectedService('counseling');
                        setStep(2);
                      }}
                      className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all"
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Individual Counseling</h3>
                      <p className="text-gray-600 mb-4">One-on-one therapy sessions with licensed mental health professionals</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-blue-600">rs.500</span>
                        <span className="text-gray-500">60 min</span>
                      </div>
                    </div>

                    <div
                      onClick={() => {
                        navigate('/chatbot')
                      }}
                      className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all"
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Couselling</h3>
                      <p className="text-gray-600 mb-4">One-on-one therapy sessions with licensed mental health professionals</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-blue-600">Free</span>
                        <span className="text-gray-500"></span>
                      </div>
                    </div>
    
                  {/* sjndsjkn/ */}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Provider</h2>
                <div className="space-y-6">
                  {doctors.map(provider => (
                    <div
                      key={provider._id}
                      onClick={() => {
                        setSelectedProvider(provider._id);
                        setDoctorDetails({
                          name: provider.name,
                          specialization: provider.specialization.join(', '),
                          rating: provider.rating ? provider.rating.toString() : '4.3'
                        });
                        setStep(3);
                      }}
                      className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all"
                    >
                      <div className="flex items-start space-x-4">
                        <img
                          src={provider.avatar || 'https://img.freepik.com/premium-vector/arzte-stethoskop-werkzeug-im-cartoon-stil_78370-933.jpg?w=1800'}
                          alt={provider.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">{provider.name}</h3>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-gray-600">{provider.rating || 4}</span>
                              {/* <span className="text-gray-500 text-sm">({provider. || 0} reviews)</span> */}
                            </div>
                          </div>
                          <p className="text-gray-600 mb-3">{provider.about}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                              {'specialization' in provider 
                                ? provider.specialization.slice(0, 2).map((spec, index) => (
                                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                                      {spec}
                                    </span>
                                  ))
                                :<></>
                              }
                            </div>
                            <span className="text-lg font-semibold text-gray-900">
                              {provider.price || "Rs.500"}/session
                            </span>
                          </div>
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
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      inline
                      minDate={new Date()}
                      excludeDates={getFullyBookedDates}
                      dayClassName={date =>
                        getFullyBookedDates.some(d => d.toDateString() === date.toDateString())
                          ? 'bg-red-200 text-red-700 rounded-full'
                          : ''
                      }
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Times</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'].map(time => {
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
                    <div className="flex justify-between"><span className="text-gray-600">Doctor:</span><span className="font-medium">{doctorDetails.name}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Specialization:</span><span className="font-medium">{doctorDetails.specialization}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Service:</span><span className="font-medium">{selectedService || "couselleing"}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Date:</span><span className="font-medium">{formattedDate}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Time:</span><span className="font-medium">{selectedTime}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Rating:</span><span className="font-medium">{doctorDetails.rating || "4.3"}</span></div>
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
                    onClick={handleBookingClick}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Confirm Booking
                  </button>
                  {showPaymentOptions && (
                  <PaymentOptionModal
                    onDummyBooking={handleDummyBooking}
                    onRazorpay={handleRazorpayPayment}
                    onCancel={() => setShowPaymentOptions(false)}
                  />
                )}

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
