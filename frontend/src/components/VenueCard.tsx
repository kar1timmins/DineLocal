import Image from 'next/image';
import Link from 'next/link';

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

interface VenueCardProps {
  venue: Venue;
}

export default function VenueCard({ venue }: VenueCardProps) {
  const defaultImage = '/api/placeholder/400/300';
  const imageUrl = venue.images && venue.images.length > 0 ? venue.images[0] : defaultImage;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48">
        <Image
          src={imageUrl}
          alt={venue.name}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = defaultImage;
          }}
        />
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
            Capacity: {venue.capacity}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{venue.name}</h3>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{venue.description}</p>

        <div className="flex items-center text-gray-500 text-sm mb-3">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>{venue.address}, {venue.city}, {venue.country}</span>
        </div>

        <div className="flex items-center text-gray-500 text-sm mb-4">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span>Hosted by {venue.host.firstName} {venue.host.lastName}</span>
        </div>

        {venue.cuisineTypes && venue.cuisineTypes.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {venue.cuisineTypes.slice(0, 3).map((cuisine, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
              >
                {cuisine}
              </span>
            ))}
            {venue.cuisineTypes.length > 3 && (
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                +{venue.cuisineTypes.length - 3} more
              </span>
            )}
          </div>
        )}

        <Link
          href={`/venues/${venue.id}`}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center block"
        >
          View Experiences
        </Link>
      </div>
    </div>
  );
}