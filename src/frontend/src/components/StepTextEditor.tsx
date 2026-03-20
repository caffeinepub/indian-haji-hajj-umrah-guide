import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface StepTextEditorProps {
  stepId: string;
  defaultText: string;
}

export function StepTextEditor({ stepId, defaultText }: StepTextEditorProps) {
  const { isAdmin } = useAdminAuth();
  const storageKey = `custom_text_${stepId}`;
  const [customText, setCustomText] = useState<string>(
    () => localStorage.getItem(storageKey) || "",
  );
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");

  const displayText = customText || defaultText;

  const handleEdit = () => {
    setDraft(customText || defaultText);
    setEditing(true);
  };

  const handleSave = () => {
    localStorage.setItem(storageKey, draft);
    setCustomText(draft);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <div className="space-y-3">
          <textarea
            rows={4}
            className="w-full rounded-lg border-2 border-[#0F3B2E] p-3 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#C9A24A] resize-vertical"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            data-ocid="step_editor.textarea"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-1.5 rounded-lg bg-[#0F3B2E] text-white text-sm font-semibold hover:opacity-90 transition"
              data-ocid="step_editor.save_button"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-1.5 rounded-lg border border-[#0F3B2E] text-[#0F3B2E] text-sm font-semibold hover:bg-[#0F3B2E]/5 transition"
              data-ocid="step_editor.cancel_button"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-foreground leading-relaxed">{displayText}</p>
          {isAdmin && (
            <button
              type="button"
              onClick={handleEdit}
              className="inline-flex items-center gap-1.5 text-xs text-[#0F3B2E] border border-[#0F3B2E]/30 rounded-md px-3 py-1 hover:bg-[#0F3B2E]/5 transition font-medium"
              data-ocid="step_editor.edit_button"
            >
              <Pencil className="w-3 h-3" /> Edit Text
            </button>
          )}
        </div>
      )}
    </div>
  );
}
