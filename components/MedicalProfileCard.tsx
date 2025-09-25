
import React from 'react';
import { MedicalProfile } from '../types';

interface MedicalProfileCardProps {
  profile: MedicalProfile;
}

const InfoRow: React.FC<{ label: string; value: string | string[]; icon: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="flex items-start py-3">
    <div className="w-8 mr-4 text-red-400">{icon}</div>
    <div className="flex-1">
      <p className="text-sm font-semibold text-gray-400">{label}</p>
      <p className="text-md font-medium text-white">
        {Array.isArray(value) ? value.join(', ') : value}
      </p>
    </div>
  </div>
);

const MedicalProfileCard: React.FC<MedicalProfileCardProps> = ({ profile }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-5 border border-gray-700">
      <div className="flex items-center pb-4 border-b border-gray-700">
        <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white text-xl font-bold mr-4">
            {profile.name.charAt(0)}
        </div>
        <div>
            <h3 className="text-xl font-bold text-white">{profile.name}</h3>
            <p className="text-sm text-gray-400">Emergency Medical Profile</p>
        </div>
      </div>
      <div className="divide-y divide-gray-700">
        <InfoRow 
            label="Blood Group" 
            value={profile.bloodGroup} 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 00-.517-3.86l-2.387-.477a2 2 0 00-.547-1.806z" /></svg>}
        />
        <InfoRow 
            label="Allergies" 
            value={profile.allergies} 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
        />
        <InfoRow 
            label="Existing Conditions" 
            value={profile.medicalConditions} 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}
        />
         <InfoRow 
            label="Emergency Contact" 
            value={profile.emergencyContact} 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
        />
      </div>
    </div>
  );
};

export default MedicalProfileCard;
