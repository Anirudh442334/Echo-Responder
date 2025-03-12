
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EmergencyContact } from '@/lib/types';
import { Phone, Star, Trash2, Edit } from 'lucide-react';

interface EmergencyContactCardProps {
  contact: EmergencyContact;
  onEdit: (contact: EmergencyContact) => void;
  onDelete: (id: string) => void;
  onSetPrimary: (id: string) => void;
}

const EmergencyContactCard: React.FC<EmergencyContactCardProps> = ({
  contact,
  onEdit,
  onDelete,
  onSetPrimary
}) => {
  return (
    <Card className="hover-lift overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-echo-light-blue p-3 rounded-full">
              <Phone className="h-5 w-5 text-echo-blue" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <h3 className="font-semibold text-echo-text">{contact.name}</h3>
                {contact.primary && (
                  <Star className="h-4 w-4 fill-echo-blue text-echo-blue" />
                )}
              </div>
              <p className="text-sm text-echo-dark-gray">{contact.phone}</p>
              <p className="text-xs text-muted-foreground">{contact.relationship}</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            {!contact.primary && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onSetPrimary(contact.id)}
                className="h-8 w-8"
              >
                <Star className="h-4 w-4" />
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onEdit(contact)}
              className="h-8 w-8"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onDelete(contact.id)}
              className="h-8 w-8 text-echo-red"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyContactCard;
