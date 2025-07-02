import React from 'react';
import { Plus, Edit } from 'lucide-react';
import ActionButton from '../shared/ActionButton';
import styles from '../../../styles/shared.module.css';

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
}

const EmergencyContacts: React.FC = () => {
  // TODO: Replace with Firebase data
  const contacts: EmergencyContact[] = [
    {
      id: '1',
      name: 'Sarah Skier',
      relationship: 'Spouse',
      phone: '+1 (555) 123-4567'
    },
    {
      id: '2',
      name: 'Mike Johnson',
      relationship: 'Friend',
      phone: '+1 (555) 987-6543'
    }
  ];

  const handleAddContact = () => {
    // TODO: Implement add contact functionality
    console.log('Adding new emergency contact');
  };

  const handleEditContact = (contactId: string) => {
    // TODO: Implement edit contact functionality
    console.log('Editing contact:', contactId);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Emergency Contacts</h3>
        <ActionButton
          variant="secondary"
          onClick={handleAddContact}
          icon={<Plus className="w-5 h-5" />}
        >
          Add
        </ActionButton>
      </div>
      <div className="space-y-3">
        {contacts.map((contact) => (
          <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">{contact.name}</div>
              <div className="text-sm text-gray-600">
                {contact.relationship} • {contact.phone}
              </div>
            </div>
            <button
              onClick={() => handleEditContact(contact.id)}
              className="text-gray-400 hover:text-blue-600"
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyContacts;