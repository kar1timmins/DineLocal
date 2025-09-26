import { useState } from 'react';

interface SearchFiltersProps {
  onSearch: (filters: {
    city: string;
    country: string;
    cuisineTypes: string[];
  }) => void;
}

const popularCuisines = [
  'Italian',
  'French',
  'Japanese',
  'Mexican',
  'Indian',
  'Thai',
  'Mediterranean',
  'American',
  'Chinese',
  'Spanish',
];

export default function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

  const handleCuisineToggle = (cuisine: string) => {
    setSelectedCuisines(prev => 
      prev.includes(cuisine)
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const handleSearch = () => {
    onSearch({
      city: city.trim(),
      country: country.trim(),
      cuisineTypes: selectedCuisines,
    });
  };

  const handleReset = () => {
    setCity('');
    setCountry('');
    setSelectedCuisines([]);
    onSearch({
      city: '',
      country: '',
      cuisineTypes: [],
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Venues</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter country name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Cuisine Types
        </label>
        <div className="flex flex-wrap gap-2">
          {popularCuisines.map((cuisine) => (
            <button
              key={cuisine}
              onClick={() => handleCuisineToggle(cuisine)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCuisines.includes(cuisine)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSearch}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Search Venues
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Reset
        </button>
      </div>

      {(city || country || selectedCuisines.length > 0) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Active filters: 
            {city && <span className="ml-1 font-medium">City: {city}</span>}
            {country && <span className="ml-1 font-medium">Country: {country}</span>}
            {selectedCuisines.length > 0 && (
              <span className="ml-1 font-medium">
                Cuisines: {selectedCuisines.join(', ')}
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}