import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    // Check if we have an API key
    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error('API key not configured');
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://localhost:3000',
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          {
            role: 'system',
            content: 'You are Asha, a helpful and friendly AI assistant focused on women empowerment and career development. You provide detailed, accurate, and helpful responses.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from OpenRouter');
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error('Error:', error);
    
    // Enhanced fallback response
    const fallbackResponses = {
      greeting: [
        "Hello! I'm Asha, your AI assistant. How can I help you today?",
        "Hi there! I'm here to assist you. What would you like to know?",
        "Welcome! I'm Asha, ready to help you with your questions."
      ],
      career: [
        "I can help you with career advice, job opportunities, and professional development. What specific area would you like to explore?",
        "Looking for career guidance? I can help with job search tips, interview preparation, and career planning.",
        "I specialize in career development and women empowerment. How can I assist you in your professional journey?"
      ],
      mentorship: [
        "I can connect you with mentorship opportunities and provide guidance on finding the right mentor.",
        "Looking for mentorship? I can help you understand different mentorship programs and how to benefit from them.",
        "Mentorship is a great way to grow professionally. I can help you explore mentorship options."
      ],
      events: [
        "I can help you find upcoming events, webinars, and networking opportunities.",
        "Looking for professional events? I can guide you to relevant workshops and networking sessions.",
        "I can help you discover events that match your professional interests and goals."
      ],
      default: [
        "I understand your question. Let me help you with that. Could you please provide more details about what you'd like to know?",
        "I'm here to help! Could you please rephrase your question or provide more context?",
        "I'd be happy to assist you. Could you please clarify what you're looking for?"
      ]
    };

    // Simple keyword matching for fallback responses
    const messageToProcess = (await request.json()).message.toLowerCase();
    
    let selectedResponse = fallbackResponses.default[Math.floor(Math.random() * fallbackResponses.default.length)];
    
    if (messageToProcess.includes('hello') || messageToProcess.includes('hi')) {
      selectedResponse = fallbackResponses.greeting[Math.floor(Math.random() * fallbackResponses.greeting.length)];
    } else if (messageToProcess.includes('career') || messageToProcess.includes('job')) {
      selectedResponse = fallbackResponses.career[Math.floor(Math.random() * fallbackResponses.career.length)];
    } else if (messageToProcess.includes('mentor')) {
      selectedResponse = fallbackResponses.mentorship[Math.floor(Math.random() * fallbackResponses.mentorship.length)];
    } else if (messageToProcess.includes('event') || messageToProcess.includes('webinar')) {
      selectedResponse = fallbackResponses.events[Math.floor(Math.random() * fallbackResponses.events.length)];
    }

    return NextResponse.json({ response: selectedResponse });
  }
} 