
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { UserPlus, Info } from 'lucide-react';
import EmergencyContactCard from '@/components/EmergencyContactCard';
import { EmergencyContact } from '@/lib/types';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';

const Contacts = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([
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
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(null);
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('');
  const [isPrimary, setIsPrimary] = useState(false);
  
  const resetForm = () => {
    setName('');
    setPhone('');
    setRelationship('');
    setIsPrimary(false);
    setEditingContact(null);
  };
  
  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };
  
  const openEditDialog = (contact: EmergencyContact) => {
    setEditingContact(contact);
    setName(contact.name);
    setPhone(contact.phone);
    setRelationship(contact.relationship);
    setIsPrimary(contact.primary);
    setIsDialogOpen(true);
  };
  
  const handleSubmit = () => {
    if (!name || !phone || !relationship) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (isPrimary) {
      // Reset primary flag for all other contacts
      setContacts(contacts.map(contact => ({
        ...contact,
        primary: false
      })));
    } else if (contacts.length === 0 || (contacts.length === 1 && editingContact)) {
      // First contact must be primary
      setIsPrimary(true);
    }
    
    if (editingContact) {
      // Update existing contact
      setContacts(contacts.map(contact => 
        contact.id === editingContact.id 
          ? { ...contact, name, phone, relationship, primary: isPrimary }
          : contact
      ));
      
      toast.success("Contact updated successfully");
    } else {
      // Add new contact
      const newContact: EmergencyContact = {
        id: `contact-${Date.now()}`,
        name,
        phone,
        relationship,
        primary: isPrimary || contacts.length === 0
      };
      
      setContacts([...contacts, newContact]);
      toast.success("Contact added successfully");
    }
    
    setIsDialogOpen(false);
    resetForm();
  };
  
  const handleDelete = (id: string) => {
    // Check if it's the primary contact
    const contactToDelete = contacts.find(contact => contact.id === id);
    if (contactToDelete?.primary && contacts.length > 1) {
      toast.error("Cannot delete the primary contact. Please set another contact as primary first.");
      return;
    }
    
    setContacts(contacts.filter(contact => contact.id !== id));
    toast.success("Contact removed");
  };
  
  const handleSetPrimary = (id: string) => {
    setContacts(contacts.map(contact => ({
      ...contact,
      primary: contact.id === id
    })));
    
    toast.success("Primary contact updated");
  };

  return (
    <div className="min-h-screen bg-echo-gray">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-echo-text">Emergency Contacts</h1>
            <p className="text-echo-dark-gray mt-1">
              Manage the people who will be notified in case of an emergency
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={openAddDialog}
                className="bg-echo-blue hover:bg-echo-dark-blue flex items-center gap-2"
              >
                <UserPlus className="h-4 w-4" />
                <span>Add Contact</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingContact ? "Edit Contact" : "Add New Contact"}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship</Label>
                  <Select 
                    value={relationship} 
                    onValueChange={setRelationship}
                  >
                    <SelectTrigger id="relationship">
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Family">Family</SelectItem>
                      <SelectItem value="Friend">Friend</SelectItem>
                      <SelectItem value="Neighbor">Neighbor</SelectItem>
                      <SelectItem value="Caregiver">Caregiver</SelectItem>
                      <SelectItem value="Doctor">Doctor</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="primary">Primary Contact</Label>
                    <p className="text-sm text-muted-foreground">Will be notified first in an emergency</p>
                  </div>
                  <Switch 
                    id="primary" 
                    checked={isPrimary}
                    onCheckedChange={setIsPrimary}
                    disabled={editingContact?.primary}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit}
                  className="bg-echo-blue hover:bg-echo-dark-blue"
                >
                  {editingContact ? "Update" : "Add"} Contact
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold">
              Your Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {contacts.length > 0 ? (
              <div className="space-y-4">
                {contacts.map(contact => (
                  <EmergencyContactCard 
                    key={contact.id}
                    contact={contact}
                    onEdit={openEditDialog}
                    onDelete={handleDelete}
                    onSetPrimary={handleSetPrimary}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Info className="h-12 w-12 text-echo-blue/30 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-echo-text mb-2">No contacts added yet</h3>
                <p className="text-echo-dark-gray mb-6">
                  Add emergency contacts who should be notified if EchoPulse detects a distress signal.
                </p>
                <Button 
                  onClick={openAddDialog}
                  className="bg-echo-blue hover:bg-echo-dark-blue"
                >
                  Add Your First Contact
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {contacts.length > 0 && (
          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-echo-light-blue">
            <div className="flex gap-3">
              <Info className="h-5 w-5 text-echo-blue flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-echo-text">Important Information</h4>
                <p className="text-echo-dark-gray text-sm mt-1">
                  In the event of a detected emergency, EchoPulse will attempt to contact each person in your list, 
                  starting with your primary contact. Make sure your contacts know they are on your emergency list 
                  and what to do if they receive an alert.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Contacts;
