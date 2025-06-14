import React from 'react';
import { Calendar, Users, Leaf } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-white to-teal-50 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Mental Health
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
                  {' '}Journey{' '}
                </span>
                Starts Here
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Connect with licensed therapists and certified yoga instructors from the comfort of your home. 
                Take the first step towards better mental health today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onGetStarted}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Book Your Session
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-blue-300 hover:text-blue-600 transition-colors">
                Learn More
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">500+</p>
                <p className="text-sm text-gray-600">Happy Clients</p>
              </div>
              <div className="text-center">
                <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-teal-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">2,000+</p>
                <p className="text-sm text-gray-600">Sessions Completed</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">95%</p>
                <p className="text-sm text-gray-600">Satisfaction Rate</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-400 to-teal-400 rounded-full p-8">
              <img
                src="https://images.pexels.com/photos/3985353/pexels-photo-3985353.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Mental health consultation"
                className="w-full h-full object-cover rounded-full shadow-2xl"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Available Now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};