import React from 'react';
import { Link } from 'react-router-dom'; 
import { Scissors, Hand, Square } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto py-4 px-8">
        <div className="flex items-center justify-center">
          <Link to="/">
            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wider text-center
                         relative
                         animate-pulse
                         bg-clip-text text-transparent 
                         bg-gradient-to-r from-green-400 via-green-600 to-green-400
                         drop-shadow-[0_2px_8px_rgba(34,197,94,0.5)]
                         hover:drop-shadow-[0_4px_12px_rgba(34,197,94,0.8)]
                         transition-all duration-300
                         hover:scale-105">
              Rock Paper Scissors
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
