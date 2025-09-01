// Updated EmergencyContacts.tsx - Cozy Lodge Theme
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Phone, Users } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import ActionButton from '../shared/ActionButton';
import styles from '../../../styles/account/index.module.css';

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
}

const EmergencyContacts: React.FC = () => {
  const { userProfile, updateProfile, isLoading } = useAuth();
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  const [newContact, setNewContact] = useState({
    name: '',
    relationship: '',
    phone: ''
  });

  // Load contacts from userProfile
  useEffect(() => {
    if (userProfile?.emergencyContacts) {
      setContacts(userProfile.emergencyContacts);
    }
  }, [userProfile]);

  const handleAddContact = async () => {
    if (!newContact.name || !newContact.relationship || !newContact.phone) {
      return;
    }

    const contact: EmergencyContact = {
      id: Date.now().toString(),
      ...newContact
    };

    const updatedContacts = [...contacts, contact];
    setContacts(updatedContacts);

    try {
      await updateProfile({
        emergencyContacts: updatedContacts
      });
      
      setNewContact({ name: '', relationship: '', phone: '' });
      setIsAddingContact(false);
    } catch (error) {
      console.error('Error adding contact:', error);
      setContacts(contacts);
    }
  };

  const handleEditContact = (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId);
    if (contact) {
      setNewContact({
        name: contact.name,
        relationship: contact.relationship,
        phone: contact.phone
      });
      setEditingContactId(contactId);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingContactId) return;

    const updatedContacts = contacts.map(contact =>
      contact.id === editingContactId
        ? { ...contact, ...newContact }
        : contact
    );

    setContacts(updatedContacts);

    try {
      await updateProfile({
        emergencyContacts: updatedContacts
      });
      
      setNewContact({ name: '', relationship: '', phone: '' });
      setEditingContactId(null);
    } catch (error) {
      console.error('Error updating contact:', error);
      setContacts(contacts);
    }
  };

  const handleDeleteContact = async (contactId: string) => {
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    setContacts(updatedContacts);

    try {
      await updateProfile({
        emergencyContacts: updatedContacts
      });
    } catch (error) {
      console.error('Error deleting contact:', error);
      setContacts(contacts);
    }
  };

  const handleCancel = () => {
    setNewContact({ name: '', relationship: '', phone: '' });
    setIsAddingContact(false);
    setEditingContactId(null);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitleSection}>
          <Users className={styles.cardTitleIcon} />
          <h3 className={styles.cardTitle}>Emergency Contacts</h3>
        </div>
        <ActionButton
          variant="secondary"
          onClick={() => setIsAddingContact(true)}
          icon={<Plus size={18} />}
          disabled={isAddingContact || editingContactId !== null}
          size="small"
        >
          Add Contact
        </ActionButton>
      </div>
      
      <div className={styles.contactsContainer}>
        {contacts.map((contact) => (
          <div key={contact.id} className={styles.contactItem}>
            <div className={styles.contactIcon}>
              <Phone size={18} />
            </div>
            <div className={styles.contactInfo}>
              <div className={styles.contactName}>{contact.name}</div>
              <div className={styles.contactDetails}>
                <span className={styles.contactRelationship}>{contact.relationship}</span>
                <span className={styles.contactSeparator}>•</span>
                <span className={styles.contactPhone}>{contact.phone}</span>
              </div>
            </div>
            <div className={styles.contactActions}>
              <button
                onClick={() => handleEditContact(contact.id)}
                className={`${styles.actionButton} ${styles.editButton}`}
                disabled={isAddingContact || editingContactId !== null}
                title="Edit contact"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => handleDeleteContact(contact.id)}
                className={`${styles.actionButton} ${styles.deleteButton}`}
                disabled={isAddingContact || editingContactId !== null}
                title="Delete contact"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}

        {/* Add/Edit Contact Form */}
        {(isAddingContact || editingContactId) && (
          <div className={styles.contactForm}>
            <div className={styles.contactFormHeader}>
              <h4 className={styles.contactFormTitle}>
                {editingContactId ? 'Edit Contact' : 'Add New Emergency Contact'}
              </h4>
              <p className={styles.contactFormSubtitle}>
                Someone to reach in case of emergencies during your ski trips
              </p>
            </div>
            
            <div className={styles.contactFormFields}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter contact's full name"
                  value={newContact.name}
                  onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                  className={styles.input}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Relationship</label>
                <select
                  value={newContact.relationship}
                  onChange={(e) => setNewContact(prev => ({ ...prev, relationship: e.target.value }))}
                  className={styles.select}
                >
                  <option value="">Select relationship</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Partner">Partner</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Child">Child</option>
                  <option value="Friend">Friend</option>
                  <option value="Other Family">Other Family</option>
                  <option value="Emergency Contact">Emergency Contact</option>
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Phone Number</label>
                <input
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={newContact.phone}
                  onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                  className={styles.input}
                />
              </div>
            </div>
            
            <div className={styles.contactFormActions}>
              <ActionButton
                variant="primary"
                onClick={editingContactId ? handleSaveEdit : handleAddContact}
                disabled={isLoading || !newContact.name || !newContact.relationship || !newContact.phone}
                size="small"
              >
                {isLoading ? 'Saving...' : (editingContactId ? 'Update Contact' : 'Add Contact')}
              </ActionButton>
              <ActionButton
                variant="secondary"
                onClick={handleCancel}
                size="small"
              >
                Cancel
              </ActionButton>
            </div>
          </div>
        )}

        {contacts.length === 0 && !isAddingContact && (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>
              <Users size={48} />
            </div>
            <div className={styles.emptyStateContent}>
              <h4 className={styles.emptyStateTitle}>No Emergency Contacts</h4>
              <p className={styles.emptyStateDescription}>
                Add emergency contacts to ensure someone can be reached if needed during your ski adventures.
              </p>
              <ActionButton
                variant="primary"
                onClick={() => setIsAddingContact(true)}
                icon={<Plus size={18} />}
                size="small"
              >
                Add Your First Contact
              </ActionButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyContacts;