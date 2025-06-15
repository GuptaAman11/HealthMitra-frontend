import React, { useState } from 'react';
import { Calendar, Clock, Video, FileText, User, Settings, Bell, Star, Users, TrendingUp, DollarSign } from 'lucide-react';


import { useMyAppointments , useMyCompletedAppointments } from '../hooks/apointHook';
import { useNavigate } from 'react-router-dom';

export const DoctorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  const navigate = useNavigate();
  
  const { appointments, loading, error,  pendingCount , completedCount } = useMyAppointments();
    const { completedAppointments } = useMyCompletedAppointments();
  const tabs = [
    { id: 'appointments', name: 'Appointments', icon: Calendar },
    { id: 'patients', name: 'Patients', icon: Users },
    { id: 'schedule', name: 'Schedule', icon: Clock },
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your practice and patient appointments</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Dr. Sarah Johnson</h3>
                  <p className="text-gray-600 text-sm">Clinical Psychologist</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-teal-50 text-teal-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'appointments' && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Total Patients</p>
                        <p className="text-2xl font-bold text-gray-900">{(pendingCount ?? 0).toString()}</p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Calendar className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">checked Patient</p>
                        <p className="text-2xl font-bold text-gray-900">{(completedCount ?? 0).toString()}</p>
                      </div>
                      <div className="bg-green-100 p-3 rounded-lg">
                        <Users className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">This Month</p>
                        <p className="text-2xl font-bold text-gray-900">₹{(appointments.length)*500}</p>
                      </div>
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <DollarSign className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Rating</p>
                        <p className="text-2xl font-bold text-gray-900">4.9</p>
                      </div>
                      <div className="bg-yellow-100 p-3 rounded-lg">
                        <Star className="h-6 w-6 text-yellow-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Today's Appointments */}
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Today's Appointments</h2>
                  </div>
                  <div className="p-6">
                    {appointments.length > 0 ? (
                      <div className="space-y-4">
                        {appointments.map((appointment) => (
                          <div key={appointment._id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="bg-teal-100 p-3 rounded-lg">
                                  <User className="h-5 w-5 text-teal-600" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-900">{appointment.patientId?.name || "aman"}</h3>
                                  <p className="text-gray-600 capitalize">{appointment.doctorId.specialization[0] || "counselling"} Session</p>
                                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                    <span className="flex items-center space-x-1">
                                      <Clock className="h-4 w-4" />
                                      <span>{appointment.time}</span>
                                    </span>
                                    <span>{60} min</span>
                                    <span className="flex items-center space-x-1">
                                      <Clock className="h-4 w-4" />
                                      <span>{appointment.date}</span>
                                    </span>
                                  </div>
                                  {/* {appointment.notes && (
                                    <p className="text-sm text-gray-600 mt-1">{appointment.notes}</p>
                                  )} */}
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2"
                                onClick={() => navigate(`/video/${(appointment as any).roomId}`)}>
                                  <Video className="h-4 w-4" />
                                  <span>Start Session</span>
                                </button>
                                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                  <FileText className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No appointments scheduled for today</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Recent Sessions */}
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Completed Session</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {completedAppointments.length > 0 ? completedAppointments.map((appointment: any) => (
                        <div key={appointment._id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="bg-green-100 p-3 rounded-lg">
                                <User className="h-5 w-5 text-green-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">{appointment.patientName}</h3>
                                <p className="text-gray-600 capitalize">{appointment.type} Session</p>
                                <p className="text-sm text-gray-500">{appointment.date} at {appointment.time} - Completed</p>
                                {/* {appointment.notes && (
                                  <p className="text-sm text-gray-600 mt-1">{appointment.notes}</p>
                                )} */}
                              </div>
                            </div>
                            <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                              View Notes
                            </button>
                          </div>
                        </div>
                      )) : <>No completed session</>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'patients' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Patient Management</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">John Doe</h3>
                        <p className="text-gray-600 text-sm">Last session: Jan 15, 2024</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                        View History
                      </button>
                      <button className="bg-teal-600 text-white px-3 py-1 rounded text-sm hover:bg-teal-700">
                        Schedule
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Sarah Wilson</h3>
                        <p className="text-gray-600 text-sm">New patient</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                        View Profile
                      </button>
                      <button className="bg-teal-600 text-white px-3 py-1 rounded text-sm hover:bg-teal-700">
                        Schedule
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Schedule Management</h2>
                <div className="grid grid-cols-7 gap-4 mb-6">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <div key={day} className="text-center">
                      <div className="font-medium text-gray-900 mb-2">{day}</div>
                      <div className="space-y-2">
                        <div className="bg-teal-100 text-teal-800 p-2 rounded text-xs">
                          9:00 AM
                        </div>
                        <div className="bg-blue-100 text-blue-800 p-2 rounded text-xs">
                          2:00 PM
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                  Update Availability
                </button>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Professional Profile</h2>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        defaultValue="Sarah"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        defaultValue="Johnson"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                    <input
                      type="text"
                      defaultValue="Clinical Psychology, Anxiety, Depression"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    <textarea
                      rows={4}
                      defaultValue="Licensed clinical psychologist with 8 years of experience specializing in cognitive behavioral therapy and mindfulness-based interventions."
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Session Rate</label>
                      <input
                        type="number"
                        defaultValue="120"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
                      <input
                        type="text"
                        defaultValue="PSY12345"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-4 border-b border-gray-200">
                    <div>
                      <h3 className="font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-gray-600 text-sm">Receive appointment reminders and updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between py-4 border-b border-gray-200">
                    <div>
                      <h3 className="font-medium text-gray-900">SMS Reminders</h3>
                      <p className="text-gray-600 text-sm">Get text message reminders for appointments</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between py-4 border-b border-gray-200">
                    <div>
                      <h3 className="font-medium text-gray-900">Auto-accept Appointments</h3>
                      <p className="text-gray-600 text-sm">Automatically accept new appointment requests</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};