import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Role, SOSRequest, SOSStatus, MedicalProfile, Location } from './types';
// Make sure the Header component exists at the specified path.
// If the file is named differently or located elsewhere, update the path accordingly.
import Header from "./components/Header";
import PatientView from "./components/PatientView";
import DoctorView from "./components/DoctorView";

const MOCK_PATIENT_PROFILE: MedicalProfile = {
  name: 'Alex Doe',
  bloodGroup: 'O+',
  allergies: ['Peanuts', 'Penicillin'],
  medicalConditions: ['Asthma'],
  emergencyContact: '+1-555-123-4567',
};

const App: React.FC = () => {
  const [role, setRole] = useState<Role>('patient');
  const [sosRequest, setSosRequest] = useState<SOSRequest | null>(null);
  const [sosStatus, setSosStatus] = useState<SOSStatus>(SOSStatus.IDLE);
  const [doctorIsOnline, setDoctorIsOnline] = useState<boolean>(false);
  const [liveLocation, setLiveLocation] = useState<Location | null>(null);
  const locationWatchId = useRef<number | null>(null);

  const stopLocationWatch = useCallback(() => {
    if (locationWatchId.current !== null) {
      navigator.geolocation.clearWatch(locationWatchId.current);
      locationWatchId.current = null;
      console.log('Stopped location tracking.');
    }
  }, []);

  const handleSendSOS = useCallback(() => {
    if (sosStatus !== SOSStatus.IDLE) return;
    
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }
    
    setSosStatus(SOSStatus.SENDING);
    console.log('Requesting location and sending SOS...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const initialLocation: Location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        };
        setLiveLocation(initialLocation);
        
        // Start watching for live updates
        locationWatchId.current = navigator.geolocation.watchPosition(
          (watchPos) => {
            const newLocation: Location = {
              latitude: watchPos.coords.latitude,
              longitude: watchPos.coords.longitude,
              accuracy: watchPos.coords.accuracy,
            };
            setLiveLocation(newLocation);
            console.log('Location updated:', newLocation);
          },
          (error: GeolocationPositionError) => console.error(`Error watching position (Code: ${error.code}): ${error.message}`),
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
        
        // Simulate network delay for sending SOS
        setTimeout(() => {
          const newRequest: SOSRequest = {
            patient: MOCK_PATIENT_PROFILE,
            location: initialLocation,
            timestamp: Date.now(),
          };
          
          if(doctorIsOnline) {
            setSosRequest(newRequest);
            setSosStatus(SOSStatus.SENT);
            console.log('SOS sent to available doctors.');
          } else {
            setSosStatus(SOSStatus.REJECTED);
            console.log('No doctors available. SOS rejected.');
            stopLocationWatch();
            setTimeout(() => setSosStatus(SOSStatus.IDLE), 3000);
          }
        }, 1500);
      },
      (error: GeolocationPositionError) => {
        let userMessage = "Please enable location services and try again.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            userMessage = "Location permission denied. Please enable it in your browser settings to use this feature.";
            break;
          case error.POSITION_UNAVAILABLE:
            userMessage = "Could not determine your location. Please check your connection and try again.";
            break;
          case error.TIMEOUT:
            userMessage = "Getting your location took too long. Please try again.";
            break;
        }
        console.error(`Error getting current position (Code: ${error.code}): ${error.message}`);
        alert(`Could not get your location: ${userMessage}`);
        setSosStatus(SOSStatus.IDLE);
      }
    );
  }, [sosStatus, doctorIsOnline, stopLocationWatch]);
  
  const handleAcceptSOS = useCallback(() => {
    console.log('SOS Accepted by doctor.');
    setSosStatus(SOSStatus.ACCEPTED);
    // Location watch continues until alert is ended by patient.
    // In a real app, the doctor would see the live location until they mark the emergency as resolved.
  }, []);

  const handleDeclineSOS = useCallback(() => {
    console.log('SOS Declined by doctor.');
    setSosRequest(null);
    setSosStatus(SOSStatus.REJECTED);
    stopLocationWatch();
    setTimeout(() => setSosStatus(SOSStatus.IDLE), 3000);
  }, [stopLocationWatch]);
  
  const resetSOS = useCallback(() => {
    setSosStatus(SOSStatus.IDLE);
    setSosRequest(null);
    stopLocationWatch();
  }, [stopLocationWatch]);
  
  useEffect(() => {
    // When switching roles, reset the state to avoid lingering SOS requests
    resetSOS();
  }, [role, resetSOS]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopLocationWatch();
    };
  }, [stopLocationWatch]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
      <Header role={role} setRole={setRole} />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex items-center justify-center">
        {role === 'patient' ? (
          <PatientView 
            profile={MOCK_PATIENT_PROFILE} 
            onSendSOS={handleSendSOS} 
            sosStatus={sosStatus}
            resetSOS={resetSOS}
          />
        ) : (
          <DoctorView 
            sosRequest={sosRequest} 
            liveLocation={liveLocation}
            onAccept={handleAcceptSOS} 
            onDecline={handleDeclineSOS}
            isOnline={doctorIsOnline}
            setIsOnline={setDoctorIsOnline}
          />
        )}
      </main>
    </div>
  );
};

export default App;