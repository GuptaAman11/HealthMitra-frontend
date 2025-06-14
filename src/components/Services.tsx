import React from 'react';
import { Brain, Leaf, Users, Clock, Star, CheckCircle } from 'lucide-react';

interface ServicesProps {
  onBookService: (serviceType: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onBookService }) => {
  const services = [
    {
      id: 'counseling',
      title: 'Individual Counseling',
      description: 'One-on-one therapy sessions with licensed mental health professionals',
      icon: Brain,
      features: ['Licensed Therapists', 'Flexible Scheduling', 'Secure Video Sessions', 'Progress Tracking'],
      price: 'From $120/session',
      duration: '50 minutes',
      color: 'blue'
    },
    {
      id: 'yoga',
      title: 'Therapeutic Yoga',
      description: 'Mindful yoga sessions designed specifically for mental health and stress relief',
      icon: Leaf,
      features: ['Certified Instructors', 'Mental Health Focus', 'All Skill Levels', 'Live & Recorded'],
      price: 'From $45/session',
      duration: '60 minutes',
      color: 'teal'
    },
    {
      id: 'couples',
      title: 'Couples Therapy',
      description: 'Relationship counseling to strengthen bonds and improve communication',
      icon: Users,
      features: ['Relationship Experts', 'Joint Sessions', 'Communication Tools', 'Homework Exercises'],
      price: 'From $160/session',
      duration: '75 minutes',
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          button: 'bg-blue-600 hover:bg-blue-700',
          border: 'border-blue-200'
        };
      case 'teal':
        return {
          bg: 'bg-teal-50',
          iconBg: 'bg-teal-100',
          iconColor: 'text-teal-600',
          button: 'bg-teal-600 hover:bg-teal-700',
          border: 'border-teal-200'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          iconBg: 'bg-purple-100',
          iconColor: 'text-purple-600',
          button: 'bg-purple-600 hover:bg-purple-700',
          border: 'border-purple-200'
        };
      default:
        return {
          bg: 'bg-gray-50',
          iconBg: 'bg-gray-100',
          iconColor: 'text-gray-600',
          button: 'bg-gray-600 hover:bg-gray-700',
          border: 'border-gray-200'
        };
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Mental Health Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our range of professional services designed to support your mental health journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const colors = getColorClasses(service.color);
            const Icon = service.icon;
            
            return (
              <div
                key={service.id}
                className={`${colors.bg} border-2 ${colors.border} rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                <div className="space-y-6">
                  <div>
                    <div className={`${colors.iconBg} w-16 h-16 rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className={`h-8 w-8 ${colors.iconColor}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>

                  <div className="space-y-3">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>4.9/5</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-2xl font-bold text-gray-900">{service.price}</div>
                    <button
                      onClick={() => onBookService(service.id)}
                      className={`w-full ${colors.button} text-white py-3 rounded-lg font-semibold transition-colors`}
                    >
                      Book Session
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose MindfulCare?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Licensed Professionals</h4>
                <p className="text-gray-600 text-sm">All our therapists and instructors are fully licensed and certified</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Flexible Scheduling</h4>
                <p className="text-gray-600 text-sm">Book sessions that fit your schedule, including evenings and weekends</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Proven Results</h4>
                <p className="text-gray-600 text-sm">95% of our clients report improved mental health outcomes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};