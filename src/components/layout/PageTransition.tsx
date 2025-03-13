
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.classList.add('animate-fade-in');
      
      const timeout = setTimeout(() => {
        if (pageRef.current) {
          pageRef.current.classList.remove('animate-fade-in');
        }
      }, 400);
      
      return () => clearTimeout(timeout);
    }
  }, [location.pathname]);

  return (
    <div 
      ref={pageRef} 
      className="min-h-screen w-full transition-opacity duration-300 ease-out"
    >
      {children}
    </div>
  );
};

export default PageTransition;
