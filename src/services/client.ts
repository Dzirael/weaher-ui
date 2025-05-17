import { WeatherData } from '../types';

interface SubscribeParams {
  email: string;
  city: string;
  frequency: string;
}

export class WeatherApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:8085') {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType?.includes('application/json')) {
      return response.json();
    }

    return (await response.text()) as unknown as T;
  }

  async fetchWeather(city: string): Promise<WeatherData> {
    return this.request<WeatherData>(`/weather?city=${encodeURIComponent(city)}`);
  }

  async subscribe(params: SubscribeParams): Promise<number> {
    const body = new URLSearchParams({
      email: params.email,
      city: params.city,
      frequency: params.frequency,
    }).toString();

    const url = `${this.baseUrl}/subscribe`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    return response.status
  }

  async confirmSubscription(token: string): Promise<number> {
    const url = `${this.baseUrl}/confirm/${encodeURIComponent(token)}`;
    const response = await fetch(url);
    return response.status;
  }

  async unsubscribe(token: string): Promise<number>  {
    const url = `${this.baseUrl}/unsubscribe/${encodeURIComponent(token)}`;
    const response = await fetch(url);
    return response.status;
  }
}

export const ApiClient = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8085';
  return new WeatherApiClient(baseUrl);
};