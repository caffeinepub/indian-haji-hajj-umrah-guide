import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  ChevronRight,
  FileText,
  Headphones,
  MapPin,
  Moon,
  Star,
} from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: BookOpen,
    title: "Umrah Guide",
    description:
      "Step-by-step Umrah guide with Arabic duas, Hindi explanations, and voice playback.",
    link: "/umrah" as const,
    label: "Umrah Shuru Karo",
  },
  {
    icon: MapPin,
    title: "Hajj Guide",
    description:
      "Complete 12-step Hajj guide from Ihram to Tawaf-e-Wida with progress tracking.",
    link: "/hajj" as const,
    label: "Hajj Guide Dekhein",
  },
  {
    icon: Star,
    title: "Dua Library",
    description:
      "All major duas in Arabic + Hindi transliteration with voice playback (TTS).",
    link: "/duas" as const,
    label: "Duas Dekhein",
  },
];

const keyFeatures = [
  { icon: "🕌", title: "Interactive Steps", desc: "Har qadam par guidance" },
  { icon: "🔊", title: "Voice Playback", desc: "Arabic aur Hindi mein suno" },
  { icon: "✅", title: "Progress Track", desc: "Apni progress save karo" },
  { icon: "📖", title: "PDF Flipbook", desc: "Guide books online padho" },
  { icon: "🌙", title: "Dua Library", desc: "400+ duas ka khazana" },
  { icon: "📱", title: "Mobile Ready", desc: "Har device par use karo" },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-emerald-dark relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "url('/assets/generated/islamic-pattern-bg.dim_400x400.png')",
            backgroundSize: "300px 300px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[600px]">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center py-16 lg:py-20 pr-0 lg:pr-12"
            >
              <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 rounded-full px-4 py-1.5 mb-6 w-fit">
                <Moon className="w-4 h-4 text-gold" />
                <span className="text-gold text-sm font-medium">
                  Indian Haji — Complete Hajj & Umrah Guide
                </span>
              </div>
              <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6">
                Apka Muqaddas <span className="text-gold italic">Safar,</span>
                <br />
                Simplified.
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
                Umrah aur Hajj ke har qadam ki mukammal guide — Arabic duas,
                Hindi tarjuma, voice playback, aur interactive progress tracking
                ke saath.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  className="bg-gold text-emerald-dark font-bold text-base px-6 py-6 hover:opacity-90"
                  data-ocid="home.primary_button"
                >
                  <Link to="/umrah">
                    Umrah Guide Shuru Karo{" "}
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/30 text-white bg-transparent hover:bg-white/10 text-base px-6 py-6"
                  data-ocid="home.secondary_button"
                >
                  <Link to="/hajj">Hajj Guide</Link>
                </Button>
              </div>
            </motion.div>

            {/* Right - Kaaba Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <img
                src="/assets/generated/kaaba-hero.dim_900x700.jpg"
                alt="Kaaba Makkah"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-dark via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Mukammal Ritual Guides
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Umrah se Hajj tak — har ibaadat ke liye aapki haath thamne wali
              guide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <Card
                  className="h-full border-2 hover:border-gold transition-all duration-300 group"
                  data-ocid={`home.item.${i + 1}`}
                >
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-full bg-emerald-dark flex items-center justify-center mb-6 group-hover:bg-gold transition-colors duration-300">
                      <f.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                      {f.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {f.description}
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      className="border-emerald-dark text-emerald-dark hover:bg-emerald-dark hover:text-white"
                      data-ocid="home.link"
                    >
                      <Link to={f.link}>
                        {f.label} <ChevronRight className="ml-1 w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="bg-emerald-dark py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "url('/assets/generated/islamic-pattern-bg.dim_400x400.png')",
            backgroundSize: "250px 250px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4">
              Key Features
            </h2>
            <p className="text-white/60 text-lg">Sab kuch ek jagah</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {keyFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-gold/40 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{f.icon}</div>
                <h4 className="text-white font-semibold mb-1">{f.title}</h4>
                <p className="text-white/50 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dua Preview Strip */}
      <section className="bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Duas ka <span className="text-gold">Khazana</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Tawaf se lekar Wida tak — har mauqay ki dua Arabic mein aur
                Hindi tarjumay ke saath
              </p>
              <div className="space-y-3">
                {[
                  {
                    ar: "بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ",
                    hi: "Bismillah, Allah sabse bada hai",
                  },
                  {
                    ar: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ",
                    hi: "Hazir hoon Ae Allah, hazir hoon",
                  },
                ].map((d) => (
                  <div
                    key={d.ar}
                    className="bg-emerald-dark/5 border border-emerald-dark/20 rounded-lg p-4"
                  >
                    <p
                      className="text-emerald-dark font-bold text-xl text-right mb-1"
                      style={{ direction: "rtl", fontFamily: "serif" }}
                    >
                      {d.ar}
                    </p>
                    <p className="text-muted-foreground text-sm">{d.hi}</p>
                  </div>
                ))}
              </div>
              <Button
                asChild
                className="mt-6 bg-emerald-dark text-white hover:opacity-90"
                data-ocid="home.secondary_button"
              >
                <Link to="/duas">
                  Poori Dua Library <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden"
            >
              <img
                src="/assets/generated/kaaba-hero.dim_900x700.jpg"
                alt="Kaaba"
                className="w-full h-80 object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-dark/80 to-transparent rounded-2xl flex items-end p-6">
                <div>
                  <p
                    className="text-gold text-2xl font-bold"
                    style={{ fontFamily: "serif" }}
                  >
                    اللَّهُمَّ لَبَّيْكَ
                  </p>
                  <p className="text-white/80 text-sm mt-1">
                    Arafat ki Dua — Hajj ka sabse zyada zaroori waqt
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Promo Strip */}
      <section className="bg-gold py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-emerald-dark mb-4">
              Apna Hajj & Umrah Mukammal Karein
            </h2>
            <p className="text-emerald-dark/70 text-lg mb-8 max-w-2xl mx-auto">
              Interactive guides, duas, aur progress tracking — sab kuch free
              mein
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                asChild
                className="bg-emerald-dark text-white font-bold text-base px-8 py-6"
                data-ocid="home.primary_button"
              >
                <Link to="/umrah">Umrah Guide</Link>
              </Button>
              <Button
                asChild
                className="bg-emerald-dark text-white font-bold text-base px-8 py-6"
                data-ocid="home.secondary_button"
              >
                <Link to="/hajj">Hajj Guide</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-emerald-dark text-emerald-dark font-bold text-base px-8 py-6 bg-transparent hover:bg-emerald-dark/10"
                data-ocid="home.link"
              >
                <Link to="/flipbook">
                  <FileText className="mr-2 w-4 h-4" />
                  Flipbook
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
