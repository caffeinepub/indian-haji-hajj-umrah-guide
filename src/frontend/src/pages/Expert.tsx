import { Award, BookOpen, Users } from "lucide-react";
import { motion } from "motion/react";

export default function Expert() {
  return (
    <div className="min-h-screen bg-emerald-deeper">
      {/* Hero Banner */}
      <div
        className="relative py-16 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.06 155) 0%, oklch(0.18 0.05 155) 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-sm font-semibold uppercase tracking-widest mb-3"
          >
            Aurangabad Khidmat Haj Committee
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Saleemuddin Siddiqui
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg"
          >
            Hajj & Umrah Training Expert — 20+ Years of Service
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col items-center"
          >
            <div className="rounded-2xl overflow-hidden border-4 border-gold shadow-2xl w-full max-w-sm">
              <img
                src="/assets/uploads/WhatsApp-Image-2026-03-20-at-02.00.46-1.jpeg"
                alt="Saleemuddin Siddiqui delivering a lecture"
                className="w-full object-cover"
              />
            </div>
            <p className="text-white/50 text-sm mt-3 text-center italic">
              Delivering a lecture at Supreme Global School, Aurangabad
            </p>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <h2 className="text-gold font-serif text-xl font-bold">About</h2>
              <p className="text-white/80 leading-relaxed">
                Saleemuddin Siddiqui is a renowned Hajj and Umrah training
                expert based in Aurangabad, Maharashtra. For over{" "}
                <strong className="text-white">20 years</strong>, he has been
                associated with the{" "}
                <strong className="text-white">
                  Aurangabad Khidmat Haj Committee
                </strong>
                , dedicating his life to preparing pilgrims spiritually and
                practically for the sacred journey of Hajj and Umrah.
              </p>
              <p className="text-white/80 leading-relaxed">
                Through his engaging lectures, workshops, and training sessions,
                he has guided and trained{" "}
                <strong className="text-white">thousands of pilgrims</strong>{" "}
                from Aurangabad and surrounding regions, helping them understand
                the rituals, duas, and etiquettes of Hajj and Umrah with clarity
                and confidence.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Users, value: "1000s", label: "Pilgrims Trained" },
                { icon: BookOpen, value: "20+", label: "Years of Service" },
                {
                  icon: Award,
                  value: "Aurangabad",
                  label: "Khidmat Haj Committee",
                },
              ].map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center text-center gap-2"
                >
                  <Icon className="w-5 h-5 text-gold" />
                  <div className="text-white font-bold text-sm leading-tight">
                    {value}
                  </div>
                  <div className="text-white/50 text-xs leading-tight">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Services */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
              <h2 className="text-gold font-serif text-xl font-bold">
                Key Contributions
              </h2>
              <ul className="space-y-2 text-white/80 text-sm">
                {[
                  "Pre-Hajj orientation and training camps",
                  "Step-by-step Hajj ritual guidance in Urdu and Hindi",
                  "Dua and dhikr instruction for every stage of pilgrimage",
                  "Practical Umrah training sessions for first-time pilgrims",
                  "Public lectures on the spirituality and significance of Hajj",
                  "Coordination with Aurangabad Khidmat Haj Committee for pilgrim welfare",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-gold mt-0.5">&#10003;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
