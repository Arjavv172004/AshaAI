import { Event } from '@/lib/events';
import { FaMapMarkerAlt, FaCalendarAlt, FaTicketAlt } from 'react-icons/fa';
import { Ultra } from 'next/font/google';

const ultra = Ultra({ weight: '400', subsets: ['latin'] });

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300 flex flex-col h-full">
      {/* Event Image */}
      <div className="relative h-48">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-[#BA4B2F] text-white px-4 py-2 rounded-full capitalize">
          {event.type}
        </div>
      </div>

      {/* Event Details */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className={`${ultra.className} text-2xl text-[#BA4B2F] mb-4`}>
          {event.title}
        </h3>
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <FaCalendarAlt className="text-[#BA4B2F]" />
            <span>
              {event.date} at {event.time}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FaMapMarkerAlt className="text-[#BA4B2F]" />
            <span>
              {event.location}, {event.city}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FaTicketAlt className="text-[#BA4B2F]" />
            <span>{event.price}</span>
          </div>
        </div>
        <p className="text-gray-600 mb-6 flex-1">{event.description}</p>
        <div className="mt-auto">
          <a
            href="https://in.bookmyshow.com/explore/events"
            target="_blank"
            rel="noopener noreferrer"
            className={`${ultra.className} block w-full text-center px-6 py-3 bg-[#BA4B2F] text-white rounded-full hover:bg-[#A43D20] transition-colors`}
          >
            Get Tickets
          </a>
        </div>
      </div>
    </div>
  );
} 