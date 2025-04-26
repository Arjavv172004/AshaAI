import { Ultra } from 'next/font/google';
import { FaChevronDown } from 'react-icons/fa';

const ultra = Ultra({ weight: '400', subsets: ['latin'] });

interface EventFilterProps {
  selectedCity: string;
  selectedType: string;
  onCityChange: (city: string) => void;
  onTypeChange: (type: string) => void;
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
const types = [
  'All Types',
  'Webinar',
  'Workshop',
  'Conference',
  'Networking'
];

export function EventFilter({
  selectedCity,
  selectedType,
  onCityChange,
  onTypeChange,
}: EventFilterProps) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-2xl mb-12 border border-[#E6D7F3] max-w-5xl mx-auto">
      <h2 className={`${ultra.className} text-3xl text-[#BA4B2F] mb-8 font-bold tracking-wide`}>Filter Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <label htmlFor="city" className="block text-[#BA4B2F] text-lg font-semibold mb-3">City</label>
          <div className="relative">
            <select
              id="city"
              value={selectedCity}
              onChange={(e) => onCityChange(e.target.value)}
              className="appearance-none w-full px-5 py-3 border border-[#C4A86B] rounded-full bg-[#FCF5EB] text-[#BA4B2F] text-lg font-medium shadow focus:outline-none focus:ring-2 focus:ring-[#C4A86B] focus:border-transparent transition-all pr-10"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-[#C4A86B] text-lg" />
          </div>
        </div>
        <div className="relative">
          <label htmlFor="type" className="block text-[#BA4B2F] text-lg font-semibold mb-3">Event Type</label>
          <div className="relative">
            <select
              id="type"
              value={selectedType}
              onChange={(e) => onTypeChange(e.target.value)}
              className="appearance-none w-full px-5 py-3 border border-[#C4A86B] rounded-full bg-[#FCF5EB] text-[#BA4B2F] text-lg font-medium shadow focus:outline-none focus:ring-2 focus:ring-[#C4A86B] focus:border-transparent transition-all pr-10"
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-[#C4A86B] text-lg" />
          </div>
        </div>
      </div>
    </div>
  );
} 