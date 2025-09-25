import React from 'react';
import { SOSRequest, Location } from '../types';
import MedicalProfileCard from './MedicalProfileCard';

interface DoctorViewProps {
  sosRequest: SOSRequest | null;
  liveLocation: Location | null;
  onAccept: () => void;
  onDecline: () => void;
  isOnline: boolean;
  setIsOnline: (isOnline: boolean) => void;
}

const ToggleSwitch: React.FC<{ isOnline: boolean; setIsOnline: (isOnline: boolean) => void }> = ({ isOnline, setIsOnline }) => {
    const toggleClass = isOnline ? 'bg-green-500' : 'bg-gray-600';
    const dotClass = isOnline ? 'translate-x-6' : 'translate-x-1';

    return (
        <button
            onClick={() => setIsOnline(!isOnline)}
            className={`${toggleClass} relative inline-flex items-center h-8 rounded-full w-14 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-green-500`}
        >
            <span className={`${dotClass} inline-block w-6 h-6 transform bg-white rounded-full transition-transform duration-300 ease-in-out`} />
        </button>
    );
};


const DoctorView: React.FC<DoctorViewProps> = ({ sosRequest, liveLocation, onAccept, onDecline, isOnline, setIsOnline }) => {
  if (sosRequest && isOnline) {
    const displayLocation = liveLocation || sosRequest.location;
    const mapUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=300&center=lonlat:${displayLocation.longitude},${displayLocation.latitude}&zoom=15&marker=lonlat:${displayLocation.longitude},${displayLocation.latitude};type:awesome;color:%23ff0000;size:large`;

    return (
      <div className="w-full max-w-lg bg-gray-800 rounded-2xl shadow-2xl p-6 border border-red-500/50 animate-fadeIn">
        <h2 className="text-3xl font-bold text-center text-red-500 mb-4 animate-pulse">INCOMING SOS!</h2>
        <div className="mb-6">
            <MedicalProfileCard profile={sosRequest.patient} />
        </div>
        
        <div className="bg-gray-900 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-gray-300 mb-2">Live Location</h3>
            <p className="text-sm text-gray-400">
                Lat: {displayLocation.latitude.toFixed(6)}, Lon: {displayLocation.longitude.toFixed(6)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
                (Accuracy: {displayLocation.accuracy.toFixed(1)} meters)
            </p>
            <div className="mt-3 rounded-lg overflow-hidden bg-gray-700">
                <img 
                    src={mapUrl}
                    alt="Map showing patient's live location" 
                    className="w-full h-auto object-cover"
                />
            </div>
        </div>

        <div className="flex justify-around mt-6">
          <button
            onClick={onAccept}
            className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transition-all transform hover:scale-105"
          >
            Accept
          </button>
          <button
            onClick={onDecline}
            className="px-8 py-3 bg-gray-600 text-white font-bold rounded-lg shadow-lg hover:bg-gray-700 transition-all transform hover:scale-105"
          >
            Decline
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center animate-fadeIn">
        <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`font-semibold text-lg ${isOnline ? 'text-gray-400' : 'text-white'}`}>Offline</span>
            <ToggleSwitch isOnline={isOnline} setIsOnline={setIsOnline} />
            <span className={`font-semibold text-lg ${isOnline ? 'text-green-400' : 'text-gray-400'}`}>Online</span>
        </div>
        
        {isOnline ? (
            <>
                <div className="relative flex items-center justify-center">
                    <div className="absolute h-48 w-48 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
                    <div className="absolute h-32 w-32 bg-blue-500 rounded-full opacity-20 animate-ping delay-1000"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-1.414a5 5 0 010-7.072m7.072 0a5 5 0 010 7.072M12 12a1 1 0 100-2 1 1 0 000 2z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-300 mt-8">Waiting for emergency requests...</h2>
                <p className="text-gray-500 mt-2">You will be notified of any SOS alerts in your area.</p>
            </>
        ) : (
            <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <h2 className="text-2xl font-semibold text-gray-500 mt-8">You are currently offline.</h2>
                <p className="text-gray-600 mt-2">Go online to start receiving emergency requests.</p>
            </>
        )}
    </div>
  );
};

export default DoctorView;