import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  Volume2,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const hajjSteps = [
  {
    step: 1,
    title: "Ihram",
    arabic: "إحرام",
    day: "8 Zilhijja",
    description:
      "8 Zilhijja ko ihram bandho Miqat par. Ghusl karo, safed kapde pahno, niyyat karo. Talbiyah parhna shuru karo.",
    dua: "لَبَّيْكَ اللَّهُمَّ حَجًّا",
    duaHindi: "Hazir hoon Ae Allah, Hajj ke liye hazir hoon",
    icon: "🤍",
  },
  {
    step: 2,
    title: "Mina",
    arabic: "منى",
    day: "8 Zilhijja",
    description:
      "8 Zilhijja: Mina mein ek raat guzaro, paanch namazein parhon. Mina Makkah se 5km door hai.",
    dua: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً",
    duaHindi: "Ae hamare Rabb, hamen duniya mein nek de aur aakhirat mein bhi",
    icon: "⛺",
  },
  {
    step: 3,
    title: "Arafat",
    arabic: "عرفات",
    day: "9 Zilhijja",
    description:
      "9 Zilhijja: Waqoof-e-Arafat — sabse zaroori rukn hai. Zuhr se Maghrib tak Arafat mein khade raho, dua karo, istaghfar karo.",
    dua: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
    duaHindi:
      "Allah ke siwa koi ibadat ke laiq nahi, woh akela hai, uska koi shareek nahi",
    icon: "🌄",
  },
  {
    step: 4,
    title: "Muzdalifah",
    arabic: "مزدلفہ",
    day: "9-10 Zilhijja ki raat",
    description:
      "Muzdalifah mein raat guzaro, kankarian chuno (49 ya 70). Maghrib aur Isha milkar parhein.",
    dua: "اللَّهُمَّ بِارِكْ لِي فِيهَا",
    duaHindi: "Ae Allah, mujhe is mein barkat de",
    icon: "🌙",
  },
  {
    step: 5,
    title: "Rami",
    arabic: "رمی",
    day: "10 Zilhijja",
    description:
      "10 Zilhijja: Jamarat-ul-Aqaba par 7 kankarian maro aur har kankari ke saath 'Allahu Akbar' kaho.",
    dua: "بِسْمِ اللَّهِ اللَّهُ أَكْبَرُ رَغْمًا لِلشَّيْطَانِ",
    duaHindi: "Allah ke naam se, Allah akbar, Shaytan ki radd mein",
    icon: "🪨",
  },
  {
    step: 6,
    title: "Qurbani",
    arabic: "قربانی",
    day: "10 Zilhijja",
    description:
      "Janwar ki qurbani do ya coupon kharido. Eid ul Adha ka din hai. Qurbani ke baad halq/taqsir karo.",
    dua: "اللَّهُمَّ تَقَبَّلْ مِنِّي",
    duaHindi: "Ae Allah, meri taraf se qabool farma",
    icon: "🐑",
  },
  {
    step: 7,
    title: "Halq/Taqsir",
    arabic: "حلق",
    day: "10 Zilhijja",
    description:
      "Baal katao ya mundao. Mard mundwa sakte hain, auraten thoda katein.",
    dua: "اللَّهُمَّ اغْفِرْ لِلْمُحَلِّقِينَ",
    duaHindi: "Ae Allah, sar mundane walon ko maaf kar",
    icon: "✂️",
  },
  {
    step: 8,
    title: "Tawaf-e-Ziyarat",
    arabic: "طواف الإفاضة",
    day: "10-12 Zilhijja",
    description:
      "Kaaba ka farz tawaf karo — yeh Hajj ka rukn-e-azam hai. Saat chakkar lagao.",
    dua: "بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ",
    duaHindi: "Allah ke naam se shuru, Allah sabse bada hai",
    icon: "🕌",
  },
  {
    step: 9,
    title: "Sa'i",
    arabic: "سعي",
    day: "10-12 Zilhijja",
    description:
      "Safa Marwa ke darmiyan sa'i karo (agar pehle nahi ki). Safa se shuru, Marwa par khatam — 7 chakkar.",
    dua: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ",
    duaHindi: "Beshak Safa aur Marwa Allah ki nishaniyaan hain",
    icon: "🏃",
  },
  {
    step: 10,
    title: "Mina Wapsi",
    arabic: "منى",
    day: "11-13 Zilhijja",
    description:
      "11-13 Zilhijja: Mina mein Ayyam-e-Tashreeq guzaro. Raat Mina mein guzarna wajib hai.",
    dua: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً",
    duaHindi: "Ae Rabb, duniya aur aakhirat dono mein nek de",
    icon: "⛺",
  },
  {
    step: 11,
    title: "Rami (Baqi Din)",
    arabic: "رمی",
    day: "11, 12, 13 Zilhijja",
    description:
      "11, 12, 13 ko teen Jamarat par kankarian maro — har ek par 7 kankarian. Tartib se: Ula, Wusta, Aqaba.",
    dua: "بِسْمِ اللَّهِ اللَّهُ أَكْبَرُ",
    duaHindi: "Allah ke naam se, Allah sabse bada hai",
    icon: "🪨",
  },
  {
    step: 12,
    title: "Tawaf-e-Wida",
    arabic: "طواف الوداع",
    day: "Makkah chorne se pehle",
    description:
      "Makkah se jane se pehle alvida tawaf karo. Yeh aakhri ibadat hai. Saat chakkar Kaaba ke.",
    dua: "اللَّهُمَّ هَذَا الْبَيْتُ بَيْتُكَ",
    duaHindi: "Ae Allah, yeh tera ghar hai",
    icon: "👋",
  },
];

function speakText(text: string, lang: string) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.8;
  window.speechSynthesis.speak(utterance);
}

export default function HajjGuide() {
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState<number | null>(1);

  const toggleComplete = (step: number) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(step)) next.delete(step);
      else next.add(step);
      return next;
    });
  };

  const progress = Math.round((completed.size / hajjSteps.length) * 100);

  return (
    <div className="min-h-screen bg-background">
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
              12 مراحل
            </Badge>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
              Hajj Guide
            </h1>
            <p className="text-white/70 text-lg">
              Mukammal Hajj ka tariqa — Ihram se Tawaf-e-Wida tak
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold">Hajj Progress</span>
            <span className="text-gold font-bold text-lg">
              {completed.size}/{hajjSteps.length} Steps
            </span>
          </div>
          <Progress
            value={progress}
            className="h-3"
            data-ocid="hajj.loading_state"
          />
          <p className="text-muted-foreground text-sm mt-2">
            {progress}% Hajj mukammal
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 space-y-4">
        {hajjSteps.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            data-ocid={`hajj.item.${i + 1}`}
          >
            <Card
              className={`border-2 transition-all duration-300 ${completed.has(s.step) ? "border-green-500 bg-green-50" : "border-border hover:border-gold/50"}`}
            >
              <CardContent className="p-0">
                <button
                  type="button"
                  className="flex items-center gap-4 p-5 cursor-pointer w-full text-left"
                  onClick={() =>
                    setExpanded(expanded === s.step ? null : s.step)
                  }
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0 ${completed.has(s.step) ? "bg-green-500 text-white" : "bg-emerald-dark text-white"}`}
                  >
                    {completed.has(s.step) ? "✓" : s.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xl">{s.icon}</span>
                      <h3 className="font-serif text-xl font-bold">
                        {s.title}
                      </h3>
                      <span
                        className="text-muted-foreground text-lg"
                        style={{ fontFamily: "serif" }}
                      >
                        {s.arabic}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs mt-1 border-gold/40 text-gold"
                    >
                      {s.day}
                    </Badge>
                  </div>
                  {expanded === s.step ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>

                {expanded === s.step && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-t border-border"
                  >
                    <div className="p-5 space-y-4">
                      <p className="text-foreground leading-relaxed">
                        {s.description}
                      </p>
                      <div className="bg-emerald-dark/5 border border-emerald-dark/20 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-emerald-dark font-semibold text-sm">
                            Dua
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => speakText(s.dua, "ar")}
                            className="border-emerald-dark text-emerald-dark hover:bg-emerald-dark hover:text-white"
                            data-ocid="hajj.button"
                          >
                            <Volume2 className="w-4 h-4 mr-1" /> Suno
                          </Button>
                        </div>
                        <p
                          className="text-emerald-dark text-2xl font-bold text-right mb-3"
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
                            className="border-muted text-muted-foreground"
                            data-ocid="hajj.button"
                          >
                            <Volume2 className="w-4 h-4 mr-1" /> Hindi
                          </Button>
                        </div>
                      </div>
                      <Button
                        onClick={() => toggleComplete(s.step)}
                        className={
                          completed.has(s.step)
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "bg-emerald-dark text-white hover:opacity-90"
                        }
                        data-ocid={`hajj.checkbox.${i + 1}`}
                      >
                        {completed.has(s.step) ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 mr-2" /> Mukammal
                          </>
                        ) : (
                          <>
                            <Circle className="w-4 h-4 mr-2" /> Mark Complete
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

        {completed.size === hajjSteps.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-dark text-white rounded-2xl p-8 text-center"
            data-ocid="hajj.success_state"
          >
            <div className="text-5xl mb-4">🕋</div>
            <h3 className="font-serif text-2xl font-bold mb-2">
              Hajj Mubarak! Mabroor Hajj!
            </h3>
            <p className="text-white/70">
              Allah aapka Hajj qabool farmaye. Aameen ya Rabbal Aalameen.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
