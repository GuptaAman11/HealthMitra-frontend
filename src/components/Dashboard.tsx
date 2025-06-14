import React, { useState } from 'react';
import { Calendar, Clock, Video, FileText, User, Settings, Bell, Star } from 'lucide-react';
import { mockAppointments } from '../data/mockData';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('appointments');

  const upcomingAppointments = mockAppointments.filter(apt => apt.status === 'scheduled');
  const pastAppointments = mockAppointments.filter(apt => apt.status === 'completed');

  const tabs = [
    { id: 'appointments', name: 'Appointments', icon: Calendar },
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your appointments and account settings</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">John Doe</h3>
                  <p className="text-gray-600 text-sm">john@example.com</p>
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
                          ? 'bg-blue-50 text-blue-600'
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
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Upcoming Sessions</p>
                        <p className="text-2xl font-bold text-gray-900">{upcomingAppointments.length}</p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Calendar className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Completed Sessions</p>
                        <p className="text-2xl font-bold text-gray-900">12</p>
                      </div>
                      <div className="bg-green-100 p-3 rounded-lg">
                        <FileText className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Overall Rating</p>
                        <p className="text-2xl font-bold text-gray-900">4.8</p>
                      </div>
                      <div className="bg-yellow-100 p-3 rounded-lg">
                        <Star className="h-6 w-6 text-yellow-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upcoming Appointments */}
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
                  </div>
                  <div className="p-6">
                    {upcomingAppointments.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingAppointments.map((appointment) => (
                          <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className={`p-3 rounded-lg ${
                                  appointment.type === 'counseling' ? 'bg-blue-100' : 'bg-teal-100'
                                }`}>
                                  {appointment.type === 'counseling' ? (
                                    <User className={`h-5 w-5 ${
                                      appointment.type === 'counseling' ? 'text-blue-600' : 'text-teal-600'
                                    }`} />
                                  ) : (
                                    <Calendar className="h-5 w-5 text-teal-600" />
                                  )}
                                </div>
                                <div>
                                  <h3 className="font-semibold text-gray-900">{appointment.providerName}</h3>
                                  <p className="text-gray-600 capitalize">{appointment.type} Session</p>
                                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                    <span className="flex items-center space-x-1">
                                      <Calendar className="h-4 w-4" />
                                      <span>{appointment.date}</span>
                                    </span>
                                    <span className="flex items-center space-x-1">
                                      <Clock className="h-4 w-4" />
                                      <span>{appointment.time}</span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                                <Video className="h-4 w-4" />
                                <span>Join Session</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No upcoming appointments</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Recent Sessions */}
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Sessions</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="bg-green-100 p-3 rounded-lg">
                              <User className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">Dr. Sarah Johnson</h3>
                              <p className="text-gray-600">Counseling Session</p>
                              <p className="text-sm text-gray-500">Jan 15, 2024 - Completed</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                              View Notes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        defaultValue="John"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        defaultValue="Doe"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="john@example.com"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
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
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between py-4 border-b border-gray-200">
                    <div>
                      <h3 className="font-medium text-gray-900">SMS Reminders</h3>
                      <p className="text-gray-600 text-sm">Get text message reminders for appointments</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="pt-4">
                    <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                      Delete Account
                    </button>
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