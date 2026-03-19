import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Search, Volume2 } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

const duas = [
  {
    id: 1,
    name: "Tawaf Shuru ki Dua",
    arabic: "بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ",
    hindi: "Bismillah, Allah sabse bada hai",
    meaning: "Allah ke naam se shuru, woh sabse bada hai",
    category: "umrah",
  },
  {
    id: 2,
    name: "Hajar-e-Aswad ki Dua",
    arabic: "اللَّهُمَّ إِيمَانًا بِكَ وَتَصْدِيقًا بِكِتَابِكَ",
    hindi: "Ae Allah, tujh par imaan ke saath",
    meaning: "Ae Allah, tujh par yakeen aur teri kitab ki tasdeeq ke saath",
    category: "umrah",
  },
  {
    id: 3,
    name: "Safa par Dua",
    arabic: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ",
    hindi: "Beshak Safa aur Marwa Allah ki nishaniyaan hain",
    meaning: "Safa aur Marwa Allah ki ibaadat ki jagahein hain",
    category: "umrah",
  },
  {
    id: 4,
    name: "Waqoof-e-Arafat",
    arabic: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ",
    hindi: "Hazir hoon Ae Allah, hazir hoon",
    meaning: "Main hazir hoon, Ae Allah main hazir hoon",
    category: "hajj",
  },
  {
    id: 5,
    name: "Rami ki Dua",
    arabic: "بِسْمِ اللَّهِ اللَّهُ أَكْبَرُ رَغْمًا لِلشَّيْطَانِ",
    hindi: "Allah ke naam se, Allah akbar, Shaytan ko dust mein",
    meaning: "Allah ke naam se, woh sabse bada hai, shaitan ki radd mein",
    category: "hajj",
  },
  {
    id: 6,
    name: "Tawaf-e-Wida",
    arabic: "اللَّهُمَّ هَذَا الْبَيْتُ بَيْتُكَ",
    hindi: "Ae Allah, yeh tera ghar hai",
    meaning: "Ae Allah, yeh tera ghar hai, main tera banda hoon",
    category: "hajj",
  },
  {
    id: 7,
    name: "Talbiyah",
    arabic: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ",
    hindi: "Hazir hoon Ae Allah, hazir hoon. Tera koi shareek nahi.",
    meaning: "Hazrat Ibrahim ki sunnat — Hajj aur Umrah mein parhna",
    category: "umrah",
  },
  {
    id: 8,
    name: "Muzdalifah ki Dua",
    arabic: "اللَّهُمَّ بِارِكْ لِي فِيهَا",
    hindi: "Ae Allah, mujhe is mein barkat de",
    meaning: "Muzdalifah mein kankarian chuntay waqt parhein",
    category: "hajj",
  },
  {
    id: 9,
    name: "Qurbani ki Dua",
    arabic: "اللَّهُمَّ تَقَبَّلْ مِنِّي",
    hindi: "Ae Allah, meri taraf se qabool farma",
    meaning: "Qurbani karte waqt dil se yeh dua mango",
    category: "hajj",
  },
  {
    id: 10,
    name: "Ihram ki Niyyat",
    arabic: "اللَّهُمَّ إِنِّي أُرِيدُ الْعُمْرَةَ",
    hindi: "Ae Allah, main Umrah karna chahta/chahti hoon",
    meaning: "Ihram baandhte waqt dil se niyyat karo",
    category: "umrah",
  },
  {
    id: 11,
    name: "Hajj ki Niyyat",
    arabic: "اللَّهُمَّ إِنِّي أُرِيدُ الْحَجَّ",
    hindi: "Ae Allah, main Hajj karna chahta/chahti hoon",
    meaning: "Hajj ki niyyat — ihram bandhtay waqt",
    category: "hajj",
  },
  {
    id: 12,
    name: "Makam Ibrahim par Dua",
    arabic: "وَاتَّخِذُوا مِنْ مَقَامِ إِبْرَاهِيمَ مُصَلًّى",
    hindi: "Ibrahim ke muqam ko namaz ki jagah banao",
    meaning: "Tawaf ke baad Makam Ibrahim ke paas 2 rakaat namaz parhein",
    category: "umrah",
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

export default function DuaLibrary() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "umrah" | "hajj">("all");

  const filtered = useMemo(() => {
    return duas.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.hindi.toLowerCase().includes(search.toLowerCase()) ||
        d.meaning.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "all" || d.category === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="bg-gold/20 text-gold border-gold/30 mb-4">
              دعاؤں کا خزانہ
            </Badge>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
              Dua Library
            </h1>
            <p className="text-white/70 text-lg">
              Hajj aur Umrah ki tamam important duas — Arabic, Hindi tarjuma,
              aur voice ke saath
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Dua search karein..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
              data-ocid="duas.search_input"
            />
          </div>
          <Tabs
            value={filter}
            onValueChange={(v) => setFilter(v as "all" | "umrah" | "hajj")}
          >
            <TabsList>
              <TabsTrigger value="all" data-ocid="duas.tab">
                Sab
              </TabsTrigger>
              <TabsTrigger value="umrah" data-ocid="duas.tab">
                Umrah
              </TabsTrigger>
              <TabsTrigger value="hajj" data-ocid="duas.tab">
                Hajj
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <p className="text-muted-foreground text-sm mt-3">
          {filtered.length} duas mile
        </p>
      </div>

      {/* Dua Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        {filtered.length === 0 ? (
          <div
            className="text-center py-20 text-muted-foreground"
            data-ocid="duas.empty_state"
          >
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>Koi dua nahi mili</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((dua, i) => (
              <motion.div
                key={dua.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                data-ocid={`duas.item.${i + 1}`}
                className="bg-white border-2 border-border hover:border-gold/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Arabic Text */}
                <div className="mb-4">
                  <p
                    className="text-emerald-dark text-2xl lg:text-3xl font-bold leading-relaxed text-right"
                    style={{
                      direction: "rtl",
                      fontFamily:
                        "'Noto Naskh Arabic', 'Traditional Arabic', serif",
                    }}
                  >
                    {dua.arabic}
                  </p>
                </div>

                {/* Name + Category */}
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-serif font-bold text-foreground">
                    {dua.name}
                  </h4>
                  <Badge
                    className={
                      dua.category === "hajj"
                        ? "bg-gold/20 text-gold border-gold/30"
                        : "bg-emerald-dark/10 text-emerald-dark border-emerald-dark/20"
                    }
                  >
                    {dua.category === "hajj" ? "Hajj" : "Umrah"}
                  </Badge>
                </div>

                {/* Hindi */}
                <p className="text-muted-foreground text-sm mb-1 italic">
                  {dua.hindi}
                </p>
                <p className="text-foreground/70 text-sm mb-5">{dua.meaning}</p>

                {/* Buttons */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => speakText(dua.arabic, "ar")}
                    className="bg-emerald-dark text-white hover:opacity-90 flex-1"
                    data-ocid="duas.button"
                  >
                    <Volume2 className="w-4 h-4 mr-1" /> Arabic Suno
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => speakText(dua.hindi, "hi")}
                    className="border-gold/40 text-gold hover:bg-gold/10 flex-1"
                    data-ocid="duas.button"
                  >
                    <Volume2 className="w-4 h-4 mr-1" /> Hindi Suno
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
