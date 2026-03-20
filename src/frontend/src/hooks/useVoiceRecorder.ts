import { useCallback, useEffect, useRef, useState } from "react";

export function useVoiceRecorder(id: string) {
  const storageKey = `voice_recording_${id}`;
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    setHasRecording(!!localStorage.getItem(storageKey));
  }, [storageKey]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          localStorage.setItem(storageKey, base64);
          setHasRecording(true);
        };
        reader.readAsDataURL(blob);
        for (const t of stream.getTracks()) {
          t.stop();
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone access denied:", err);
    }
  }, [storageKey]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  const playRecording = useCallback(() => {
    const base64 = localStorage.getItem(storageKey);
    if (!base64) return;
    const audio = new Audio(base64);
    audio.play();
  }, [storageKey]);

  const deleteRecording = useCallback(() => {
    localStorage.removeItem(storageKey);
    setHasRecording(false);
  }, [storageKey]);

  return {
    isRecording,
    hasRecording,
    startRecording,
    stopRecording,
    playRecording,
    deleteRecording,
  };
}
