import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  Settings,
  CreditCard,
  Globe,
  Moon,
  Sun,
  MapPin,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Smartphone,
  Wifi,
  Trophy,
  Award,
  Star,
  TrendingUp,
  Mountain,
  Calendar,
  Users,
  Target,
  Zap,
  Camera,
  BookOpen,
  Heart,
  Crown,
  Medal,
  Flame,
  ChevronRight,
  ChevronDown,
  Edit,
  Check,
  X,
  Plus,
  Info
} from 'lucide-react';

const Account: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'achievements' | 'profile' | 'preferences' | 'billing' | 'privacy' | 'technical' | 'support'>('achievements');
  const [darkMode, setDarkMode] = useState(false);
  const [showPrivacyDetails, setShowPrivacyDetails] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);

  // User stats and achievements data
  const userStats = {
    level: 23,
    totalPoints: 15420,
    currentSeason: {
      daysSkied: 47,
      resortsVisited: 23,
      verticalFeet: 892340,
      workoutStreak: 12,
      tripsPlanned: 8,
      friendsIntroduced: 5
    },
    allTime: {
      daysSkied: 234,
      resortsVisited: 67,
      verticalFeet: 4230000,
      countries: 8
    }
  };

  const achievements = [
    { 
      id: 'first-resort', 
      name: 'First Tracks', 
      description: 'Visited your first resort', 
      category: 'Explorer',
      earned: true, 
      date: '2023-12-15',
      rarity: 'common',
      points: 100
    },
    { 
      id: 'state-collector', 
      name: 'State Collector', 
      description: 'Skied in 5 different states', 
      category: 'Explorer',
      earned: true, 
      date: '2024-02-20',
      rarity: 'rare',
      points: 500
    },
    { 
      id: 'international-skier', 
      name: 'International Skier', 
      description: 'Skied in 3 different countries', 
      category: 'Explorer',
      earned: true, 
      date: '2024-03-10',
      rarity: 'epic',
      points: 1000
    },
    { 
      id: 'trip-master', 
      name: 'Trip Master', 
      description: 'Planned 10 successful trips', 
      category: 'Planner',
      earned: true, 
      date: '2024-01-05',
      rarity: 'rare',
      points: 750
    },
    { 
      id: 'workout-warrior', 
      name: 'Workout Warrior', 
      description: 'Completed 50 workouts', 
      category: 'Fitness',
      earned: true, 
      date: '2024-02-28',
      rarity: 'rare',
      points: 600
    },
    { 
      id: 'consistency-king', 
      name: 'Consistency King', 
      description: 'Maintained 30-day workout streak', 
      category: 'Fitness',
      earned: false, 
      progress: 12,
      target: 30,
      rarity: 'legendary',
      points: 2000
    },
    { 
      id: 'gear-guru', 
      name: 'Gear Guru', 
      description: 'Reviewed 25 pieces of equipment', 
      category: 'Gear',
      earned: false, 
      progress: 18,
      target: 25,
      rarity: 'epic',
      points: 1200
    }
  ];

  const seasonChallenges = [
    { name: 'Visit 5 New Resorts', progress: 3, target: 5, reward: '500 points', deadline: '2024-04-30' },
    { name: 'Complete Pre-Season Training', progress: 8, target: 10, reward: 'Fitness Master Badge', deadline: '2024-12-01' },
    { name: 'Introduce 2 Friends to Skiing', progress: 1, target: 2, reward: 'Ambassador Status', deadline: '2024-03-31' }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'epic': return 'text-purple-600 bg-purple-100';
      case 'legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'common': return <Award className="w-4 h-4" />;
      case 'rare': return <Star className="w-4 h-4" />;
      case 'epic': return <Crown className="w-4 h-4" />;
      case 'legendary': return <Medal className="w-4 h-4" />;
      default: return <Award className="w-4 h-4" />;
    }
  };

  const renderAchievements = () => (
    <div className="space-y-6">
      {/* Level and Points */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-3xl font-bold">Level {userStats.level}</div>
            <div className="text-blue-100">Ski Enthusiast</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{userStats.totalPoints.toLocaleString()}</div>
            <div className="text-blue-100">Total Points</div>
          </div>
        </div>
        <div className="w-full bg-blue-400 rounded-full h-3">
          <div className="bg-white h-3 rounded-full" style={{ width: '73%' }}></div>
        </div>
        <div className="flex justify-between text-sm text-blue-100 mt-2">
          <span>Level 23</span>
          <span>2,580 XP to Level 24</span>
        </div>
      </div>

      {/* Season Stats */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">2024 Season Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{userStats.currentSeason.daysSkied}</div>
            <div className="text-sm text-gray-600">Days Skied</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{userStats.currentSeason.resortsVisited}</div>
            <div className="text-sm text-gray-600">Resorts Visited</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{(userStats.currentSeason.verticalFeet / 1000).toFixed(0)}K</div>
            <div className="text-sm text-gray-600">Vertical Feet</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{userStats.currentSeason.workoutStreak}</div>
            <div className="text-sm text-gray-600">Workout Streak</div>
          </div>
        </div>
      </div>

      {/* Active Challenges */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Season Challenges</h3>
        <div className="space-y-4">
          {seasonChallenges.map((challenge, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{challenge.name}</h4>
                <span className="text-sm text-gray-500">Due {new Date(challenge.deadline).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1 mr-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {challenge.progress}/{challenge.target}
                </span>
              </div>
              <div className="text-sm text-green-600 font-medium">🎁 {challenge.reward}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Gallery */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievement Gallery</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`p-4 rounded-lg border-2 transition-all ${
                achievement.earned 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-gray-200 bg-gray-50 opacity-75'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getRarityIcon(achievement.rarity)}
                  <div>
                    <h4 className={`font-semibold ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                      {achievement.name}
                    </h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(achievement.rarity)}`}>
                    {achievement.rarity}
                  </span>
                  <div className="text-xs text-gray-500 mt-1">{achievement.points} pts</div>
                </div>
              </div>
              {achievement.earned ? (
                <div className="text-xs text-green-600">
                  ✓ Earned {new Date(achievement.date!).toLocaleDateString()}
                </div>
              ) : achievement.progress !== undefined ? (
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{achievement.progress}/{achievement.target}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-blue-500 h-1.5 rounded-full"
                      style={{ width: `${(achievement.progress! / achievement.target!) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-gray-500">🔒 Locked</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      {/* Profile Info */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
          <button 
            onClick={() => setEditingProfile(!editingProfile)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <Edit className="w-4 h-4" />
            <span>{editingProfile ? 'Cancel' : 'Edit'}</span>
          </button>
        </div>
        
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <User className="w-10 h-10 text-blue-600" />
          </div>
          <div className="flex-1">
            {editingProfile ? (
              <div className="space-y-2">
                <input 
                  type="text" 
                  defaultValue="John Skier" 
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <input 
                  type="email" 
                  defaultValue="john.skier@example.com" 
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold text-gray-900">John Skier</h2>
                <p className="text-gray-600">john.skier@example.com</p>
                <p className="text-sm text-gray-500 mt-1">Member since December 2023</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Home Location</label>
            <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-gray-900">Denver, CO</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
            <div className="p-2 bg-gray-50 rounded-lg">
              <span className="text-gray-900">Advanced Intermediate</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Skiing Preferences</label>
            <div className="p-2 bg-gray-50 rounded-lg">
              <span className="text-gray-900">Powder, Off-piste</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Certifications</label>
            <div className="p-2 bg-gray-50 rounded-lg">
              <span className="text-gray-900">PSIA Level 1</span>
            </div>
          </div>
        </div>

        {editingProfile && (
          <div className="flex space-x-3 mt-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Save Changes
            </button>
            <button 
              onClick={() => setEditingProfile(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Emergency Contacts</h3>
          <button className="text-blue-600 hover:text-blue-700">
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Sarah Skier</div>
              <div className="text-sm text-gray-600">Spouse • +1 (555) 123-4567</div>
            </div>
            <Edit className="w-4 h-4 text-gray-400 hover:text-blue-600 cursor-pointer" />
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Mike Johnson</div>
              <div className="text-sm text-gray-600">Friend • +1 (555) 987-6543</div>
            </div>
            <Edit className="w-4 h-4 text-gray-400 hover:text-blue-600 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      {/* App Preferences */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">App Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-gray-500" />
              <div>
                <div className="font-medium text-gray-900">Language</div>
                <div className="text-sm text-gray-600">Choose your preferred language</div>
              </div>
            </div>
            <select className="p-2 border border-gray-300 rounded-lg">
              <option>English</option>
              <option>Français</option>
              <option>Deutsch</option>
              <option>Español</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Settings className="w-5 h-5 text-gray-500" />
              <div>
                <div className="font-medium text-gray-900">Units</div>
                <div className="text-sm text-gray-600">Distance and temperature units</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">Imperial</button>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">Metric</button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {darkMode ? <Moon className="w-5 h-5 text-gray-500" /> : <Sun className="w-5 h-5 text-gray-500" />}
              <div>
                <div className="font-medium text-gray-900">Theme</div>
                <div className="text-sm text-gray-600">Choose light or dark mode</div>
              </div>
            </div>
        <button 
  onClick={() => setDarkMode(!darkMode)}
  className={`w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
>
  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`}></div>
        </button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
        <div className="space-y-4">
          {[
            { name: 'Powder Alerts', desc: 'Get notified about fresh snow', enabled: true },
            { name: 'Workout Reminders', desc: 'Daily fitness reminders', enabled: true },
            { name: 'Trip Deadlines', desc: 'Booking and planning reminders', enabled: true },
            { name: 'Social Updates', desc: 'Friend activities and achievements', enabled: false },
            { name: 'Gear Deals', desc: 'Special offers and discounts', enabled: false }
          ].map((notification, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">{notification.name}</div>
                <div className="text-sm text-gray-600">{notification.desc}</div>
              </div>
<button className={`w-12 h-6 rounded-full transition-colors ${notification.enabled ? 'bg-blue-600' : 'bg-gray-300'}`}>
  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${notification.enabled ? 'translate-x-6' : 'translate-x-1'}`}></div>
</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-6">
      {/* Subscription Status */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Premium Subscription</h3>
            <p className="text-gray-600">Access to advanced features and exclusive content</p>
          </div>
          <Crown className="w-8 h-8 text-purple-600" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600">Next billing: March 15, 2024</div>
            <div className="text-2xl font-bold text-purple-600">$9.99/month</div>
          </div>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            Manage Subscription
          </button>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
          <button className="text-blue-600 hover:text-blue-700">
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-5 h-5 text-gray-500" />
              <div>
                <div className="font-medium text-gray-900">•••• •••• •••• 4242</div>
                <div className="text-sm text-gray-600">Expires 12/26</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="text-blue-600 hover:text-blue-700 text-sm">Edit</button>
              <button className="text-red-600 hover:text-red-700 text-sm">Remove</button>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase History */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Purchases</h3>
        <div className="space-y-3">
          {[
            { item: 'Premium Subscription', date: '2024-02-15', amount: '$9.99' },
            { item: 'Whistler Trip Booking', date: '2024-01-28', amount: '$299.00' },
            { item: 'Ski Helmet - Smith Vantage', date: '2024-01-15', amount: '$179.99' }
          ].map((purchase, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{purchase.item}</div>
                <div className="text-sm text-gray-600">{purchase.date}</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-900">{purchase.amount}</div>
                <button className="text-sm text-blue-600 hover:text-blue-700">Receipt</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-6">
      {/* Security Settings */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                <div className="text-sm text-gray-600">Enabled via SMS</div>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm">Manage</button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Settings className="w-5 h-5 text-gray-500" />
              <div>
                <div className="font-medium text-gray-900">Password</div>
                <div className="text-sm text-gray-600">Last changed 2 months ago</div>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm">Change</button>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
        <div className="space-y-4">
          {[
            { name: 'Profile Visibility', desc: 'Who can see your profile', setting: 'Friends Only' },
            { name: 'Location Sharing', desc: 'Share location with friends', setting: 'Enabled' },
            { name: 'Activity Status', desc: 'Show when you\'re skiing', setting: 'Enabled' },
            { name: 'Achievement Sharing', desc: 'Auto-share achievements', setting: 'Disabled' }
          ].map((privacy, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">{privacy.name}</div>
                <div className="text-sm text-gray-600">{privacy.desc}</div>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm">
                {privacy.setting} <ChevronRight className="w-4 h-4 inline ml-1" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <Download className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-900">Export My Data</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
          
          <button className="w-full flex items-center justify-between p-3 border border-red-200 rounded-lg hover:bg-red-50">
            <div className="flex items-center space-x-3">
              <Trash2 className="w-5 h-5 text-red-600" />
              <span className="font-medium text-red-600">Delete Account</span>
            </div>
            <ChevronRight className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderTechnical = () => (
    <div className="space-y-6">
      {/* Offline Maps */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Offline Maps</h3>
        <div className="space-y-3">
          {[
            { name: 'Whistler Blackcomb', size: '45 MB', downloaded: true },
            { name: 'Vail Resort', size: '38 MB', downloaded: true },
            { name: 'Aspen Snowmass', size: '52 MB', downloaded: false }
          ].map((map, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{map.name}</div>
                <div className="text-sm text-gray-600">{map.size}</div>
              </div>
              <button className={`px-3 py-1 rounded-lg text-sm ${
                map.downloaded 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}>
                {map.downloaded ? 'Downloaded' : 'Download'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* App Permissions */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">App Permissions</h3>
        <div className="space-y-4">
          {[
            { name: 'Location', desc: 'For resort recommendations and tracking', enabled: true },
            { name: 'Camera', desc: 'For gear photos and trip memories', enabled: true },
            { name: 'Notifications', desc: 'For alerts and reminders', enabled: true },
            { name: 'Contacts', desc: 'For emergency contacts and friend invites', enabled: false }
          ].map((permission, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">{permission.name}</div>
                <div className="text-sm text-gray-600">{permission.desc}</div>
              </div>
              <button className={`w-12 h-6 rounded-full transition-colors ${permission.enabled ? 'bg-blue-600' : 'bg-gray-300'}`}>
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${permission.enabled ? 'translate-x-6' : 'translate-x-1'}`}></div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Data Usage */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Usage</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Wifi className="w-5 h-5 text-gray-500" />
              <div>
                <div className="font-medium text-gray-900">Download over WiFi only</div>
                <div className="text-sm text-gray-600">Save mobile data</div>
              </div>
            </div>
            <button className="w-12 h-6 rounded-full bg-blue-600">
              <div className="w-5 h-5 bg-white rounded-full translate-x-6"></div>
            </button>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-2">This month's usage</div>
            <div className="text-2xl font-bold text-gray-900">247 MB</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSupport = () => (
    <div className="space-y-6">
      {/* Quick Help */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Help</h3>
        <div className="space-y-3">
          {[
            { title: 'Getting Started Guide', desc: 'Learn the basics of the app' },
            { title: 'Planning Your First Trip', desc: 'Step-by-step trip planning' },
            { title: 'Using Fitness Features', desc: 'Maximize your ski preparation' },
            { title: 'Gear Recommendations', desc: 'Find the right equipment' }
          ].map((help, index) => (
            <button key={index} className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="text-left">
                <div className="font-medium text-gray-900">{help.title}</div>
                <div className="text-sm text-gray-600">{help.desc}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Support</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-900">Live Chat</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Settings className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-900">Report a Bug</span>
          </button>
        </div>
      </div>

      {/* App Info */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">App Information</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Version</span>
            <span>2.1.4</span>
          </div>
          <div className="flex justify-between">
            <span>Build</span>
            <span>2024.03.15</span>
          </div>
          <div className="flex justify-between">
            <span>Last Updated</span>
            <span>March 15, 2024</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
          <button className="text-blue-600 hover:text-blue-700 text-sm">Terms of Service</button>
          <button className="text-blue-600 hover:text-blue-700 text-sm block">Privacy Policy</button>
        </div>
      </div>
    </div>
  );

  const sections = [
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'technical', label: 'Technical', icon: Smartphone },
    { id: 'support', label: 'Support', icon: HelpCircle }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'achievements': return renderAchievements();
      case 'profile': return renderProfile();
      case 'preferences': return renderPreferences();
      case 'billing': return renderBilling();
      case 'privacy': return renderPrivacy();
      case 'technical': return renderTechnical();
      case 'support': return renderSupport();
      default: return renderAchievements();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Account</h1>
            <p className="text-gray-600 text-sm mt-1">Manage your profile, achievements, and settings</p>
          </div>
          <button className="flex items-center space-x-2 text-red-600 hover:text-red-700">
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
          <div className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id as any)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{section.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Account;