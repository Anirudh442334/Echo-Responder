
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AudioWaveformProps {
  isListening: boolean;
  className?: string;
}

const AudioWaveform: React.FC<AudioWaveformProps> = ({ isListening, className }) => {
  const [heights, setHeights] = useState<number[]>(Array(10).fill(3));

  useEffect(() => {
    if (!isListening) {
      setHeights(Array(10).fill(3));
      return;
    }

    const interval = setInterval(() => {
      setHeights(prev => 
        prev.map(() => isListening ? Math.floor(Math.random() * 12) + 1 : 3)
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isListening]);

  return (
    <div className={cn("wave-group", className)}>
      {heights.map((height, index) => (
        <div 
          key={index} 
          className="wave-bar"
          style={{ 
            height: `${height * 4}px`,
            opacity: isListening ? 1 : 0.4
          }}
        />
      ))}
    </div>
  );
};

export default AudioWaveform;
