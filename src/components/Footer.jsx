import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-100  text-gray-700 py-8 relative w-full mt-29">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-indigo-600 mb-2">
          Study<span className="text-yellow-500">Mate</span>
        </h2>
        <p className="text-sm mb-4">
          Your personalized guide to master any topic. Plan. Learn. Grow.
        </p>
        <p className="text-xs text-gray-500 border-t pt-4 mt-4">
          © {new Date().getFullYear()} StudyMate. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
