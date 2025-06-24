// Login.tsx - Fixed Back Button
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, AlertCircle } from 'lucide-react';
import { signIn } from '../../firebase/auth';
import { GoogleAuthProvider, signInWithPopup, getAuth, signInWithCredential, OAuthProvider } from 'firebase/auth';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = await signIn(email, password);
      navigate('/explore');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      navigate('/explore');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error signing in with Google');
    }
  };

  const handleAppleSignIn = async () => {
    try {
      const auth = getAuth();
      const provider = new OAuthProvider('apple.com');
      const result = await signInWithPopup(auth, provider);
      navigate('/explore');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error signing in with Apple');
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 bg-blue-900">
      <button
        onClick={() => navigate('/welcome')}
        className="text-white hover:text-white/80 transition-colors self-start flex items-center space-x-2 mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <h1 className="text-3xl font-bold text-white mb-8">Welcome Back</h1>

        {error && (
          <div className="w-full bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 flex items-center space-x-2 text-red-200">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/60 focus:outline-none focus:border-white pl-11"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/60 focus:outline-none focus:border-white pl-11"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-blue-900 rounded-lg py-3 font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-blue-900 text-white/60">Or continue with</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full bg-white text-gray-900 rounded-lg py-3 font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={handleAppleSignIn}
              className="w-full bg-black text-white rounded-lg py-3 font-semibold hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.19 2.31-.89 3.51-.84 1.54.07 2.7.6 3.44 1.51-3.03 1.81-2.52 5.87.22 7.22-.65 1.29-1.51 2.58-2.25 3.3zm-3.08-15c.08 1.68-1.52 3.01-3.23 2.93-.23-1.78 1.41-2.95 3.23-2.93z"
                />
              </svg>
              <span>Continue with Apple</span>
            </button>
          </div>
        </form>

        <p className="mt-8 text-white/60">
          Don't have an account?{' '}
          <button 
            onClick={() => navigate('/create-account')}
            className="text-white hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}