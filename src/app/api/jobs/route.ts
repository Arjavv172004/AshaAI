import { NextResponse } from 'next/server';

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

async function fetchLinkedInJobs(city: string): Promise<Job[]> {
  try {
    const url = `https://linkedin-jobs-search.p.rapidapi.com/search`;
    
    // Create multiple search queries to get more relevant results
    const searchQueries = [
      {
        search_terms: `women hiring ${city === 'All Cities' ? 'India' : city}`,
        location: city === 'All Cities' ? 'India' : `${city}, India`,
        page: '1',
        fetch_full_text: 'yes',
        num_results: '100'
      },
      {
        search_terms: `diversity hiring ${city === 'All Cities' ? 'India' : city}`,
        location: city === 'All Cities' ? 'India' : `${city}, India`,
        page: '1',
        fetch_full_text: 'yes',
        num_results: '100'
      },
      {
        search_terms: `female candidates ${city === 'All Cities' ? 'India' : city}`,
        location: city === 'All Cities' ? 'India' : `${city}, India`,
        page: '1',
        fetch_full_text: 'yes',
        num_results: '100'
      }
    ];

    // Fetch jobs for each search query
    const jobPromises = searchQueries.map(async (query) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': process.env.RAPID_API_KEY || '',
          'X-RapidAPI-Host': 'linkedin-jobs-search.p.rapidapi.com'
        },
        body: JSON.stringify(query)
      });

      if (!response.ok) {
        throw new Error('Failed to fetch from LinkedIn Jobs API');
      }

      const data = await response.json();
      return data;
    });

    // Wait for all requests to complete
    const results = await Promise.all(jobPromises);
    
    // Combine and deduplicate results
    const allJobs = results.flat();
    const uniqueJobs = Array.from(new Map(allJobs.map(job => 
      [`${job.job_id}-${job.company_name}-${job.job_title}`, job]
    )).values());

    // More strict filtering for city-specific results
    const filteredJobs = city === 'All Cities' 
      ? uniqueJobs 
      : uniqueJobs.filter(job => {
          const jobLocation = (job.location || '').toLowerCase();
          const cityLower = city.toLowerCase();
          return jobLocation.includes(cityLower) || 
                 jobLocation.includes(cityLower.replace(' ', '')) || // Handle cases like "New Delhi" vs "NewDelhi"
                 jobLocation.includes(cityLower.split(' ')[0]); // Handle partial matches like "Delhi NCR"
        });

    // Map and return only the first 15 most relevant jobs
    return filteredJobs.slice(0, 15).map((job: any) => ({
      id: `linkedin-${job.job_id || Math.random().toString(36).substr(2, 9)}`,
      title: job.job_title,
      company: job.company_name,
      location: job.location || city,
      salary: job.salary_range || 'Salary not specified',
      applyLink: job.linkedin_job_url_cleaned || 
                 job.job_url || 
                 `https://www.linkedin.com/jobs/view/${job.job_id}`,
      source: 'LinkedIn',
      description: job.job_description,
      posted_date: job.posted_date || 'Recently posted'
    }));
  } catch (error) {
    console.error('Error fetching from LinkedIn Jobs:', error);
    return [];
  }
}

// Enhanced fallback data with women-focused jobs
const fallbackJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Software Developer - Women Returnship Program',
    company: 'Tech Solutions Inc',
    location: 'Bangalore',
    salary: '₹15,00,000 - ₹25,00,000 /year',
    applyLink: 'https://linkedin.com/jobs/',
    source: 'LinkedIn',
    description: 'Special returnship program for women in tech with a career break. Flexible work hours, mentorship, and childcare support available.',
    posted_date: '2024-02-20'
  },
  {
    id: '2',
    title: 'Diversity & Inclusion Program Manager',
    company: 'Global Services Ltd',
    location: 'Mumbai',
    salary: '₹12,00,000 - ₹18,00,000 /year',
    applyLink: 'https://linkedin.com/jobs/',
    source: 'LinkedIn',
    description: 'Looking for an experienced professional to lead our D&I initiatives. Women candidates are strongly encouraged to apply.',
    posted_date: '2024-02-19'
  },
  {
    id: '3',
    title: 'Marketing Lead - WomenInTech Initiative',
    company: 'Digital Solutions',
    location: 'Delhi',
    salary: '₹10,00,000 - ₹15,00,000 /year',
    applyLink: 'https://linkedin.com/jobs/',
    source: 'LinkedIn',
    description: 'Join our marketing team to drive campaigns focused on women in technology. Flexible work arrangements available.',
    posted_date: '2024-02-18'
  },
  {
    id: '4',
    title: 'Data Scientist - Women Preferred',
    company: 'Tech Corp',
    location: 'Hyderabad',
    salary: '₹18,00,000 - ₹25,00,000 /year',
    applyLink: 'https://linkedin.com/jobs/',
    source: 'LinkedIn',
    description: 'Seeking women data scientists to join our growing analytics team. Work from home options available.',
    posted_date: '2024-02-17'
  },
  {
    id: '5',
    title: 'Product Manager - Diversity Hiring',
    company: 'Innovation Labs',
    location: 'Bangalore',
    salary: '₹20,00,000 - ₹30,00,000 /year',
    applyLink: 'https://linkedin.com/jobs/',
    source: 'LinkedIn',
    description: 'Looking for women product managers to lead our innovative products. Mentorship and leadership development programs available.',
    posted_date: '2024-02-16'
  }
];

export async function GET(request: Request) {
  try {
    // Get the city from query parameters
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city') || 'All Cities';

    // If no API key is configured, return fallback data
    if (!process.env.RAPID_API_KEY) {
      console.warn('No RAPID_API_KEY found in environment variables');
      return NextResponse.json({
        jobs: fallbackJobs,
        total: fallbackJobs.length,
        source: 'fallback'
      });
    }

    // Fetch jobs
    const jobs = await fetchLinkedInJobs(city);

    // If no jobs were fetched, use fallback data
    if (jobs.length === 0) {
      return NextResponse.json({
        jobs: fallbackJobs,
        total: fallbackJobs.length,
        source: 'fallback'
      });
    }

    return NextResponse.json({
      jobs,
      total: jobs.length,
      source: 'api'
    });

  } catch (error) {
    console.error('Error in jobs API:', error);
    return NextResponse.json({
      jobs: fallbackJobs,
      total: fallbackJobs.length,
      source: 'fallback'
    });
  }
} 