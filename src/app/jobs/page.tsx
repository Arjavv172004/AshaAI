'use client';

import { Ultra, Poppins } from 'next/font/google';
import { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaBuilding, FaMoneyBillWave, FaCalendarAlt, FaExternalLinkAlt, FaSyncAlt } from 'react-icons/fa';

const ultra = Ultra({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
});

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  applyLink: string;
  source: string;
  salary?: string;
  description?: string;
  posted_date?: string;
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

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchJobs = async (city: string) => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`/api/jobs?city=${encodeURIComponent(city)}`, {
        // Add cache: 'no-store' to prevent caching
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch jobs');
      const data = await response.json();
      
      // Log the response for debugging
      console.log('Jobs API Response:', data);
      
      if (data.source === 'fallback') {
        console.warn('Using fallback data - check if RAPID_API_KEY is properly configured');
      }
      
      setJobs(data.jobs);
    } catch (err) {
      setError('Failed to load jobs. Please try again later.');
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(selectedCity);
  }, [selectedCity]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchJobs(selectedCity);
    setRefreshing(false);
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setExpandedJobId(null);
  };

  // Filter jobs based on selected city
  const filteredJobs = selectedCity === 'All Cities' 
    ? jobs 
    : jobs.filter(job => {
        const jobLocation = job.location.toLowerCase();
        const cityLower = selectedCity.toLowerCase();
        return jobLocation.includes(cityLower) || 
               jobLocation.includes(cityLower.replace(' ', '')) || 
               jobLocation.includes(cityLower.split(' ')[0]);
      });

  return (
    <div className="min-h-screen bg-[#FCF5EB] py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className={`text-5xl md:text-6xl ${ultra.className} text-[#BA4B2F] text-center mb-12`}>
          Job Opportunities
        </h1>

        {/* Filters and Refresh */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="w-full md:w-auto">
            <select
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              className={`w-full md:w-64 p-3 rounded-lg border-2 border-[#BA4B2F] bg-white text-[#BA4B2F] ${poppins.className} focus:outline-none focus:ring-2 focus:ring-[#BA4B2F]`}
            >
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing || loading}
            className={`flex items-center gap-2 px-6 py-3 bg-[#BA4B2F] text-white rounded-lg hover:bg-[#A43D20] transition-colors ${poppins.className} disabled:opacity-50`}
          >
            <FaSyncAlt className={`${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh Jobs'}
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#BA4B2F] border-t-transparent mb-4"></div>
            <p className={`${poppins.className} text-[#BA4B2F]`}>Loading jobs...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-10">
            <p className={`text-red-600 ${poppins.className}`}>{error}</p>
          </div>
        )}

        {/* Jobs List */}
        {!loading && !error && (
          <div className="grid gap-6">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-10">
                <p className={`text-[#BA4B2F] ${poppins.className} text-lg`}>
                  No jobs found for {selectedCity}. Try another city or refresh the page.
                </p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl border-2 border-[#BA4B2F]/20"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <h2 className={`text-xl font-bold text-[#BA4B2F] mb-2 ${poppins.className}`}>
                        {job.title}
                      </h2>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaBuilding className="text-[#BA4B2F]" />
                          <span className={poppins.className}>{job.company}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaMapMarkerAlt className="text-[#BA4B2F]" />
                          <span className={poppins.className}>{job.location}</span>
                        </div>
                        {job.salary && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <FaMoneyBillWave className="text-[#BA4B2F]" />
                            <span className={poppins.className}>{job.salary}</span>
                          </div>
                        )}
                        {job.posted_date && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <FaCalendarAlt className="text-[#BA4B2F]" />
                            <span className={poppins.className}>{job.posted_date}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 items-start md:items-end">
                      <a
                        href={job.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-6 py-3 bg-[#BA4B2F] text-white rounded-lg hover:bg-[#A43D20] transition-colors ${poppins.className}`}
                      >
                        Apply Now <FaExternalLinkAlt />
                      </a>
                      <button
                        onClick={() => setExpandedJobId(expandedJobId === job.id ? null : job.id)}
                        className={`text-[#BA4B2F] hover:text-[#A43D20] ${poppins.className} text-sm underline`}
                      >
                        {expandedJobId === job.id ? 'Show Less' : 'Show More'}
                      </button>
                    </div>
                  </div>
                  {expandedJobId === job.id && job.description && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className={`text-gray-700 ${poppins.className} whitespace-pre-line`}>
                        {job.description}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
} 