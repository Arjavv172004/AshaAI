'use client';

import { Ultra, Poppins } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useRouter } from 'next/navigation';

const ultra = Ultra({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
});

interface CountingNumberProps {
  end: number;
  duration?: number;
}

const CountingNumber: React.FC<CountingNumberProps> = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      let animationFrame: number | null = null;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / (duration * 1000), 1);
        
        setCount(Math.floor(end * percentage));

        if (percentage < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      controls.start({ opacity: 1, y: 0 });
      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [isInView, end, duration, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration: 0.5 }}
    >
      {count}+
    </motion.div>
  );
};

export default function Home() {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 3000);
  };

  return (
    <main className="min-h-screen relative bg-[#FCF5EB]">
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-[#BA4B2F] text-center">
        <div className={`${ultra.className} flex flex-col gap-4 mb-8`}>
          <h2 className="text-4xl md:text-5xl tracking-wider">
            Welcome to
          </h2>
          <h1 className="text-8xl md:text-[12rem] leading-none tracking-widest font-black uppercase transform hover:scale-105 transition-all duration-500 text-[#BA4B2F] hover:text-[#8A3727]">
            ASHA AI
          </h1>
        </div>
        
        <button 
          className={`${ultra.className} mt-8 px-10 py-4 text-xl md:text-2xl bg-[#BA4B2F] hover:bg-[#a3442a] text-white rounded-full border-2 border-[#BA4B2F] transition-all duration-300 hover:scale-105 shadow-lg`}
          onClick={() => router.push('/chat')}
        >
          Try ChatBot Now!
        </button>
      </div>

      {/* About Us Section */}
      <section id="about" className="relative bg-[#BA4B2F] py-24">
        {/* Curved top edge */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-[#FCF5EB]" style={{
          borderBottomLeftRadius: '50% 100%',
          borderBottomRightRadius: '50% 100%',
        }}></div>

        <div className="container mx-auto px-8 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h2 className={`${ultra.className} text-[#FCF5EB] text-6xl mb-8`}>
                About
                <br />
                us
              </h2>
              <p className={`${poppins.className} text-[#FCF5EB] text-lg leading-relaxed opacity-90`}>
                At aasha Foundation, we are committed to empowering women by providing seamless access 
                to career opportunities, mentorship programs, events, and community support. Through Asha, our 
                AI-powered virtual assistant, we aim to enhance user engagement by offering real-time, context-aware 
                responses that guide users in exploring relevant resources. Built on ethical AI principles, 
                Asha ensures inclusive, bias-free, and privacy-conscious interactions. Leveraging advanced 
                technologies like retrieval-augmented generation and semantic search, Asha helps users navigate 
                their professional journey with accurate, meaningful, and accessible information tailored to 
                their needs.
              </p>
            </div>

            {/* Video */}
            <div className="relative h-[600px] rounded-3xl overflow-hidden">
              <video
                src="/findherjob.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="relative bg-[#FCF5EB] py-32">
        <div className="container mx-auto px-8">
          <h2 className={`${ultra.className} text-center text-[#BA4B2F] text-7xl md:text-8xl mb-24`}>
            What We Offer
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Career Opportunities Card */}
            <div className="bg-[#E6D7F3] rounded-[2rem] p-8 text-center transform hover:scale-105 transition-transform duration-300">
              <h3 className={`${ultra.className} text-white text-3xl md:text-4xl mb-6`}>
                Career
                <br />
                Opportunities
              </h3>
              <p className={`${poppins.className} text-white text-lg leading-relaxed`}>
                Handpicked jobs from women-friendly employers. Remote, hybrid, and full-time roles tailored for all career stages.
              </p>
            </div>

            {/* Events Card */}
            <div className="bg-[#C4A86B] rounded-[2rem] p-8 text-center transform hover:scale-105 transition-transform duration-300">
              <h3 className={`${ultra.className} text-white text-3xl md:text-4xl mb-6`}>
                Events &
                <br />
                Webinars
                <br />
                Executive
              </h3>
              <p className={`${poppins.className} text-white text-lg leading-relaxed`}>
                Stay updated on upcoming career sessions, networking events, and community meetups designed to help you connect and grow.
              </p>
            </div>

            {/* Mentorship Card */}
            <div className="bg-[#E17A54] rounded-[2rem] p-8 text-center transform hover:scale-105 transition-transform duration-300">
              <h3 className={`${ultra.className} text-white text-3xl md:text-4xl mb-6`}>
                Mentorship
                <br />
                Access
              </h3>
              <p className={`${poppins.className} text-white text-lg leading-relaxed`}>
                Connect with experienced mentors who will support your journey, share advice, and help you build a strong foundation in your career.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="relative min-h-screen">
        {/* Background Image */}
        <Image
          src="/explore.png"
          alt="Background pattern"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-8 py-32">
          <div className="max-w-4xl">
            <h2 className={`${ultra.className} text-[#FCF5EB] text-6xl md:text-7xl leading-tight mb-8`}>
              Explore
              <br />
              Opportunities.
              <br />
              Empower Your
              <br />
              Future.
            </h2>
            
            <p className={`${poppins.className} text-[#FCF5EB] text-xl md:text-2xl mb-12 opacity-90`}>
              Find career opportunities that are inclusive, flexible, and designed to support your growth.
            </p>

            <button
              onClick={() => router.push('/jobs')}
              className={`${ultra.className} px-10 py-4 text-xl bg-[#FCF5EB] text-[#BA4B2F] rounded-full hover:bg-[#f5e6d3] transition-colors duration-300`}
            >
              Find Jobs
            </button>
          </div>
        </div>
      </section>

      {/* Webinars Section */}
      <section className="relative min-h-screen">
        {/* Background Image */}
        <Image
          src="/webniar.png"
          alt="Background with illustration"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-8 py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`${ultra.className} text-[#BA4B2F] text-6xl md:text-7xl leading-tight mb-8`}>
              Stay Inspired
              <br />
              Stay Informed
            </h2>
            
            <p className={`${poppins.className} text-[#BA4B2F] text-xl md:text-2xl mb-12 max-w-3xl mx-auto`}>
              Explore our curated list of webinars, career-building events, and networking 
              opportunities—designed to support, uplift, and connect women 
              professionals across industries.
            </p>

            <button
              onClick={() => router.push('/events')}
              className={`${ultra.className} px-10 py-4 text-xl bg-[#BA4B2F] text-white rounded-full hover:bg-[#a3442a] transition-colors duration-300`}
            >
              Webinars & Events
            </button>
          </div>
        </div>
      </section>

      {/* Mentorship Section */}
      <section className="relative min-h-screen flex flex-col">
        {/* Top brown background with curve */}
        <div className="bg-[#BA4B2F] pt-16 pb-40">
          <div className="container mx-auto px-4">
            <div className="bg-[#FCF5EB] rounded-full py-6 px-12 max-w-4xl mx-auto">
              <h2 className={`${ultra.className} text-[#BA4B2F] text-4xl md:text-5xl text-center whitespace-nowrap`}>
                Over the Past Few Years
              </h2>
            </div>
          </div>
        </div>

        {/* Curved transition to cream background */}
        <div className="bg-[#FCF5EB] flex-grow relative">
          {/* Curved top edge */}
          <div 
            className="absolute -top-32 left-0 right-0 h-32 bg-[#FCF5EB]" 
            style={{
              borderTopLeftRadius: '50% 100%',
              borderTopRightRadius: '50% 100%',
            }}
          ></div>

          {/* Stats Content */}
          <div className="container mx-auto px-4 -mt-0 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {/* Women Empowered */}
              <div className="text-center">
                <div className="bg-[#BA4B2F] rounded-full py-6 px-12 mb-8 inline-block">
                  <span className={`${ultra.className} text-[#FCF5EB] text-6xl md:text-7xl`}>
                    <CountingNumber end={1500} />
                  </span>
                </div>
                <h3 className={`${poppins.className} text-[#BA4B2F] text-3xl md:text-4xl leading-relaxed`}>
                  Womens
                  <br />
                  Empowered
                </h3>
              </div>

              {/* Years of Expertise */}
              <div className="text-center">
                <div className="bg-[#BA4B2F] rounded-full py-6 px-12 mb-8 inline-block">
                  <span className={`${ultra.className} text-[#FCF5EB] text-6xl md:text-7xl`}>
                    <CountingNumber end={7} duration={1.5} />
                  </span>
                </div>
                <h3 className={`${poppins.className} text-[#BA4B2F] text-3xl md:text-4xl leading-relaxed`}>
                  Years of
                  <br />
                  Expertise
                </h3>
              </div>

              {/* Mentorship Sessions */}
              <div className="text-center">
                <div className="bg-[#BA4B2F] rounded-full py-6 px-12 mb-8 inline-block">
                  <span className={`${ultra.className} text-[#FCF5EB] text-6xl md:text-7xl`}>
                    <CountingNumber end={250} />
                  </span>
                </div>
                <h3 className={`${poppins.className} text-[#BA4B2F] text-3xl md:text-4xl leading-relaxed`}>
                  Mentorship Sessions
                  <br />
                  Conducted
                </h3>
              </div>
            </div>
          </div>

          {/* Bottom curved brown background */}
          <div className="bg-[#BA4B2F] relative mt-20">
            <div 
              className="absolute -top-32 left-0 right-0 h-32 bg-[#BA4B2F]" 
              style={{
                borderTopLeftRadius: '50% 100%',
                borderTopRightRadius: '50% 100%',
              }}
            ></div>
            <div className="h-32"></div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative min-h-screen bg-[#FCF5EB] py-32">
        {/* Background Image */}
        <Image
          src="/pins.png"
          alt="Background pattern with pins"
          fill
          style={{ objectFit: 'cover' }}
          priority
          className="opacity-40"
        />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-8">
          <h2 className={`${ultra.className} text-[#BA4B2F] text-6xl md:text-7xl text-center mb-20`}>
            Testimonials
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* Testimonial Card 1 */}
            <div className="flex flex-col items-center">
              <div className="bg-[#BA4B2F] rounded-3xl p-3 mb-4 w-full aspect-[4/3]">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/khushi.png"
                    alt="Testimonial 1"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                </div>
              </div>
              <div className="w-full h-1 bg-[#BA4B2F] mb-4"></div>
              <h3 className={`${ultra.className} text-[#BA4B2F] text-3xl mb-4`}>
                Khushi Upadhyay
              </h3>
              <p className={`${poppins.className} text-[#BA4B2F] text-lg text-center mb-4`}>
                Asha AI has transformed how I explore career opportunities. It's empowering, insightful, and truly built for women like me!
              </p>
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-[#BA4B2F]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial Card 2 */}
            <div className="flex flex-col items-center">
              <div className="bg-[#BA4B2F] rounded-3xl p-3 mb-4 w-full aspect-[4/3]">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/nandini.png"
                    alt="Testimonial 2"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                </div>
              </div>
              <div className="w-full h-1 bg-[#BA4B2F] mb-4"></div>
              <h3 className={`${ultra.className} text-[#BA4B2F] text-3xl mb-4`}>
                Nandini Sharma
              </h3>
              <p className={`${poppins.className} text-[#BA4B2F] text-lg text-center mb-4`}>
                Finding mentorship and events through Asha Bot is seamless. It feels like having a career coach at my fingertips!
              </p>
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-[#BA4B2F]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial Card 3 */}
            <div className="flex flex-col items-center">
              <div className="bg-[#BA4B2F] rounded-3xl p-3 mb-4 w-full aspect-[4/3]">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/chhavi.png"
                    alt="Testimonial 3"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                </div>
              </div>
              <div className="w-full h-1 bg-[#BA4B2F] mb-4"></div>
              <h3 className={`${ultra.className} text-[#BA4B2F] text-3xl mb-4`}>
                Chhavi Ambor
              </h3>
              <p className={`${poppins.className} text-[#BA4B2F] text-lg text-center mb-4`}>
                I love how Asha ensures safe, bias-free conversations while guiding me to real opportunities. A true game-changer!
              </p>
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-[#BA4B2F]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative min-h-screen bg-[#FCF5EB]">
        {/* Top curved brown section */}
        <div className="absolute top-0 left-0 right-0 h-[300px] bg-[#C86F57]" style={{
          borderBottomLeftRadius: '50% 50%',
          borderBottomRightRadius: '50% 50%',
        }}></div>

        {/* Contact Form */}
        <div className="relative z-10 container mx-auto px-4 pt-32">
          <form 
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto bg-[#BA4B2F] rounded-3xl p-8 md:p-10 space-y-6"
          >
            {/* Contact Us Title */}
            <h2 className={`${ultra.className} text-[#FCF5EB] text-5xl md:text-6xl text-center mb-6`}>
              Contact Us
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div>
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  className={`${poppins.className} w-full px-7 py-4 text-lg rounded-full bg-[#FCF5EB] text-[#BA4B2F] placeholder-[#BA4B2F] opacity-90 focus:outline-none focus:ring-2 focus:ring-[#BA4B2F] focus:ring-opacity-50`}
                />
              </div>

              {/* Email Input */}
              <div>
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  className={`${poppins.className} w-full px-7 py-4 text-lg rounded-full bg-[#FCF5EB] text-[#BA4B2F] placeholder-[#BA4B2F] opacity-90 focus:outline-none focus:ring-2 focus:ring-[#BA4B2F] focus:ring-opacity-50`}
                />
              </div>

              {/* Contact Number */}
              <div>
                <input
                  type="tel"
                  placeholder="Contact number"
                  required
                  className={`${poppins.className} w-full px-7 py-4 text-lg rounded-full bg-[#FCF5EB] text-[#BA4B2F] placeholder-[#BA4B2F] opacity-90 focus:outline-none focus:ring-2 focus:ring-[#BA4B2F] focus:ring-opacity-50`}
                />
              </div>

              {/* Reason for Contact */}
              <div>
                <input
                  type="text"
                  placeholder="Reason for contacting"
                  required
                  className={`${poppins.className} w-full px-7 py-4 text-lg rounded-full bg-[#FCF5EB] text-[#BA4B2F] placeholder-[#BA4B2F] opacity-90 focus:outline-none focus:ring-2 focus:ring-[#BA4B2F] focus:ring-opacity-50`}
                />
              </div>
            </div>

            {/* Message Input */}
            <div>
              <textarea
                placeholder="Your message (optional)"
                rows={4}
                className={`${poppins.className} w-full px-7 py-4 text-lg rounded-3xl bg-[#FCF5EB] text-[#BA4B2F] placeholder-[#BA4B2F] opacity-90 focus:outline-none focus:ring-2 focus:ring-[#BA4B2F] focus:ring-opacity-50 resize-none`}
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className={`${ultra.className} px-14 py-4 text-xl bg-[#FCF5EB] text-[#BA4B2F] rounded-full hover:bg-[#f5e6d3] transition-all duration-300 transform hover:scale-105`}
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Success Popup */}
        {showSuccessPopup && (
          <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center">
              {/* Popup */}
              <div className="bg-[#FCF5EB] rounded-3xl p-8 transform animate-fade-in-up shadow-2xl max-w-md w-full mx-4">
                <div className="text-center">
                  <h3 className={`${ultra.className} text-[#BA4B2F] text-2xl mb-4`}>
                    Thank You!
                  </h3>
                  <p className={`${poppins.className} text-[#BA4B2F] text-lg`}>
                    We've received your message and will contact you shortly.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
} 