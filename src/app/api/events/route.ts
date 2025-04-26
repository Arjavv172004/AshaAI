import { NextResponse } from 'next/server';
import { fetchAllEvents } from '@/lib/events';

interface Event {
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

// Mock data for demonstration - Replace with actual API calls
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Women in Tech Conference 2024',
    description: 'Join us for a day of inspiring talks, workshops, and networking opportunities for women in technology.',
    date: '2024-03-15',
    time: '09:00 AM',
    location: 'Taj West End',
    city: 'Bangalore',
    type: 'conference',
    imageUrl: '/events/women-tech.jpg',
    ticketUrl: 'https://bookmyshow.com/events/women-tech-2024',
    price: '₹2,999',
    organizer: 'Women Who Code'
  },
  {
    id: '2',
    title: 'Leadership Workshop for Women',
    description: 'A comprehensive workshop focusing on leadership skills, negotiation, and career advancement.',
    date: '2024-03-20',
    time: '02:00 PM',
    location: 'The Oberoi',
    city: 'Mumbai',
    type: 'workshop',
    imageUrl: '/events/leadership.jpg',
    ticketUrl: 'https://insider.in/leadership-workshop',
    price: '₹1,999',
    organizer: 'Lean In India'
  },
  {
    id: '3',
    title: 'Digital Marketing Webinar',
    description: 'Learn the latest trends in digital marketing and how to build your personal brand online.',
    date: '2024-03-25',
    time: '07:00 PM',
    location: 'Online',
    city: 'All Cities',
    type: 'webinar',
    imageUrl: '/events/digital-marketing.jpg',
    ticketUrl: 'https://zoom.us/webinar/register',
    price: 'Free',
    organizer: 'SheSays India'
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') || 'All Cities';
  const type = searchParams.get('type') || 'All Types';

  try {
    const events = await fetchAllEvents(city, type);
    return NextResponse.json({ events });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
} 