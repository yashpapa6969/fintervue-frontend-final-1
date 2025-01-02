import { useState, useEffect, useRef } from 'react';

const TranscriptPage = () => {
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);
  const mediaRecorderRef = useRef(null);
  const socketRef = useRef(null);

  const startRecording = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      // Create WebSocket connection
      socketRef.current = new WebSocket('ws://localhost:3002');

      socketRef.current.onopen = () => {
        console.log('WebSocket connection established');
        
        mediaRecorderRef.current.addEventListener('dataavailable', async (event) => {
          if (event.data.size > 0 && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(event.data);
          }
        });

        mediaRecorderRef.current.start(1000);
        setIsRecording(true);
      };

      socketRef.current.onmessage = (message) => {
        try {
          const received = JSON.parse(message.data);
          const transcription = received.channel?.alternatives[0]?.transcript;
          if (transcription) {
            setTranscript(prev => prev + ' ' + transcription);
          }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      socketRef.current.onclose = () => {
        console.log('WebSocket connection closed');
        stopRecording();
      };

      socketRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setError('Connection error occurred. Please try again.');
        stopRecording();
      };

    } catch (error) {
      console.error('Error starting recording:', error);
      setError(error.message || 'Failed to start recording. Please check microphone permissions.');
    }
  };

  const stopRecording = () => {
    try {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
      
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.close();
      }
    } catch (error) {
      console.error('Error stopping recording:', error);
    } finally {
      setIsRecording(false);
    }
  };

  const clearTranscript = () => {
    setTranscript('');
  };

  useEffect(() => {
    return () => {
      if (isRecording) {
        stopRecording();
      }
    };
  }, [isRecording]);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Real-time Transcript</h1>
        
        {error && (
          <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-lg">
            {error}
          </div>
        )}

        <div className="mb-6 flex gap-4">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              isRecording 
                ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground' 
                : 'bg-primary hover:bg-primary/90 text-primary-foreground'
            }`}
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>

          <button
            onClick={clearTranscript}
            className="px-6 py-3 rounded-lg font-semibold bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
          >
            Clear Transcript
          </button>
        </div>

        <div className="bg-card rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-card-foreground">Transcript</h2>
          <div className="whitespace-pre-wrap min-h-[200px] p-4 bg-muted rounded-md text-foreground">
            {transcript || 'Transcript will appear here...'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranscriptPage; 