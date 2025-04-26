import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyBJOpd4d0lNfOXEiFu12zurePaeDBdthhw"; // (keep it secure later)

export async function POST(request: Request) {
  let message = '';
  try {
    const body = await request.json();
    message = body.message;

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro", // <--- Use correct model name
    });

    const result = await model.generateContent({
      contents: [
        { role: "user", parts: [{ text: message }] }
      ]
    });

    const response = result.response;
    const aiResponse = response.text();

    return NextResponse.json({ response: aiResponse });
  } catch (error: any) {
    console.error('Error occurred:', error.message || error);

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

    const messageToProcess = message.toLowerCase();
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
