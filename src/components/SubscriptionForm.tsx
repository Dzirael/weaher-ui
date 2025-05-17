import React, { useState } from 'react';
import { Check, AlertTriangle } from 'lucide-react';
import { ApiClient } from '../services/client';

const SubscriptionForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const apiClient = ApiClient();
      const status = await apiClient.subscribe({email, city, frequency});
      
      if (status === 200) {
        setStatus('success');
        setMessage('Subscription successful. Please check your email for confirmation.');
        setEmail('');
        setCity('');
      } else if (status === 400) {
        setStatus('error');
        setMessage('Invalid input. Please check your information and try again.');
      } else if (status === 409) {
        setStatus('error');
        setMessage('This email is already subscribed. Please use a different email.');
      } else {
        setStatus('error');
        setMessage('An unexpected error occurred. Please try again later.');
      }
    } catch (error) {
      console.log(error)
      setStatus('error');
      setMessage('Failed to subscribe. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === 'success' && (
        <div className="p-4 bg-green-50 border-l-4 border-green-500 flex items-start">
          <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
          <p className="text-green-700">{message}</p>
        </div>
      )}
      
      {status === 'error' && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 flex items-start">
          <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5" />
          <p className="text-red-700">{message}</p>
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="your.email@example.com"
          required
        />
      </div>
      
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
          City
        </label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="London"
          required
        />
      </div>
      
      <div>
        <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
          Update Frequency
        </label>
        <select
          id="frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
        </select>
      </div>
      
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 disabled:bg-blue-400"
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>
    </form>
  );
};

export default SubscriptionForm;