import { StepTextEditor } from "@/components/StepTextEditor";
import { StepVoiceRecorder } from "@/components/StepVoiceRecorder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  Volume2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const umrahSteps = [
  {
    step: 1,
    title: "Ihram",
    arabic: "إحرام",
    hindiTitle: "Ihram Pahno",
    description:
      "Niyyat karo aur Ihram pahno. Miqat se pehle ghusl karo, safed kapde pahno, niyyat karo. Mard do safed chaadarein pehnte hain, auraten apne kapde pehenti hain.",
    dua: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ",
    duaHindi:
      "Hazir hoon Ae Allah, hazir hoon. Hazir hoon, tera koi shareek nahi, hazir hoon.",
    icon: "🤍",
    tips: [
      "Miqat se pehle ghusl karo",
      "Niyyat dil se karo",
      "Talbiyah zor se parhein",
    ],
  },
  {
    step: 2,
    title: "Tawaf",
    arabic: "طواف",
    hindiTitle: "Kaaba ka Tawaf",
    description:
      "Kaaba ka saat baar tawaf karo. Hajar-e-Aswad ke paas se shuru karo, anti-clockwise chalte jao. Har chakkar mein dua parhte jao.",
    dua: "بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ",
    duaHindi: "Allah ke naam se shuru, woh sabse bada hai",
    icon: "🕌",
    tips: [
      "Hajar-e-Aswad ko bosa dein ya haath se ishara karein",
      "7 chakkar poore karein",
      "Makam Ibrahim ke paas 2 rakaat parhein",
    ],
  },
  {
    step: 3,
    title: "Sa'i",
    arabic: "سعي",
    hindiTitle: "Safa-Marwa ka Sa'i",
    description:
      "Safa aur Marwa ke darmiyan saat chakkar lagao. Hazrat Hajra ki yaad mein. Safa se shuru karo, Marwa par khatam karo.",
    dua: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ",
    duaHindi: "Beshak Safa aur Marwa Allah ki nishaniyaan hain",
    icon: "🏃",
    tips: [
      "Safa se shuru karo",
      "Marwa par khatam hoga 7th chakkar",
      "Green light ke darmiyan mard daud sakta hai",
    ],
  },
  {
    step: 4,
    title: "Halq/Taqsir",
    arabic: "حلق/تقصير",
    hindiTitle: "Baal Katao",
    description:
      "Baal katao ya mundao. Mard mundwa sakte hain ya kata sakte hain, auraten sirf thoda kata sakti hain (ek angul ke barabar).",
    dua: "اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي",
    duaHindi: "Ae Allah, mujhe maaf kar aur mujh par reham kar",
    icon: "✂️",
    tips: [
      "Mard: poora sar mundana behtar hai",
      "Auraten: sirf kuch baal katein",
      "Baal katne ke baad ihram kholein",
    ],
  },
  {
    step: 5,
    title: "Ihram Kholna",
    arabic: "تحلل",
    hindiTitle: "Umrah Mukammal",
    description:
      "Ihram kholkar normal kapde pahno. Umrah mukammal ho gaya. Ab woh cheezein halal ho gayi jo ihram ki wajah se mana thi.",
    dua: "اللَّهُمَّ إِنَّكَ قُلْتَ وَقَوْلُكَ الْحَقُّ",
    duaHindi: "Ae Allah, tune kaha aur teri baat sach hai",
    icon: "🎉",
    tips: [
      "Ghusl karo",
      "Atar laga sakte hain ab",
      "Agar Hajj bhi karna hai toh ihram bandhe rahein",
    ],
  },
];

function speakText(text: string, lang: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.8;

  const speak = () => {
    const voices = window.speechSynthesis.getVoices();
    if (lang === "ar" || lang === "ar-SA") {
      const arVoice =
        voices.find((v) => v.lang === "ar-SA") ||
        voices.find((v) => v.lang === "ar-EG") ||
        voices.find((v) => v.lang.startsWith("ar")) ||
        null;
      utterance.lang = arVoice ? arVoice.lang : "ar-SA";
      if (arVoice) utterance.voice = arVoice;
      utterance.rate = 0.7;
    } else {
      utterance.lang = lang;
    }
    window.speechSynthesis.speak(utterance);
  };

  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    speak();
  } else {
    window.speechSynthesis.onvoiceschanged = () => {
      speak();
      window.speechSynthesis.onvoiceschanged = null;
    };
  }
}

export default function UmrahGuide() {
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState<number | null>(1);
  const { isAdmin } = useAdminAuth();

  const toggleComplete = (step: number) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(step)) next.delete(step);
      else next.add(step);
      return next;
    });
  };

  const progress = Math.round((completed.size / umrahSteps.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-emerald-dark relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url('/assets/generated/islamic-pattern-bg.dim_400x400.png')",
            backgroundSize: "200px",
          }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="bg-gold/20 text-gold border-gold/30 mb-4">
              مکمل رہنما
            </Badge>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
              Umrah Guide
            </h1>
            <p className="text-white/70 text-lg">
              Step-by-step Umrah ka tariqa — Arabic, Hindi aur voice ke saath
            </p>
          </motion.div>
        </div>
      </div>

      {/* Progress */}
      <div
        className="max-w-4xl mx-auto px-4 sm:px-6 py-6"
        data-ocid="umrah.section"
      >
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-foreground">
              Aapki Progress
            </span>
            <span className="text-gold font-bold text-lg">
              {completed.size}/{umrahSteps.length} Steps
            </span>
          </div>
          <Progress
            value={progress}
            className="h-3"
            data-ocid="umrah.loading_state"
          />
          <p className="text-muted-foreground text-sm mt-2">
            {progress}% Umrah mukammal
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 space-y-4">
        {umrahSteps.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            data-ocid={`umrah.item.${i + 1}`}
          >
            <Card
              className={`border-2 transition-all duration-300 ${
                completed.has(s.step)
                  ? "border-green-500 bg-green-50"
                  : "border-border hover:border-gold/50"
              }`}
            >
              <CardContent className="p-0">
                {/* Step Header */}
                <button
                  type="button"
                  className="flex items-center gap-4 p-5 cursor-pointer w-full text-left"
                  onClick={() =>
                    setExpanded(expanded === s.step ? null : s.step)
                  }
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0 ${
                      completed.has(s.step)
                        ? "bg-green-500 text-white"
                        : "bg-emerald-dark text-white"
                    }`}
                  >
                    {completed.has(s.step) ? "✓" : s.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xl">{s.icon}</span>
                      <h3 className="font-serif text-xl font-bold text-foreground">
                        {s.title}
                      </h3>
                      <span
                        className="text-muted-foreground text-lg"
                        style={{ fontFamily: "serif" }}
                      >
                        {s.arabic}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {s.hindiTitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {expanded === s.step ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                {expanded === s.step && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="border-t border-border"
                  >
                    <div className="p-5 space-y-5">
                      <StepTextEditor
                        stepId={`umrah_step_${s.step}`}
                        defaultText={s.description}
                      />

                      {/* Dua */}
                      <div className="bg-emerald-dark/5 border border-emerald-dark/20 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-emerald-dark font-semibold text-sm uppercase tracking-wider">
                            Dua
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => speakText(s.dua, "ar-SA")}
                            className="border-emerald-dark text-emerald-dark hover:bg-emerald-dark hover:text-white"
                            data-ocid="umrah.button"
                          >
                            <Volume2 className="w-4 h-4 mr-1" /> Arabic
                          </Button>
                        </div>
                        <p
                          className="text-emerald-dark text-2xl font-bold text-right mb-3 leading-relaxed"
                          style={{
                            direction: "rtl",
                            fontFamily: "'Noto Naskh Arabic', serif",
                          }}
                        >
                          {s.dua}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-muted-foreground text-sm italic">
                            {s.duaHindi}
                          </p>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => speakText(s.duaHindi, "hi")}
                            className="border-muted-foreground text-muted-foreground hover:bg-muted"
                            data-ocid="umrah.button"
                          >
                            <Volume2 className="w-4 h-4 mr-1" /> Hindi
                          </Button>
                        </div>
                      </div>

                      {/* Tips */}
                      <div>
                        <h5 className="font-semibold text-foreground mb-2">
                          Zaroori Baatein:
                        </h5>
                        <ul className="space-y-1">
                          {s.tips.map((tip) => (
                            <li
                              key={tip}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <span className="text-gold mt-0.5">◆</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Voice Recorder — admin only */}
                      {isAdmin && (
                        <StepVoiceRecorder stepId={`umrah_step_${s.step}`} />
                      )}

                      {/* Complete Button */}
                      <Button
                        onClick={() => toggleComplete(s.step)}
                        className={
                          completed.has(s.step)
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "bg-emerald-dark text-white hover:opacity-90"
                        }
                        data-ocid={`umrah.checkbox.${i + 1}`}
                      >
                        {completed.has(s.step) ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 mr-2" /> Mukammal
                            Ho Gaya
                          </>
                        ) : (
                          <>
                            <Circle className="w-4 h-4 mr-2" /> Mukammal Mark
                            Karo
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {completed.size === umrahSteps.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-dark text-white rounded-2xl p-8 text-center"
            data-ocid="umrah.success_state"
          >
            <div className="text-5xl mb-4">🕌</div>
            <h3 className="font-serif text-2xl font-bold mb-2">
              Mubarak Ho! Umrah Mukammal!
            </h3>
            <p className="text-white/70">
              Allah aapki Umrah qabool farmaye. Aameen.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
