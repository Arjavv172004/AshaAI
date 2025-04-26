'use client';

import { Ultra, Poppins } from 'next/font/google';
import { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaTicketAlt, FaSearch, FaFilter } from 'react-icons/fa';
import { EventCard } from '@/components/EventCard';
import { EventFilter } from '@/components/EventFilter';

const ultra = Ultra({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
});

interface LocalEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  city: string;
  type: 'webinar' | 'workshop' | 'conference' | 'networking';
  imageUrl: string;
  ticketUrl: string;
  price: string;
  organizer: string;
}

const cities = [
  'All Cities',
  'Bangalore',
  'Mumbai',
  'Delhi',
  'Hyderabad',
  'Chennai',
  'Pune',
  'Kolkata',
  'Ahmedabad',
  'Gurgaon',
  'Noida'
];

const eventTypes = [
  'All Types',
  'Webinar',
  'Workshop',
  'Conference',
  'Networking'
];

export default function EventsPage() {
  const [events, setEvents] = useState<LocalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedType, setSelectedType] = useState('All Types');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/events?city=${selectedCity}&type=${selectedType}`);
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data.events);
        setError(null);
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [selectedCity, selectedType]);

  return (
    <main className="min-h-screen bg-[#FCF5EB] py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className={`${ultra.className} text-6xl md:text-7xl text-[#BA4B2F] mb-6`}>
            Upcoming Events
          </h1>
          <p className={`${poppins.className} text-xl text-[#BA4B2F] max-w-3xl mx-auto`}>
            Discover empowering events, webinars, and networking opportunities designed for women professionals.
          </p>
        </div>

        <EventFilter
          selectedCity={selectedCity}
          selectedType={selectedType}
          onCityChange={setSelectedCity}
          onTypeChange={setSelectedType}
        />

        {/* Events Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#BA4B2F] border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className={`text-red-600 ${poppins.className}`}>{error}</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            No events found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 