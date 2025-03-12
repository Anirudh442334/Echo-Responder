
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertHistoryItem as AlertItem } from '@/lib/types';
import { AlertTriangle, Check, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface AlertHistoryItemProps {
  alert: AlertItem;
}

const AlertHistoryItem: React.FC<AlertHistoryItemProps> = ({ alert }) => {
  return (
    <Card className="overflow-hidden animate-fade-in">
      <CardContent className="p-0">
        <div className="flex items-stretch">
          <div className={`w-2 ${alert.resolved ? 'bg-green-500' : 'bg-echo-red'}`}></div>
          <div className="p-4 flex-grow">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                {alert.resolved ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-echo-red" />
                )}
                <h3 className="font-medium">{alert.detectedSound}</h3>
              </div>
              <Badge variant={alert.resolved ? "outline" : "destructive"}>
                {alert.resolved ? "Resolved" : "Active"}
              </Badge>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <Clock className="h-3 w-3 mr-1" />
              <span>{formatDistanceToNow(alert.timestamp, { addSuffix: true })}</span>
            </div>
            
            <div className="mt-2">
              <p className="text-sm">
                <span className="font-medium">Confidence:</span> {alert.confidenceScore}%
              </p>
              {alert.contactsNotified.length > 0 && (
                <div className="mt-1">
                  <p className="text-sm font-medium">Notified:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {alert.contactsNotified.map(contact => (
                      <Badge key={contact.id} variant="secondary" className="text-xs">
                        {contact.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertHistoryItem;
