import Image from 'next/image';
import Link from 'next/link';
import { Ultra } from 'next/font/google';

const ultra = Ultra({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const Navbar = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#BA4B2F] pl-2 pr-4 py-2 flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="relative w-56 h-20">
        <Image
          src="/ashalogo.png"
          alt="Asha Logo"
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </Link>

      {/* Navigation Links */}
      <div className="flex gap-8">
        <button 
          onClick={() => scrollToSection('about')}
          className={`${ultra.className} text-xl text-[#FCF5EB] hover:opacity-80 transition-opacity`}
        >
          about us
        </button>
        <Link 
          href="/jobs"
          className={`${ultra.className} text-xl text-[#FCF5EB] hover:opacity-80 transition-opacity`}
        >
          jobs
        </Link>
        <Link 
          href="/events"
          className={`${ultra.className} text-xl text-[#FCF5EB] hover:opacity-80 transition-opacity`}
        >
          events
        </Link>
        <button 
          onClick={() => scrollToSection('contact')}
          className={`${ultra.className} text-xl text-[#FCF5EB] hover:opacity-80 transition-opacity`}
        >
          contact
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 