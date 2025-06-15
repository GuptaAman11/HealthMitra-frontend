import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const VideoCallPage: React.FC = () => {
  const { roomId } = useParams();
  const safeRoomId = `health-${(roomId ?? '').replace(/\s+/g, '-').toLowerCase()}`;

  const navigate = useNavigate();
  const jitsiContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Jitsi Meet script
    const loadJitsiScript = () => {
      const existingScript = document.getElementById('jitsi-script');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://meet.jit.si/external_api.js';
        script.async = true;
        script.id = 'jitsi-script';
        script.onload = startConference;
        document.body.appendChild(script);
      } else {
        startConference();
      }
    };

    // Start the Jitsi conference
    const startConference = () => {
        if ((window as any).JitsiMeetExternalAPI && roomId) {
            const domain = 'meet.jit.si';
            const options = {
            roomName: safeRoomId,
            width: '100%',
            height: 700,
            parentNode: jitsiContainerRef.current,
            userInfo: {
              displayName: 'Patient User',
            },
            configOverwrite: {
              startWithAudioMuted: false,
              startWithVideoMuted: false,
            },
            interfaceConfigOverwrite: {
              TOOLBAR_BUTTONS: [
                'microphone', 'camera', 'desktop', 'fullscreen',
                'fodeviceselection', 'hangup', 'chat', 'raisehand',
                'videoquality', 'tileview', 'settings'
              ],
            },
          };
      
          const api = new (window as any).JitsiMeetExternalAPI(domain, options);
      
          api.addEventListener('readyToClose', () => {
            navigate('/dashboard');
          });
        }
      };

    loadJitsiScript();

    return () => {
      // Clean up if necessary
    };
  }, [roomId, navigate]);

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h2 className="text-xl font-semibold mb-2">Video Consultation Room</h2>
      <div ref={jitsiContainerRef} style={{ height: '700px', width: '100%' }} />
    </div>
  );
};

export default VideoCallPage;
