import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Bell, Volume2, Users, Clock, ShieldAlert } from 'lucide-react';
import AudioWaveform from '@/components/AudioWaveform';
import StatusIndicator from '@/components/StatusIndicator';
import { SystemStatus, AlertHistoryItem } from '@/lib/types';
import { toast } from "sonner";
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import showAlertToast from '@/components/AlertToast';

const Dashboard = () => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    listening: false,
    batteryLevel: 92,
    signalStrength: 85,
    lastHeartbeat: new Date()
  });

  const [recentAlerts, setRecentAlerts] = useState<AlertHistoryItem[]>([]);

  useEffect(() => {
    const heartbeatInterval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        lastHeartbeat: new Date(),
        batteryLevel: prev.batteryLevel > 0 ? Math.max(0, prev.batteryLevel - 0.01) : 0,
        signalStrength: Math.floor(75 + Math.random() * 20)
      }));
    }, 10000);

    return () => clearInterval(heartbeatInterval);
  }, []);

  useEffect(() => {
    setSystemStatus(prev => ({
      ...prev,
      listening: isListening
    }));
  }, [isListening]);

  const toggleListening = () => {
    const newListeningState = !isListening;
    setIsListening(newListeningState);
    
    toast(
      newListeningState ? "Monitoring started" : "Monitoring paused", 
      { 
        description: newListeningState 
          ? "EchoPulse is now actively listening for distress sounds" 
          : "EchoPulse has stopped listening",
        icon: newListeningState ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />,
      }
    );
  };

  const simulateAlert = () => {
    const alertTypes = [
      "Labored breathing", 
      "Call for help", 
      "Fall detected", 
      "Gasping sound",
      "Code word detected"
    ];
    
    const newAlert: AlertHistoryItem = {
      id: `alert-${Date.now()}`,
      timestamp: new Date(),
      detectedSound: alertTypes[Math.floor(Math.random() * alertTypes.length)],
      confidenceScore: Math.floor(75 + Math.random() * 20),
      resolved: false,
      contactsNotified: [
        {
          id: "contact-1",
          name: "John Doe",
          phone: "+1 (555) 123-4567",
          relationship: "Family",
          primary: true
        }
      ]
    };
    
    setRecentAlerts(prev => [newAlert, ...prev].slice(0, 5));
    
    showAlertToast(newAlert);
  };

  const statsData = [
    { icon: Clock, label: "Monitoring Time", value: "14 hours" },
    { icon: ShieldAlert, label: "Alerts Detected", value: recentAlerts.length.toString() },
    { icon: Volume2, label: "Sound Events", value: "217" },
    { icon: Users, label: "Emergency Contacts", value: "3" },
  ];

  return (
    <div className="min-h-screen bg-echo-gray">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <StatusIndicator status={systemStatus} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="glass-card lg:col-span-2 overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold">Monitoring Control</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8">
                <div className="relative mb-6">
                  <div 
                    className={`w-36 h-36 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isListening 
                        ? 'bg-echo-blue shadow-lg shadow-echo-blue/30' 
                        : 'bg-echo-gray border-2 border-echo-dark-gray/20'
                    }`}
                    onClick={toggleListening}
                  >
                    {isListening ? (
                      <Mic className="h-16 w-16 text-white animate-pulse-soft" />
                    ) : (
                      <MicOff className="h-16 w-16 text-echo-dark-gray" />
                    )}
                  </div>
                  <Badge 
                    className={`absolute -top-2 right-0 px-3 py-1 text-sm ${
                      isListening ? 'bg-green-500' : 'bg-echo-dark-gray'
                    }`}
                  >
                    {isListening ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-medium mb-2">
                  {isListening ? 'Actively Monitoring' : 'Monitoring Paused'}
                </h3>
                
                <p className="text-echo-dark-gray text-center mb-8 max-w-md">
                  {isListening 
                    ? 'EchoPulse is now listening for signs of distress or danger and will alert your emergency contacts if detected.' 
                    : 'EchoPulse is currently not monitoring. Click the button above to start.'}
                </p>
                
                {isListening && (
                  <div className="mb-10 flex flex-col items-center">
                    <p className="text-sm text-echo-dark-gray mb-2">Live Audio Activity</p>
                    <AudioWaveform isListening={isListening} />
                  </div>
                )}
                
                <div className="flex gap-4">
                  <button
                    onClick={toggleListening}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      isListening 
                        ? 'bg-red-100 text-echo-red hover:bg-red-200' 
                        : 'bg-echo-blue text-white hover:bg-echo-dark-blue shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isListening ? 'Stop Monitoring' : 'Start Monitoring'}
                  </button>
                  
                  {isListening && (
                    <button
                      onClick={simulateAlert}
                      className="px-6 py-3 bg-amber-100 text-amber-700 rounded-lg font-medium hover:bg-amber-200 transition-all"
                    >
                      Test Alert
                    </button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold">System Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {statsData.map((stat, index) => (
                  <div key={index} className="bg-echo-light-blue/50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <stat.icon className="h-4 w-4 text-echo-blue mr-2" />
                      <span className="text-xs text-echo-dark-gray font-medium">{stat.label}</span>
                    </div>
                    <p className="text-xl font-bold text-echo-text">{stat.value}</p>
                  </div>
                ))}
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Recent Alerts</h3>
                  <Link to="/history">
                    <span className="text-sm text-echo-blue hover:underline">View All</span>
                  </Link>
                </div>
                
                <div className="space-y-3">
                  {recentAlerts.length > 0 ? (
                    recentAlerts.map((alert, index) => (
                      <div 
                        key={alert.id} 
                        className="flex items-center p-3 bg-white rounded-lg shadow-sm"
                      >
                        <div className={`w-2 h-10 rounded-full ${alert.resolved ? 'bg-green-500' : 'bg-echo-red'} mr-3`}></div>
                        <div>
                          <h4 className="font-medium text-sm">{alert.detectedSound}</h4>
                          <p className="text-xs text-echo-dark-gray">
                            {alert.timestamp.toLocaleTimeString()} - {alert.confidenceScore}% confidence
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-echo-dark-gray">
                      <Bell className="h-5 w-5 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No recent alerts</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
