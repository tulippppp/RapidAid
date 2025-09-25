
import React from 'react';
import { Role } from '../types';

interface HeaderProps {
  role: Role;
  setRole: (role: Role) => void;
}

const Header: React.FC<HeaderProps> = ({ role, setRole }) => {
  const inactiveButtonClass = "bg-gray-700 hover:bg-gray-600 text-gray-300";
  const activeButtonClass = "bg-red-600 text-white shadow-lg";

  return (
    <header className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          <h1 className="text-2xl font-bold tracking-tight text-white">RapidAid</h1>
        </div>
        <div className="flex items-center space-x-2 p-1 bg-gray-900 rounded-full">
          <button
            onClick={() => setRole('patient')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out ${role === 'patient' ? activeButtonClass : inactiveButtonClass}`}
          >
            I'm a Patient
          </button>
          <button
            onClick={() => setRole('doctor')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out ${role === 'doctor' ? activeButtonClass : inactiveButtonClass}`}
          >
            I'm a Doctor
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
