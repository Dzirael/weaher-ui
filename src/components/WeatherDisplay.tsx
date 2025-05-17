import React from 'react';
import { CloudRain, Thermometer, Droplet } from 'lucide-react';
import { WeatherData } from '../types';

interface WeatherDisplayProps {
  data: WeatherData;
  city: string;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data, city }) => {
  const getWeatherIcon = () => {
    const description = data.description.toLowerCase();
    if (description.includes('rain') || description.includes('drizzle')) {
      return <CloudRain className="w-10 h-10 text-blue-600" />;
    }
    return <Thermometer className="w-10 h-10 text-orange-500" />;
  };

  const getBackgroundClass = () => {
    const description = data.description.toLowerCase();
    if (description.includes('rain') || description.includes('drizzle')) {
      return 'bg-blue-50';
    } else if (description.includes('cloud')) {
      return 'bg-gray-50';
    }
    return 'bg-orange-50';
  };

  return (
    <div className={`rounded-lg p-6 ${getBackgroundClass()} transition-all duration-500`}>
      <div className="flex flex-col md:flex-row items-center mb-4">
        <div className="mr-4 mb-4 md:mb-0">{getWeatherIcon()}</div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 capitalize">{city}</h3>
          <p className="text-gray-600 capitalize">{data.description}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
          <Thermometer className="w-5 h-5 text-orange-500 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Temperature</p>
            <p className="text-lg font-semibold">{data.temperature}°C</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm flex items-center">
          <Droplet className="w-5 h-5 text-blue-500 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Humidity</p>
            <p className="text-lg font-semibold">{data.humidity}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;