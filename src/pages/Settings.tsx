
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Mic, Bell, Volume, Clock, ShieldAlert, Save, Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { DetectionSensitivity, UserSettings } from '@/lib/types';
import Navbar from '@/components/Navbar';

const Settings = () => {
  const [settings, setSettings] = useState<UserSettings>({
    sensitivity: 'medium',
    autoResolveTimeout: 30,
    notificationSounds: true,
    detectKeywords: ["help", "emergency", "danger"]
  });
  
  const [newKeyword, setNewKeyword] = useState('');
  
  const handleSensitivityChange = (value: number[]) => {
    let sensitivity: DetectionSensitivity = 'medium';
    
    if (value[0] <= 33) {
      sensitivity = 'low';
    } else if (value[0] <= 66) {
      sensitivity = 'medium';
    } else {
      sensitivity = 'high';
    }
    
    setSettings({
      ...settings,
      sensitivity
    });
  };
  
  const getSensitivityValue = (): number => {
    switch (settings.sensitivity) {
      case 'low': return 16;
      case 'medium': return 50;
      case 'high': return 83;
      default: return 50;
    }
  };
  
  const handleTimeoutChange = (value: number[]) => {
    setSettings({
      ...settings,
      autoResolveTimeout: value[0]
    });
  };
  
  const handleNotificationSoundsChange = (checked: boolean) => {
    setSettings({
      ...settings,
      notificationSounds: checked
    });
  };
  
  const addKeyword = () => {
    if (!newKeyword.trim()) return;
    
    if (settings.detectKeywords.includes(newKeyword.trim())) {
      toast.error("Keyword already exists");
      return;
    }
    
    setSettings({
      ...settings,
      detectKeywords: [...settings.detectKeywords, newKeyword.trim()]
    });
    
    setNewKeyword('');
  };
  
  const removeKeyword = (keyword: string) => {
    setSettings({
      ...settings,
      detectKeywords: settings.detectKeywords.filter(k => k !== keyword)
    });
  };
  
  const saveSettings = () => {
    // Here we would normally save to a backend or localStorage
    toast.success("Settings saved successfully");
  };

  return (
    <div className="min-h-screen bg-echo-gray">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-echo-text">Settings</h1>
          <p className="text-echo-dark-gray mt-1">
            Customize EchoPulse to fit your needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Detection Settings */}
          <Card className="glass-card lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold flex items-center">
                <Mic className="h-5 w-5 mr-2 text-echo-blue" />
                Detection Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium">Detection Sensitivity</Label>
                  <span className="text-sm font-medium px-2 py-0.5 bg-echo-light-blue rounded text-echo-blue capitalize">
                    {settings.sensitivity}
                  </span>
                </div>
                <Slider 
                  value={[getSensitivityValue()]} 
                  min={0} 
                  max={100} 
                  step={1} 
                  onValueChange={handleSensitivityChange}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-echo-dark-gray pt-1">
                  <span>Fewer false alarms</span>
                  <span>More sensitive</span>
                </div>
              </div>
              
              <div className="space-y-3 pt-4">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium">Auto-resolve Timeout (minutes)</Label>
                  <span className="text-sm font-medium px-2 py-0.5 bg-echo-light-blue rounded text-echo-blue">
                    {settings.autoResolveTimeout} min
                  </span>
                </div>
                <Slider 
                  value={[settings.autoResolveTimeout]} 
                  min={5} 
                  max={60} 
                  step={5} 
                  onValueChange={handleTimeoutChange}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-echo-dark-gray pt-1">
                  <span>Faster resolution</span>
                  <span>Longer timeout</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Alerts will automatically resolve after this period if no further sounds are detected
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-4">
                <div className="space-y-0.5">
                  <Label htmlFor="notification-sounds">Notification Sounds</Label>
                  <p className="text-sm text-muted-foreground">
                    Play a sound when alerts are triggered
                  </p>
                </div>
                <Switch 
                  id="notification-sounds" 
                  checked={settings.notificationSounds}
                  onCheckedChange={handleNotificationSoundsChange}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Keyword Detection */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold flex items-center">
                <ShieldAlert className="h-5 w-5 mr-2 text-echo-blue" />
                Keyword Detection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-echo-dark-gray">
                EchoPulse will listen for these keywords and trigger an alert when detected
              </p>
              
              <div className="flex items-center space-x-2">
                <Input 
                  placeholder="Add keyword..."
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  className="flex-grow"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addKeyword();
                    }
                  }}
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={addKeyword}
                  className="flex-shrink-0"
                  disabled={!newKeyword.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="pt-2">
                {settings.detectKeywords.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {settings.detectKeywords.map(keyword => (
                      <div 
                        key={keyword}
                        className="bg-echo-light-blue text-echo-blue px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        {keyword}
                        <button 
                          onClick={() => removeKeyword(keyword)}
                          className="ml-2 text-echo-blue hover:text-echo-dark-blue"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-echo-dark-gray italic">
                    No keywords added yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8 flex justify-end">
          <Button 
            onClick={saveSettings}
            className="bg-echo-blue hover:bg-echo-dark-blue flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            <span>Save Settings</span>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Settings;
