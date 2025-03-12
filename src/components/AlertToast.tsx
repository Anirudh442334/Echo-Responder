
import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';
import { AlertHistoryItem } from '@/lib/types';

export const showAlertToast = (alert: AlertHistoryItem) => {
  toast.error("Emergency alert triggered!", {
    description: `Detected: ${alert.detectedSound} (${alert.confidenceScore}% confidence)`,
    icon: <ShieldAlert className="h-5 w-5" />,
    duration: 5000,
    id: `alert-toast-${alert.id}`, // Use a unique ID to prevent duplicate toasts
  });
};

export default showAlertToast;
