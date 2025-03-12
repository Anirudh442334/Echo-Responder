
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Ear, AlertCircle, Zap } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-echo-light-blue">
      {/* Hero Section */}
      <section className="container mx-auto pt-20 pb-24 px-4">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          <div className="inline-block mb-4 bg-echo-light-blue py-1 px-4 rounded-full">
            <span className="text-echo-blue font-medium text-sm">Personal Safety Redefined</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-echo-text leading-tight">
            AI That Listens For Subtle Distress Calls
          </h1>
          <p className="text-lg sm:text-xl text-echo-dark-gray mb-8 max-w-3xl mx-auto">
            EchoPulse continuously monitors for signs of distress, immediately alerting your emergency contacts when you need help but can't call for it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button className="text-lg px-8 py-6 bg-echo-blue hover:bg-echo-dark-blue transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                Try the Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contacts">
              <Button variant="outline" className="text-lg px-8 py-6 border-echo-blue text-echo-blue hover:bg-echo-light-blue">
                Set Up Contacts
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-echo-text mb-4">How EchoPulse Works</h2>
            <p className="text-echo-dark-gray max-w-2xl mx-auto">
              Our AI technology continuously listens for subtle signs of distress, providing peace of mind for you and your loved ones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Ear,
                title: "Always Listening",
                description: "Continuously monitors your environment for sounds that signal distress"
              },
              {
                icon: Shield,
                title: "Private & Secure",
                description: "All sound processing happens on-device, with no recordings stored or sent to the cloud"
              },
              {
                icon: AlertCircle,
                title: "Instant Alerts",
                description: "Automatically notifies emergency contacts when a distress sound is detected"
              },
              {
                icon: Zap,
                title: "Energy Efficient",
                description: "Optimized to run continuously without draining your device's battery"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="glass-card p-6 rounded-xl hover-lift"
              >
                <div className="bg-echo-light-blue w-14 h-14 rounded-full flex items-center justify-center mb-5 mx-auto">
                  <feature.icon className="h-7 w-7 text-echo-blue" />
                </div>
                <h3 className="text-xl font-semibold text-echo-text mb-3 text-center">{feature.title}</h3>
                <p className="text-echo-dark-gray text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-echo-light-blue/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-echo-text mb-4">Who EchoPulse Is For</h2>
            <p className="text-echo-dark-gray">
              Designed for anyone who may need assistance but might not be able to call for help directly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Elderly Individuals",
                description: "Provides peace of mind for elderly people living alone, detecting falls or medical emergencies."
              },
              {
                title: "Stroke Risk Patients",
                description: "Recognizes the early sounds of a stroke when seconds matter most for treatment."
              },
              {
                title: "Personal Safety",
                description: "Acts as a silent guardian, alerting contacts when predefined safety words are spoken."
              }
            ].map((useCase, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-8 shadow-md hover-lift"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-echo-blue rounded-full text-white font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-echo-text mb-3">{useCase.title}</h3>
                <p className="text-echo-dark-gray">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-echo-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Experience EchoPulse?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Try our demo today and see how EchoPulse can provide an extra layer of safety for you or your loved ones.
          </p>
          <Link to="/dashboard">
            <Button className="bg-white text-echo-blue hover:bg-opacity-90 text-lg px-8 py-6">
              Try the Demo Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-10 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-echo-blue rounded-lg w-8 h-8 flex items-center justify-center">
                <span className="text-white font-bold">EP</span>
              </div>
              <span className="ml-2 font-bold text-xl text-echo-text">EchoPulse</span>
            </div>
            <div className="text-echo-dark-gray text-sm">
              &copy; {new Date().getFullYear()} EchoPulse. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
