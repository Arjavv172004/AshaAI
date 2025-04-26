import { useState } from 'react';
import { Event } from '@/lib/events';
import { EventCard } from './EventCard';
import { EventFilter } from './EventFilter';

interface EventListProps {
  events: Event[];
}

export function EventList({ events }: EventListProps) {
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const filteredEvents = events.filter((event) => {
    const cityMatch = selectedCity === 'All' || event.city === selectedCity;
    const typeMatch = selectedType === 'All' || event.type === selectedType;
    return cityMatch && typeMatch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <EventFilter
        selectedCity={selectedCity}
        selectedType={selectedType}
        onCityChange={setSelectedCity}
        onTypeChange={setSelectedType}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No events found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
} 