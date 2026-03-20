import { Button } from "@/components/ui/button";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { Mic, Play, Square, Trash2 } from "lucide-react";

interface StepVoiceRecorderProps {
  stepId: string;
}

export function StepVoiceRecorder({ stepId }: StepVoiceRecorderProps) {
  const {
    isRecording,
    hasRecording,
    startRecording,
    stopRecording,
    playRecording,
    deleteRecording,
  } = useVoiceRecorder(stepId);

  return (
    <div
      className="border border-dashed border-gold/40 rounded-xl p-4 bg-gold/5"
      data-ocid="voice.panel"
    >
      <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
        <Mic className="w-4 h-4 text-gold" /> Apni Awaaz Record Karo
      </p>
      <div className="flex gap-2 flex-wrap">
        {!isRecording && !hasRecording && (
          <Button
            size="sm"
            onClick={startRecording}
            className="bg-gold text-white hover:opacity-90"
            data-ocid="voice.button"
          >
            <Mic className="w-4 h-4 mr-1" /> Record Shuru Karo
          </Button>
        )}
        {isRecording && (
          <Button
            size="sm"
            onClick={stopRecording}
            variant="destructive"
            data-ocid="voice.button"
          >
            <Square className="w-4 h-4 mr-1" /> Recording Band Karo
          </Button>
        )}
        {hasRecording && !isRecording && (
          <>
            <Button
              size="sm"
              onClick={playRecording}
              className="bg-emerald-dark text-white hover:opacity-90"
              data-ocid="voice.button"
            >
              <Play className="w-4 h-4 mr-1" /> Awaaz Suno
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={deleteRecording}
              className="border-red-300 text-red-500 hover:bg-red-50"
              data-ocid="voice.delete_button"
            >
              <Trash2 className="w-4 h-4 mr-1" /> Mitao
            </Button>
            <Button
              size="sm"
              onClick={startRecording}
              className="bg-gold text-white hover:opacity-90"
              data-ocid="voice.button"
            >
              <Mic className="w-4 h-4 mr-1" /> Dobara Record Karo
            </Button>
          </>
        )}
      </div>
      {isRecording && (
        <p className="text-xs text-red-500 mt-2 animate-pulse">
          ● Recording ho rahi hai...
        </p>
      )}
    </div>
  );
}
