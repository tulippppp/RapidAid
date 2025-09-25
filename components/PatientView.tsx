import React from 'react';
import { MedicalProfile, SOSStatus } from '../types';
import MedicalProfileCard from './MedicalProfileCard';

interface PatientViewProps {
  profile: MedicalProfile;
  onSendSOS: () => void;
  sosStatus: SOSStatus;
  resetSOS: () => void;
}

const SOSButton: React.FC<{ onClick: () => void; status: SOSStatus }> = ({ onClick, status }) => {
  const isIdle = status === SOSStatus.IDLE || status === SOSStatus.REJECTED;
  const isSending = status === SOSStatus.SENDING;
  
  const buttonContent: Record<SOSStatus, React.ReactNode> = {
    [SOSStatus.IDLE]: 'SOS',
    [SOSStatus.SENDING]: (
      <div className="flex items-center justify-center">
        <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Sending...
      </div>
    ),
    [SOSStatus.SENT]: 'Sent!',
    [SOSStatus.ACCEPTED]: 'Help is on the way!',
    [SOSStatus.REJECTED]: 'Try Again',
  };

  const buttonClasses: Record<SOSStatus, string> = {
      [SOSStatus.IDLE]: 'bg-red-600 hover:bg-red-700 animate-pulse',
      [SOSStatus.SENDING]: 'bg-yellow-500 cursor-not-allowed',
      [SOSStatus.SENT]: 'bg-blue-500 cursor-not-allowed',
      [SOSStatus.ACCEPTED]: 'bg-green-500 cursor-not-allowed',
      [SOSStatus.REJECTED]: 'bg-red-600 hover:bg-red-700',
  }
  
  return (
    <button
      onClick={onClick}
      disabled={!isIdle}
      className={`w-64 h-64 rounded-full text-white text-5xl font-bold flex items-center justify-center shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-opacity-50 ${buttonClasses[status]}`}
    >
      {buttonContent[status]}
    </button>
  );
};

const StatusMessage: React.FC<{ status: SOSStatus; onReset: () => void }> = ({ status, onReset }) => {
  const messages: Partial<Record<SOSStatus, { text: string; subtext?: string; color: string; showReset?: boolean }>> = {
    [SOSStatus.SENDING]: { text: "Contacting nearby doctors...", color: 'text-yellow-400' },
    [SOSStatus.SENT]: { text: "Alert sent. Waiting for a doctor to accept.", color: 'text-blue-400' },
    [SOSStatus.ACCEPTED]: { text: "A doctor has accepted your request and is en route.", subtext: "Your live location is being shared to guide the doctor.", color: 'text-green-400', showReset: true },
    [SOSStatus.REJECTED]: { text: "No doctors were available. Please try again or call emergency services.", color: 'text-red-400' },
  };

  const message = messages[status];
  if (!message) return null;

  return (
      <div className="text-center mt-8">
        <p className={`text-lg font-semibold ${message.color}`}>{message.text}</p>
        {message.subtext && <p className="text-sm text-gray-500 mt-2">{message.subtext}</p>}
        {message.showReset && (
            <button 
                onClick={onReset}
                className="mt-4 px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white font-semibold transition-colors"
            >
                End Alert
            </button>
        )}
      </div>
  );
};

const PatientView: React.FC<PatientViewProps> = ({ profile, onSendSOS, sosStatus, resetSOS }) => {
  const handleSOSClick = () => {
      if(sosStatus === SOSStatus.IDLE || sosStatus === SOSStatus.REJECTED) {
          onSendSOS();
      }
  }
  return (
    <div className="w-full max-w-4xl flex flex-col items-center animate-fadeIn">
      <div className="mb-8">
        <SOSButton onClick={handleSOSClick} status={sosStatus} />
      </div>

      <StatusMessage status={sosStatus} onReset={resetSOS}/>

      <div className="mt-12 w-full md:w-2/3">
        <h2 className="text-xl font-bold text-center mb-4 text-gray-400">Your Medical Profile</h2>
        <MedicalProfileCard profile={profile} />
      </div>
    </div>
  );
};

export default PatientView;