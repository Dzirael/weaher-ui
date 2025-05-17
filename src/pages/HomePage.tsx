import React, { useState } from 'react';
import { Search, Mail, ArrowRight } from 'lucide-react';
import WeatherDisplay from '../components/WeatherDisplay';
import SubscriptionForm from '../components/SubscriptionForm';
import { WeatherData } from '../types';
import { ApiClient } from '../services/client';

const HomePage: React.FC = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleWeatherSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const apiClient = ApiClient();
      const response = await apiClient.fetchWeather(city);
      setWeatherData(response);
    } catch (error) {
      setError('Failed to fetch weather data. Please try again.');
      console.log(error)
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-8">
          Weather Updates
        </h1>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Search className="w-5 h-5 mr-2 text-blue-600" />
              Check Current Weather
            </h2>
            
            <form onSubmit={handleWeatherSearch} className="mb-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city name"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-300 flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? 'Searching...' : 'Get Weather'}
                  {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
                </button>
              </div>
            </form>
            
            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 mb-4">
                {error}
              </div>
            )}
            
            {weatherData && <WeatherDisplay data={weatherData} city={city} />}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-blue-600" />
              Subscribe to Weather Updates
            </h2>
            <SubscriptionForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;