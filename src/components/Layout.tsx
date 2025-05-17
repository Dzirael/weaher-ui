import React from 'react';
import { Link } from 'react-router-dom';
import { CloudSun } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <CloudSun className="h-8 w-8" />
            <span className="font-bold text-xl md:text-2xl">WeatherWave</span>
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="py-2 px-3 hover:bg-blue-700 rounded-md transition-colors">
                  Home
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow">{children}</main>
      
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center gap-2 mb-2">
                <CloudSun className="h-6 w-6" />
                <span className="font-bold text-lg">WeatherWave</span>
              </div>
              <p className="text-gray-400 text-sm">Stay updated with the latest weather information</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} WeatherWave. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;