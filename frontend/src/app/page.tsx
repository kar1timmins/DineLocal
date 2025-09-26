'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import VenueCard from '@/components/VenueCard';
import SearchFilters from '@/components/SearchFilters';

interface Venue {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  images?: string[];
  cuisineTypes?: string[];
  capacity: number;
  host: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

interface Filters {
  city: string;
  country: string;
  cuisineTypes: string[];
}

export default function Home() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVenues = async (filters?: Filters) => {
    try {
      setLoading(true);
      
      // Mock data for demonstration
      const mockVenues = [
        {
          id: '1',
          name: 'Casa de Sabores',
          description: 'Authentic Mexican home cooking experience in a cozy family setting. Learn traditional recipes passed down through generations.',
          address: '123 Main Street',
          city: 'Barcelona',
          country: 'Spain',
          capacity: 12,
          images: ['/images/casa-de-sabores.jpg'],
          cuisineTypes: ['Mexican', 'Traditional', 'Vegetarian Options'],
          host: {
            id: 'host1',
            firstName: 'Maria',
            lastName: 'Rodriguez',
          },
        },
        {
          id: '2',
          name: 'Tokyo Night Kitchen',
          description: 'Experience the art of Japanese cuisine with hands-on sushi making and traditional cooking techniques.',
          address: '456 Elm Avenue',
          city: 'Tokyo',
          country: 'Japan',
          capacity: 8,
          images: ['/images/tokyo-night.jpg'],
          cuisineTypes: ['Japanese', 'Sushi', 'Traditional'],
          host: {
            id: 'host1',
            firstName: 'Maria',
            lastName: 'Rodriguez',
          },
        },
        {
          id: '3',
          name: 'Tuscan Garden Table',
          description: 'Farm-to-table Italian dining experience in a beautiful garden setting with fresh ingredients.',
          address: '789 Oak Road',
          city: 'Florence',
          country: 'Italy',
          capacity: 16,
          images: ['/images/tuscan-garden.jpg'],
          cuisineTypes: ['Italian', 'Farm-to-Table', 'Organic'],
          host: {
            id: 'host1',
            firstName: 'Maria',
            lastName: 'Rodriguez',
          },
        },
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let filteredVenues = mockVenues;
      
      // Apply filters
      if (filters?.city) {
        filteredVenues = filteredVenues.filter(venue => 
          venue.city.toLowerCase().includes(filters.city.toLowerCase())
        );
      }
      
      if (filters?.country) {
        filteredVenues = filteredVenues.filter(venue => 
          venue.country.toLowerCase().includes(filters.country.toLowerCase())
        );
      }
      
      if (filters?.cuisineTypes && filters.cuisineTypes.length > 0) {
        filteredVenues = filteredVenues.filter(venue =>
          venue.cuisineTypes.some(cuisine => 
            filters.cuisineTypes.includes(cuisine)
          )
        );
      }

      setVenues(filteredVenues);
      setError(null);
    } catch (err) {
      console.error('Error fetching venues:', err);
      setError('Failed to load venues. Please try again later.');
      setVenues([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  const handleSearch = (filters: Filters) => {
    fetchVenues(filters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Unique Dining Experiences
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Book authentic local dining experiences, cooking classes, and food tours 
              hosted by passionate locals in your city.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SearchFilters onSearch={handleSearch} />

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Available Venues
          </h2>
          <p className="text-gray-600 mb-8">
            Discover amazing dining experiences with upcoming availability
          </p>

          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {!loading && !error && venues.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No venues found</h3>
              <p className="text-gray-500">Try adjusting your search filters.</p>
            </div>
          )}

          {!loading && !error && venues.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {venues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
