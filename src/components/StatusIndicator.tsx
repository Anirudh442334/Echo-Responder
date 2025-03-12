
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Battery, Signal, Heart } from 'lucide-react';
import { SystemStatus } from '@/lib/types';
import { format } from 'date-fns';

interface StatusIndicatorProps {
  status: SystemStatus;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  const getBatteryColor = (level: number) => {
    if (level > 60) return 'text-green-500';
    if (level > 20) return 'text-yellow-500';
    return 'text-echo-red';
  };

  const getSignalColor = (strength: number) => {
    if (strength > 70) return 'text-green-500';
    if (strength > 30) return 'text-yellow-500';
    return 'text-echo-red';
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Battery className={`h-5 w-5 mr-1 ${getBatteryColor(status.batteryLevel)}`} />
              <span className="text-sm font-medium">{status.batteryLevel}%</span>
            </div>
            
            <div className="flex items-center">
              <Signal className={`h-5 w-5 mr-1 ${getSignalColor(status.signalStrength)}`} />
              <span className="text-sm font-medium">{status.signalStrength}%</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <Heart className="h-5 w-5 mr-1 text-echo-blue animate-pulse-soft" />
            <span className="text-sm text-echo-dark-gray">
              Last check: {format(status.lastHeartbeat, 'HH:mm:ss')}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusIndicator;
