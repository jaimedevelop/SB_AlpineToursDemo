import React, { useState } from 'react';
import { 
  Activity, 
  Target, 
  TrendingUp, 
  Award, 
  Calendar,
  Clock,
  Zap,
  Play,
  CheckCircle2,
  AlertCircle,
  Cloud,
  Sun,
  Snowflake,
  User,
  BarChart3,
  Timer,
  Heart,
  Mountain,
  ArrowRight,
  Star,
  Trophy,
  Shield
} from 'lucide-react';

const Fit: React.FC = () => {
  const [selectedProgram, setSelectedProgram] = useState<'beginner' | 'intermediate' | 'advanced' | 'comeback'>('intermediate');
  const [skiReadinessScore, setSkiReadinessScore] = useState(73);
  const [daysUntilTrip, setDaysUntilTrip] = useState(21);
  const [todayWeather, setTodayWeather] = useState('rainy');

  const programs = {
    beginner: {
      title: 'Beginner Foundation',
      color: 'green',
      focus: 'Basic strength, balance, flexibility',
      icon: User,
      description: 'Build fundamental fitness for your first ski adventures'
    },
    intermediate: {
      title: 'Sport-Specific Training',
      color: 'blue',
      focus: 'Ski movements, cardio endurance',
      icon: Mountain,
      description: 'Enhance performance with targeted ski conditioning'
    },
    advanced: {
      title: 'Performance Optimization',
      color: 'purple',
      focus: 'Peak performance, injury prevention',
      icon: Trophy,
      description: 'Elite training for advanced skiers and athletes'
    },
    comeback: {
      title: 'Comeback Program',
      color: 'orange',
      focus: 'Safe return, rebuilding confidence',
      icon: Shield,
      description: 'Gradual progression after injury or time away'
    }
  };

  const todaysWorkouts = [
    {
      name: 'Mogul Prep Squats',
      duration: '12 min',
      difficulty: 'Moderate',
      skiConnection: 'Builds quad strength for absorbing mogul impacts',
      completed: true,
      type: 'strength'
    },
    {
      name: 'Balance Board Challenge',
      duration: '8 min',
      difficulty: 'Easy',
      skiConnection: 'Improves edge control and stability on varied terrain',
      completed: true,
      type: 'balance'
    },
    {
      name: 'Cardio Intervals',
      duration: '20 min',
      difficulty: 'Hard',
      skiConnection: 'Builds endurance for full-day skiing',
      completed: false,
      type: 'cardio'
    },
    {
      name: 'Hip Flexor Stretch',
      duration: '10 min',
      difficulty: 'Easy',
      skiConnection: 'Prevents hip tightness from ski boots',
      completed: false,
      type: 'flexibility'
    }
  ];

  const weatherAlternatives = {
    rainy: [
      { name: 'Indoor Plyometrics', reason: 'Great for explosive power without outdoor space' },
      { name: 'Yoga Flow', reason: 'Perfect rainy day flexibility and mindfulness' },
      { name: 'Stair Climbing', reason: 'Builds leg endurance using building stairs' }
    ],
    sunny: [
      { name: 'Trail Running', reason: 'Beautiful weather for outdoor cardio' },
      { name: 'Park Workout', reason: 'Use outdoor equipment and fresh air' }
    ],
    snowy: [
      { name: 'Snow Shoveling Prep', reason: 'Practice the movements you\'ll use on slopes!' },
      { name: 'Cold Weather Training', reason: 'Adapt to skiing conditions' }
    ]
  };

  const milestones = [
    { week: 1, title: 'Foundation Building', status: 'completed', score: 45 },
    { week: 2, title: 'Strength Development', status: 'completed', score: 58 },
    { week: 3, title: 'Current: Power Phase', status: 'active', score: 73 },
    { week: 4, title: 'Peak Conditioning', status: 'upcoming', score: null },
    { week: 5, title: 'Ski Ready!', status: 'upcoming', score: null }
  ];

  const getWorkoutTypeIcon = (type: string) => {
    switch (type) {
      case 'strength': return <Zap className="w-4 h-4" />;
      case 'balance': return <Target className="w-4 h-4" />;
      case 'cardio': return <Heart className="w-4 h-4" />;
      case 'flexibility': return <Activity className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getWeatherIcon = () => {
    switch (todayWeather) {
      case 'rainy': return <Cloud className="w-5 h-5 text-gray-600" />;
      case 'sunny': return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'snowy': return <Snowflake className="w-5 h-5 text-blue-400" />;
      default: return <Cloud className="w-5 h-5 text-gray-600" />;
    }
  };

  const renderWorkoutCard = (workout: any) => (
    <div key={workout.name} className={`p-4 rounded-lg border-2 transition-all ${
      workout.completed 
        ? 'bg-green-50 border-green-200' 
        : 'bg-white border-gray-200 hover:border-blue-300'
    }`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          {getWorkoutTypeIcon(workout.type)}
          <h4 className={`font-semibold ${workout.completed ? 'text-green-800' : 'text-gray-900'}`}>
            {workout.name}
          </h4>
          {workout.completed && <CheckCircle2 className="w-4 h-4 text-green-600" />}
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-600">{workout.duration}</div>
          <div className={`text-xs px-2 py-1 rounded-full ${
            workout.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
            workout.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {workout.difficulty}
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-3">{workout.skiConnection}</p>
      {!workout.completed && (
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
          <Play className="w-4 h-4" />
          <span>Start Workout</span>
        </button>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Fit</h1>
            <p className="text-gray-600 text-sm mt-1">Adaptive ski fitness training</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-1">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-900">T-minus {daysUntilTrip} days</span>
            </div>
            <div className="text-xs text-gray-500">Whistler trip countdown</div>
          </div>
        </div>
        
        {/* Ski Readiness Score */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Mountain className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900">Ski Readiness Score</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-blue-600">{skiReadinessScore}%</span>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${skiReadinessScore}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>Beginner Ready</span>
            <span>Intermediate Ready</span>
            <span>Expert Ready</span>
          </div>
        </div>
      </header>
      
      <main className="flex-1 p-4 bg-gray-50 overflow-y-auto">
        <div className="space-y-6">
          {/* Program Selection */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Training Program</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {Object.entries(programs).map(([key, program]) => {
                const Icon = program.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedProgram(key as any)}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      selectedProgram === key
                        ? `border-${program.color}-300 bg-${program.color}-50`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${
                      selectedProgram === key ? `text-${program.color}-600` : 'text-gray-500'
                    }`} />
                    <div className={`font-medium text-sm ${
                      selectedProgram === key ? `text-${program.color}-900` : 'text-gray-900'
                    }`}>
                      {program.title}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{program.focus}</div>
                  </button>
                );
              })}
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">{programs[selectedProgram].description}</p>
            </div>
          </div>

          {/* Today's Workouts */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Today's Training</h2>
              <div className="flex items-center space-x-2">
                {getWeatherIcon()}
                <span className="text-sm text-gray-600 capitalize">{todayWeather} day</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {todaysWorkouts.map(renderWorkoutCard)}
            </div>
          </div>

          {/* Weather-Based Alternatives */}
          {weatherAlternatives[todayWeather as keyof typeof weatherAlternatives] && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center mb-3">
                {getWeatherIcon()}
                <h3 className="font-semibold text-gray-900 ml-2">Weather Alternatives</h3>
              </div>
              <div className="space-y-2">
                {weatherAlternatives[todayWeather as keyof typeof weatherAlternatives].map((alt, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-white rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{alt.name}</div>
                      <div className="text-sm text-gray-600">{alt.reason}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress Timeline */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Training Progression</h2>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    milestone.status === 'completed' ? 'bg-green-100 text-green-600' :
                    milestone.status === 'active' ? 'bg-blue-100 text-blue-600' :
                    'bg-gray-100 text-gray-400'
                  }`}>
                    {milestone.status === 'completed' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : milestone.status === 'active' ? (
                      <Clock className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-bold">{milestone.week}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${
                      milestone.status === 'active' ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      Week {milestone.week}: {milestone.title}
                    </div>
                    {milestone.score && (
                      <div className="text-sm text-gray-600">Readiness Score: {milestone.score}%</div>
                    )}
                  </div>
                  {milestone.status === 'active' && (
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-900">Current</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center mb-2">
                <BarChart3 className="w-5 h-5 text-purple-600 mr-2" />
                <h3 className="font-semibold text-gray-900">This Week</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Workouts Completed</span>
                  <span className="font-medium">4/5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Time</span>
                  <span className="font-medium">3h 20m</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center mb-2">
                <Timer className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Streak</h3>
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-1">12 days</div>
              <div className="text-sm text-gray-600">Personal best!</div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <div className="flex items-center mb-2">
                <Award className="w-5 h-5 text-yellow-600 mr-2" />
                <h3 className="font-semibold text-gray-900">Next Goal</h3>
              </div>
              <div className="text-sm text-gray-600 mb-2">85% Ski Readiness</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '86%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Fit;