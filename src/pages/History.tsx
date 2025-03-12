
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertHistoryItem } from '@/lib/types';
import { Calendar, CheckCircle, Filter, Search, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import AlertHistoryItemComponent from '@/components/AlertHistoryItem';
import Navbar from '@/components/Navbar';

const History = () => {
  // Sample alert history data
  const [alerts] = useState<AlertHistoryItem[]>([
    {
      id: '1',
      timestamp: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
      detectedSound: 'Labored breathing',
      confidenceScore: 87,
      resolved: true,
      contactsNotified: [
        {
          id: '1',
          name: 'Jane Smith',
          phone: '+1 (555) 123-4567',
          relationship: 'Family',
          primary: true
        }
      ]
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      detectedSound: 'Call for help',
      confidenceScore: 92,
      resolved: true,
      contactsNotified: [
        {
          id: '1',
          name: 'Jane Smith',
          phone: '+1 (555) 123-4567',
          relationship: 'Family',
          primary: true
        },
        {
          id: '2',
          name: 'John Doe',
          phone: '+1 (555) 987-6543',
          relationship: 'Friend',
          primary: false
        }
      ]
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      detectedSound: 'Fall detected',
      confidenceScore: 78,
      resolved: true,
      contactsNotified: [
        {
          id: '1',
          name: 'Jane Smith',
          phone: '+1 (555) 123-4567',
          relationship: 'Family',
          primary: true
        }
      ]
    },
    {
      id: '4',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      detectedSound: 'Code word detected',
      confidenceScore: 95,
      resolved: false,
      contactsNotified: [
        {
          id: '1',
          name: 'Jane Smith',
          phone: '+1 (555) 123-4567',
          relationship: 'Family',
          primary: true
        },
        {
          id: '2',
          name: 'John Doe',
          phone: '+1 (555) 987-6543',
          relationship: 'Friend',
          primary: false
        }
      ]
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredAlerts = alerts.filter(alert => {
    // Apply search filter
    const matchesSearch = 
      alert.detectedSound.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.contactsNotified.some(contact => 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    // Apply tab filter
    if (activeTab === 'active') return matchesSearch && !alert.resolved;
    if (activeTab === 'resolved') return matchesSearch && alert.resolved;
    
    // 'all' tab
    return matchesSearch;
  });
  
  // Group alerts by date
  const groupAlertsByDate = (alerts: AlertHistoryItem[]) => {
    const groups: {[key: string]: AlertHistoryItem[]} = {};
    
    alerts.forEach(alert => {
      const dateKey = format(alert.timestamp, 'yyyy-MM-dd');
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(alert);
    });
    
    return Object.entries(groups).map(([date, items]) => ({
      date,
      formattedDate: format(new Date(date), 'EEEE, MMMM d, yyyy'),
      alerts: items.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    }));
  };
  
  const groupedAlerts = groupAlertsByDate(filteredAlerts);

  return (
    <div className="min-h-screen bg-echo-gray">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-echo-text">Alert History</h1>
            <p className="text-echo-dark-gray mt-1">
              View and manage past emergency alerts
            </p>
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-echo-dark-gray" />
              <Input
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full md:w-[250px]"
              />
            </div>
            
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span className="hidden md:inline">Filter</span>
            </Button>
          </div>
        </div>
        
        <Card className="glass-card overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold">
              Your Alert History
            </CardTitle>
          </CardHeader>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="px-6">
              <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="all" className="text-sm">
                  All Alerts
                </TabsTrigger>
                <TabsTrigger value="active" className="text-sm">
                  <XCircle className="h-3.5 w-3.5 mr-1" />
                  Active
                </TabsTrigger>
                <TabsTrigger value="resolved" className="text-sm">
                  <CheckCircle className="h-3.5 w-3.5 mr-1" />
                  Resolved
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="m-0">
              <CardContent className="pt-6">
                {groupedAlerts.length > 0 ? (
                  <div className="space-y-8">
                    {groupedAlerts.map(group => (
                      <div key={group.date}>
                        <div className="flex items-center mb-4">
                          <Calendar className="h-4 w-4 text-echo-blue mr-2" />
                          <h3 className="text-sm font-medium text-echo-dark-gray">
                            {group.formattedDate}
                          </h3>
                        </div>
                        
                        <div className="space-y-4">
                          {group.alerts.map(alert => (
                            <AlertHistoryItemComponent 
                              key={alert.id} 
                              alert={alert} 
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-echo-dark-gray">No alerts found</p>
                  </div>
                )}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="active" className="m-0">
              <CardContent className="pt-6">
                {groupedAlerts.some(group => group.alerts.some(alert => !alert.resolved)) ? (
                  <div className="space-y-8">
                    {groupedAlerts.map(group => (
                      <div key={group.date}>
                        <div className="flex items-center mb-4">
                          <Calendar className="h-4 w-4 text-echo-blue mr-2" />
                          <h3 className="text-sm font-medium text-echo-dark-gray">
                            {group.formattedDate}
                          </h3>
                        </div>
                        
                        <div className="space-y-4">
                          {group.alerts
                            .filter(alert => !alert.resolved)
                            .map(alert => (
                              <AlertHistoryItemComponent 
                                key={alert.id} 
                                alert={alert} 
                              />
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-echo-dark-gray">No active alerts</p>
                  </div>
                )}
              </CardContent>
            </TabsContent>
            
            <TabsContent value="resolved" className="m-0">
              <CardContent className="pt-6">
                {groupedAlerts.some(group => group.alerts.some(alert => alert.resolved)) ? (
                  <div className="space-y-8">
                    {groupedAlerts.map(group => (
                      <div key={group.date}>
                        <div className="flex items-center mb-4">
                          <Calendar className="h-4 w-4 text-echo-blue mr-2" />
                          <h3 className="text-sm font-medium text-echo-dark-gray">
                            {group.formattedDate}
                          </h3>
                        </div>
                        
                        <div className="space-y-4">
                          {group.alerts
                            .filter(alert => alert.resolved)
                            .map(alert => (
                              <AlertHistoryItemComponent 
                                key={alert.id} 
                                alert={alert} 
                              />
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-echo-dark-gray">No resolved alerts</p>
                  </div>
                )}
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </main>
    </div>
  );
};

export default History;
