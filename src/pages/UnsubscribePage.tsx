import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { ApiClient } from '../services/client';

const UnsubscribePage: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'not-found'>('loading');
  const [message, setMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const processUnsubscribe = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');

      if (!token) {
        setStatus('error');
        setMessage('Invalid token. Please check your unsubscribe link.');
        return;
      }

      try {
        const apiClient = ApiClient();
        const status = await apiClient.unsubscribe(token);

        if (status === 200) {
          setStatus('success');
          setMessage('You have been unsubscribed successfully.');
        } else if (status === 400) {
          setStatus('error');
          setMessage('Invalid token. Please check your unsubscribe link.');
        } else if (status === 404) {
          setStatus('not-found');
          setMessage('Token not found. Your unsubscribe link may have expired.');
        } else {
          setStatus('error');
          setMessage('An unexpected error occurred. Please try again later.');
        }
      } catch (error) {
        console.log(error)
        setStatus('error');
        setMessage('Failed to process unsubscribe request. Please try again later.');
      }
    };

    processUnsubscribe();
  }, [location.search]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 px-4 py-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Unsubscribe</h1>

          {status === 'loading' && (
            <div className="flex flex-col items-center py-6">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Processing your request...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center py-6 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Unsubscribed!</h2>
              <p className="text-gray-600 mb-6">{message}</p>
              <p className="text-gray-600 mb-6">You will no longer receive weather updates.</p>
            </div>
          )}

          {(status === 'error' || status === 'not-found') && (
            <div className="flex flex-col items-center py-6 text-center">
              <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {status === 'error' ? 'Error' : 'Not Found'}
              </h2>
              <p className="text-gray-600 mb-6">{message}</p>
            </div>
          )}

          <div className="flex justify-center mt-4">
            <Link
              to="/"
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnsubscribePage;