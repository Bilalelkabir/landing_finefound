/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useInView } from 'motion/react';
import { Scissors, Clock, Tag, Sparkles, Plus, ShieldCheck, CreditCard, CalendarDays } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

// Animated Counter Component
function AnimatedCounter({ end, suffix = "", prefix = "" }: { end: number, suffix?: string, prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // 2 seconds
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export default function App() {
  return (
    <div 
      className="min-h-screen text-slate-900 overflow-hidden relative font-sans selection:bg-blue-200 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=2070&auto=format&fit=crop')" }}
    >
      {/* Background Nebulae (Vibrant Red and Blue overlays for the glass effect) */}
      <div className="fixed top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none mix-blend-overlay" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-red-500/20 rounded-full blur-[120px] pointer-events-none mix-blend-overlay" />
      <div className="fixed top-[30%] left-[40%] w-[50vw] h-[50vw] bg-purple-400/10 rounded-full blur-[100px] pointer-events-none mix-blend-overlay" />

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-24 flex flex-col items-center justify-center pb-48 space-y-16 md:space-y-32">
        
        {/* HERO SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-[95%] max-w-md md:max-w-5xl mx-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl md:rounded-[2.5rem] p-6 md:p-20 shadow-[0_8px_32px_rgba(0,0,0,0.04)] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />

          <div className="relative z-20 flex flex-col items-center text-center">
            <div className="space-y-8 max-w-4xl">
              <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.15] text-slate-900">
                Reserva, Gestiona y Ofrece <br className="hidden md:block" />
                Cualquier Servicio
                <br />
                <span className="relative inline-block mt-4 md:mt-6">
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 drop-shadow-sm">
                    100% GRATIS
                  </span>
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed font-medium">
                Tú pones el talento, nosotros ponemos la tecnología. Sin comisiones por reserva, tanto para clientes como para profesionales.
              </p>
            </div>

            {/* DYNAMIC STAT COUNTERS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full mt-12 md:mt-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-col items-center p-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-sm"
              >
                <span className="text-4xl font-bold text-slate-900 mb-2">
                  <AnimatedCounter prefix="+" end={500} />
                </span>
                <span className="text-sm text-slate-700 font-semibold text-center">Profesionales verificados</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col items-center p-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-sm"
              >
                <span className="text-4xl font-bold text-slate-900 mb-2">
                  <AnimatedCounter end={0} suffix="€" />
                </span>
                <span className="text-sm text-slate-700 font-semibold text-center">Comisiones de gestión</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-col items-center p-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-sm"
              >
                <span className="text-4xl font-bold text-slate-900 mb-2">24/7</span>
                <span className="text-sm text-slate-700 font-semibold text-center">Soporte inteligente</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* EL PODER DE LA COMISIÓN CERO (Comparison Widget) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-[95%] max-w-md md:max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl md:rounded-[2.5rem] p-6 md:p-16 shadow-sm"
        >
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900">El Poder de la Comisión Cero</h2>
            <p className="text-base md:text-lg text-slate-700 font-medium leading-relaxed">
              ¿Por qué pagar por trabajar? Somos la única plataforma que no toca tus ingresos. Gestión gratis, éxito real.
            </p>
          </div>
          
          {/* Desktop Graph */}
          <div className="hidden md:flex items-end justify-center gap-8 h-56 pt-8">
            <div className="flex flex-col items-center gap-4 w-1/3">
              <div className="w-full h-40 bg-red-500/20 border border-red-500/30 rounded-t-2xl relative overflow-hidden backdrop-blur-md flex items-end justify-center pb-4">
                <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-red-500/40 to-transparent" />
                <span className="relative z-10 text-2xl font-bold text-red-900">30%</span>
              </div>
              <span className="text-sm font-semibold text-slate-800 text-center leading-tight">Plataformas<br/>Tradicionales</span>
            </div>
            <div className="flex flex-col items-center gap-4 w-1/3">
              <div className="w-full h-8 bg-blue-500/20 border border-blue-500/30 rounded-t-2xl relative overflow-hidden backdrop-blur-md flex items-end justify-center pb-1">
                <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-blue-500/40 to-transparent" />
                <span className="relative z-10 text-xl font-bold text-blue-900">0%</span>
              </div>
              <span className="text-sm font-semibold text-slate-800 text-center leading-tight">Nuestra<br/>Web</span>
            </div>
          </div>

          {/* Mobile Simplified View */}
          <div className="md:hidden flex flex-col gap-3 mt-4">
            <div className="flex justify-between items-center p-4 bg-red-500/10 rounded-2xl border border-red-500/20 backdrop-blur-sm">
              <span className="font-semibold text-slate-800">Plataformas Tradicionales</span>
              <span className="text-2xl font-bold text-red-900">30%</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
              <span className="font-semibold text-slate-800">Nuestra Web</span>
              <span className="text-2xl font-bold text-blue-900">0%</span>
            </div>
          </div>
        </motion.div>

        {/* MAAT AI: LA REVOLUCIÓN DE LAS RESERVAS (Radar Widget) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-[95%] max-w-md md:max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl md:rounded-[2.5rem] p-6 md:p-16 shadow-sm"
        >
          <div className="order-2 md:order-1 flex justify-center items-center h-48 md:h-64 relative scale-75 md:scale-100">
            <div className="relative w-full flex items-center justify-center">
              {/* MAAT ai Logo Simulation */}
              <motion.div 
                animate={{ 
                  boxShadow: ["0 0 20px rgba(168,85,247,0.2)", "0 0 40px rgba(168,85,247,0.4)", "0 0 20px rgba(168,85,247,0.2)"] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="px-12 py-6 rounded-3xl bg-purple-600/20 backdrop-blur-2xl border border-purple-400/50 shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent opacity-50" />
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-50" />
                <h3 className="text-5xl font-bold text-white tracking-tight relative z-10 flex items-baseline gap-2">
                  MAAT <span className="text-3xl font-medium opacity-90">ai</span>
                </h3>
              </motion.div>

              {/* Decorative Radar Rings around the logo */}
              <div className="absolute w-64 h-64 border border-purple-500/20 rounded-full animate-[ping_4s_linear_infinite]" />
              <div className="absolute w-80 h-80 border border-purple-500/10 rounded-full animate-[ping_4s_linear_infinite_1s]" />
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-4 md:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-bold text-purple-700 uppercase tracking-wider">
              Nuevo Lanzamiento
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900">MAAT ai: Adiós a las Zonas Muertas</h2>
            <p className="text-base md:text-lg text-slate-700 font-medium leading-relaxed">
              Revolucionamos el mundo de las reservas con un algoritmo diseñado para entender tu ritmo de trabajo. MAAT ai optimiza tu rutina diaria eliminando huecos vacíos de una manera nunca vista.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 backdrop-blur-md shadow-sm text-sm text-slate-800 font-medium">
                <Sparkles className="w-4 h-4 text-purple-600" /> Rutina Optimizada
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600 text-white shadow-lg text-sm font-bold">
                ¡100% GRATIS!
              </div>
            </div>
          </div>
        </motion.div>

        {/* THE PROMISE (Features Grid) */}
        <div className="w-[95%] max-w-md md:max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-sm flex flex-col gap-4 hover:bg-white/20 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-white/30 border border-white/40 flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-6 h-6 text-slate-800" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Referencias Blindadas</h3>
            <p className="text-slate-700 font-medium">Sistema de reviews basado en transacciones reales, sin bots.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-sm flex flex-col gap-4 hover:bg-white/20 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-white/30 border border-white/40 flex items-center justify-center shadow-sm">
              <CreditCard className="w-6 h-6 text-slate-800" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Pagos Directos</h3>
            <p className="text-slate-700 font-medium">El cliente paga al profesional. Sin esperas, sin intermediarios reteniendo tu dinero.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-sm flex flex-col gap-4 hover:bg-white/20 transition-colors group"
          >
            <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shadow-sm group-hover:bg-purple-500/30 transition-colors">
              <CalendarDays className="w-6 h-6 text-purple-700" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">MAAT ai: Agenda Inteligente</h3>
            <p className="text-slate-700 font-medium">Elimina las zonas muertas de tu jornada. Optimización total de tu rutina para maximizar tus ingresos sin esfuerzo.</p>
          </motion.div>
        </div>

      </div>

      {/* Sticky Floating CTA Pill */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6, type: "spring", bounce: 0.4 }}
        className="fixed bottom-4 left-4 right-4 md:bottom-10 md:left-1/2 md:-translate-x-1/2 z-50 md:w-[95%] md:max-w-4xl"
      >
        <div className="relative rounded-2xl md:rounded-full p-[1px] overflow-hidden shadow-2xl">
          {/* AI Studio Style Animated Glow Border - Subtle Data Stream */}
          <div className="absolute top-1/2 left-1/2 w-[400%] aspect-square bg-[conic-gradient(from_0deg,transparent_0_270deg,rgba(59,130,246,0.8)_315deg,rgba(239,68,68,0.8)_360deg)] animate-border-spin opacity-100" />
          
          {/* Inner Glass Pill */}
          <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-full p-4 md:p-3 md:pl-8 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6 border border-white/20">
            <div className="text-slate-900 font-medium text-base md:text-lg text-center md:text-left whitespace-normal md:whitespace-nowrap drop-shadow-sm">
              2,157 personas en lista de espera...
            </div>
            
            <div className="flex items-center gap-2 md:gap-3 bg-white/10 border border-white/20 backdrop-blur-md rounded-full p-1.5 md:p-2 pl-4 md:pl-6 shadow-inner w-full md:w-auto md:min-w-[400px]">
              <input 
                type="email" 
                placeholder="Tu email para acceso prioritario" 
                className="bg-transparent border-none outline-none text-sm md:text-base w-full text-slate-900 placeholder:text-slate-700 font-semibold"
              />
              <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 hover:bg-slate-800 transition-colors shadow-md">
                <Plus className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
