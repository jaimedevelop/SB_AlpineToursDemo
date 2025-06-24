import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  Calendar, 
  ArrowLeft, 
  AlertCircle,
  MapPin,
  Award,
  Plus,
  Edit,
  Check,
  ChevronRight,
  Mountain,
  Target,
  Users,
  Phone
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../firebase/auth';

export default function CreateAccount() {
  const navigate = useNavigate(); // Add this line that was missing
  const [currentPhase, setCurrentPhase] = useState(1); // 1: Basic, 2: Profile, 3: Emergency, 4: Preferences
  const [formData, setFormData] = useState({
    // Phase 1: Basic Registration
    name: '',
    email: '',
    password: '',
    age: '',
    
    // Phase 2: Profile Information
    homeLocation: '',
    experienceLevel: '',
    skiingPreferences: [],
    certifications: '',
    
    // Phase 3: Emergency Contacts
    emergencyContacts: [
      { name: '', relationship: '', phone: '' }
    ],
    
    // Phase 4: Preferences (Optional)
    skiUnit: 'imperial', // imperial or metric
    language: 'english',
    notifications: {
      powderAlerts: true,
      workoutReminders: true,
      tripDeadlines: true,
      socialUpdates: false,
      gearDeals: false
    }
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock selected resort for demo
  const selectedResort = { name: 'Whistler Blackcomb' };

  const experienceLevels = [
    'Beginner',
    'Advanced Beginner', 
    'Intermediate',
    'Advanced Intermediate',
    'Advanced',
    'Expert'
  ];

  const skiingPreferenceOptions = [
    'Groomed Runs',
    'Powder',
    'Off-piste',
    'Backcountry',
    'Park & Pipe',
    'Racing',
    'Moguls',
    'Cross Country'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (currentPhase < 4) {
      // Move to next phase
      setCurrentPhase(currentPhase + 1);
      return;
    }

    // Final submission
    setError('');
    setIsLoading(true);

    try {
const user = await signUp(formData.email, formData.password, {
  name: formData.name,
  age: formData.age,
  homeLocation: formData.homeLocation,
  experienceLevel: formData.experienceLevel,
  skiingPreferences: formData.skiingPreferences,
  certifications: formData.certifications,
  emergencyContacts: formData.emergencyContacts,
  skiUnit: formData.skiUnit,
  language: formData.language,
  notifications: formData.notifications
});

console.log('Account created successfully:', user);
navigate('/explore');
    } catch (err) {
      console.error('Account creation error:', err);
      setError('An error occurred during account creation');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('notifications.')) {
      const notificationKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [notificationKey]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSkiingPreferenceToggle = (preference) => {
    setFormData(prev => ({
      ...prev,
      skiingPreferences: prev.skiingPreferences.includes(preference)
        ? prev.skiingPreferences.filter(p => p !== preference)
        : [...prev.skiingPreferences, preference]
    }));
  };

  const addEmergencyContact = () => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: [...prev.emergencyContacts, { name: '', relationship: '', phone: '' }]
    }));
  };

  const updateEmergencyContact = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.map((contact, i) => 
        i === index ? { ...contact, [field]: value } : contact
      )
    }));
  };

  const removeEmergencyContact = (index) => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.filter((_, i) => i !== index)
    }));
  };

  const canProceed = () => {
    switch (currentPhase) {
      case 1:
        return formData.name && formData.email && formData.password;
      case 2:
        return formData.homeLocation && formData.experienceLevel;
      case 3:
        return formData.emergencyContacts.some(contact => contact.name && contact.phone);
      case 4:
        return true; // Optional phase
      default:
        return false;
    }
  };

  const renderPhaseIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {[1, 2, 3, 4].map((phase) => (
        <div key={phase} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            phase <= currentPhase 
              ? 'bg-white text-blue-900' 
              : 'bg-white/20 text-white/60'
          }`}>
            {phase < currentPhase ? <Check className="w-4 h-4" /> : phase}
          </div>
          {phase < 4 && (
            <div className={`w-8 h-0.5 ${
              phase < currentPhase ? 'bg-white' : 'bg-white/20'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderPhase1 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Create Your Account</h2>
        <p className="text-white/80">Let's start with the basics</p>
      </div>

      <div className="relative">
        <User className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white/60 w-5 h-5" />
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/60 focus:outline-none focus:border-white pl-11"
          required
          minLength={2}
          maxLength={50}
        />
      </div>

      <div className="relative">
        <Mail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white/60 w-5 h-5" />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/60 focus:outline-none focus:border-white pl-11"
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        />
      </div>

      <div className="relative">
        <Lock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white/60 w-5 h-5" />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/60 focus:outline-none focus:border-white pl-11"
          required
          minLength={8}
        />
      </div>

      <div className="relative">
        <Calendar className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white/60 w-5 h-5" />
        <input
          type="number"
          name="age"
          placeholder="Age"
          min="13"
          max="120"
          value={formData.age}
          onChange={handleChange}
          className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/60 focus:outline-none focus:border-white pl-11"
        />
      </div>
    </div>
  );

  const renderPhase2 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Tell Us About Your Skiing</h2>
        <p className="text-white/80">This helps us personalize your experience</p>
      </div>

      <div className="relative">
        <MapPin className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white/60 w-5 h-5" />
        <input
          type="text"
          name="homeLocation"
          placeholder="Home Location (e.g., Denver, CO)"
          value={formData.homeLocation}
          onChange={handleChange}
          className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/60 focus:outline-none focus:border-white pl-11"
          required
        />
      </div>

      <div className="relative">
        <Target className="absolute top-3 left-3 text-white/60 w-5 h-5" />
        <select
          name="experienceLevel"
          value={formData.experienceLevel}
          onChange={handleChange}
          className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-white pl-11 appearance-none"
          required
        >
          <option value="" className="text-gray-900">Select Experience Level</option>
          {experienceLevels.map(level => (
            <option key={level} value={level} className="text-gray-900">{level}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-white font-medium mb-3">
          <Mountain className="inline w-4 h-4 mr-2" />
          Skiing Preferences (select all that apply)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {skiingPreferenceOptions.map(preference => (
            <button
              key={preference}
              type="button"
              onClick={() => handleSkiingPreferenceToggle(preference)}
              className={`p-2 rounded-lg text-sm transition-colors ${
                formData.skiingPreferences.includes(preference)
                  ? 'bg-white text-blue-900'
                  : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
              }`}
            >
              {preference}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <Award className="absolute top-3 left-3 text-white/60 w-5 h-5" />
        <input
          type="text"
          name="certifications"
          placeholder="Certifications (e.g., PSIA Level 1)"
          value={formData.certifications}
          onChange={handleChange}
          className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/60 focus:outline-none focus:border-white pl-11"
        />
      </div>
    </div>
  );

  const renderPhase3 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Emergency Contacts</h2>
        <p className="text-white/80">Important for safety during your trips</p>
      </div>

      {formData.emergencyContacts.map((contact, index) => (
        <div key={index} className="bg-white/10 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-medium">Contact {index + 1}</h3>
            {formData.emergencyContacts.length > 1 && (
              <button
                type="button"
                onClick={() => removeEmergencyContact(index)}
                className="text-red-300 hover:text-red-200"
              >
                Remove
              </button>
            )}
          </div>
          
          <div className="relative">
            <User className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white/60 w-4 h-4" />
            <input
              type="text"
              placeholder="Full Name"
              value={contact.name}
              onChange={(e) => updateEmergencyContact(index, 'name', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-white placeholder-white/60 focus:outline-none focus:border-white pl-9 text-sm"
            />
          </div>
          
          <div className="relative">
            <Users className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white/60 w-4 h-4" />
            <input
              type="text"
              placeholder="Relationship (e.g., Spouse, Friend)"
              value={contact.relationship}
              onChange={(e) => updateEmergencyContact(index, 'relationship', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-white placeholder-white/60 focus:outline-none focus:border-white pl-9 text-sm"
            />
          </div>
          
          <div className="relative">
            <Phone className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white/60 w-4 h-4" />
            <input
              type="tel"
              placeholder="Phone Number"
              value={contact.phone}
              onChange={(e) => updateEmergencyContact(index, 'phone', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-white placeholder-white/60 focus:outline-none focus:border-white pl-9 text-sm"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addEmergencyContact}
        className="w-full flex items-center justify-center space-x-2 p-3 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span>Add Another Contact</span>
      </button>
    </div>
  );

  const renderPhase4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Almost Done!</h2>
        <p className="text-white/80">Set your preferences (you can change these later)</p>
      </div>

      {/* Units */}
      <div className="bg-white/10 rounded-lg p-4">
        <h3 className="text-white font-medium mb-3">Units</h3>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, skiUnit: 'imperial' }))}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              formData.skiUnit === 'imperial'
                ? 'bg-white text-blue-900'
                : 'bg-white/10 border border-white/20 text-white'
            }`}
          >
            Imperial
          </button>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, skiUnit: 'metric' }))}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              formData.skiUnit === 'metric'
                ? 'bg-white text-blue-900'
                : 'bg-white/10 border border-white/20 text-white'
            }`}
          >
            Metric
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white/10 rounded-lg p-4">
        <h3 className="text-white font-medium mb-3">Notifications</h3>
        <div className="space-y-3">
          {[
            { key: 'powderAlerts', label: 'Powder Alerts', desc: 'Get notified about fresh snow' },
            { key: 'workoutReminders', label: 'Workout Reminders', desc: 'Daily fitness reminders' },
            { key: 'tripDeadlines', label: 'Trip Deadlines', desc: 'Booking and planning reminders' },
            { key: 'socialUpdates', label: 'Social Updates', desc: 'Friend activities and achievements' },
            { key: 'gearDeals', label: 'Gear Deals', desc: 'Special offers and discounts' }
          ].map((notification) => (
            <div key={notification.key} className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium text-sm">{notification.label}</div>
                <div className="text-white/60 text-xs">{notification.desc}</div>
              </div>
              <button 
                type="button"
                onClick={() => handleChange({
                  target: {
                    name: `notifications.${notification.key}`,
                    checked: !formData.notifications[notification.key]
                  }
                })}
                className={`w-10 h-5 rounded-full transition-colors ${
                  formData.notifications[notification.key] ? 'bg-white' : 'bg-white/20'
                }`}
              >
                <div className={`w-4 h-4 bg-blue-900 rounded-full transition-transform ${
                  formData.notifications[notification.key] ? 'translate-x-5' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCurrentPhase = () => {
    switch (currentPhase) {
      case 1: return renderPhase1();
      case 2: return renderPhase2();
      case 3: return renderPhase3();
      case 4: return renderPhase4();
      default: return renderPhase1();
    }
  };

  return (
    <div className="h-screen bg-blue-900 overflow-y-auto">
      <div className="min-h-screen flex flex-col p-4">
        <button
          onClick={() => {
            if (currentPhase > 1) {
              setCurrentPhase(currentPhase - 1);
            } else {
              navigate('/welcome');
            }
          }}
          className="text-white hover:text-white/80 transition-colors self-start flex items-center space-x-2 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
          {renderPhaseIndicator()}
          
          {selectedResort && currentPhase === 1 && (
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 mb-8 w-full">
              <p className="text-white text-center">
                Create an account to book your stay at{' '}
                <span className="font-bold">{selectedResort.name}</span>
              </p>
            </div>
          )}

          {error && (
            <div className="w-full bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 flex items-center space-x-2 text-red-200">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="w-full space-y-4">
            {renderCurrentPhase()}

            <button
              onClick={handleSubmit}
              disabled={!canProceed() || isLoading}
              className="w-full bg-white text-blue-900 rounded-lg py-3 font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <span>Creating Account...</span>
              ) : currentPhase < 4 ? (
                <>
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </div>

          {currentPhase === 1 && (
            <p className="mt-8 text-white/60">
              Already have an account?{' '}
              <button 
                onClick={() => navigate('/login')}
                className="text-white hover:underline"
              >
                Log in
              </button>
            </p>
          )}

          {currentPhase === 4 && (
            <p className="mt-4 text-white/60 text-center text-sm">
              You can always update these preferences later in your account settings.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}