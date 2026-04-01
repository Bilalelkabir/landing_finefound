/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useInView, AnimatePresence } from 'motion/react';
import { Scissors, Clock, Tag, Sparkles, Plus, ShieldCheck, CreditCard, CalendarDays, Check } from 'lucide-react';
import { useEffect, useState, useRef, FormEvent } from 'react';

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
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isIgniting, setIsIgniting] = useState(false);
  const [isCtaVisible, setIsCtaVisible] = useState(true);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ctaStep, setCtaStep] = useState(1); // 1: Email, 2: GDPR

  const blurClass = "backdrop-blur-xl";
  const innerBlurClass = "backdrop-blur-md";

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    
    if (ctaStep === 1) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('email introducido, no valido');
        return;
      }
      setError('');
      setCtaStep(2);
      return;
    }

    if (ctaStep === 2) {
      if (!isAccepted) return;
      
      setIsIgniting(true);
      
      // Data Capture & Local Consent Log
      const now = new Date();
      const d = now.getDate().toString().padStart(2, '0');
      const m = (now.getMonth() + 1).toString().padStart(2, '0');
      const y = now.getFullYear();
      const h = now.getHours().toString().padStart(2, '0');
      const min = now.getMinutes().toString().padStart(2, '0');
      const formattedDate = `${d}/${m}/${y} ${h}:${min}`;

      const signupData = {
        email,
        timestamp: now.toISOString(),
        consent: true
      };
      
      // Store consent locally
      const consentLog = JSON.parse(localStorage.getItem('finefound_consent_log') || '[]');
      consentLog.push({ email, timestamp: signupData.timestamp, accepted: true });
      localStorage.setItem('finefound_consent_log', JSON.stringify(consentLog));
      
      console.log('Waitlist Signup:', signupData);

      // Send to Google Sheets (Web App URL)
      fetch('https://script.google.com/macros/s/AKfycbyzodeXKPqLrqum69PqHSmJ1WVdGfNxmcpqXdXVcBCvjkXy0XcKkbIwOoWuSq50lIMn9g/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, date: formattedDate }),
      }).catch(err => console.error('Error sending to Google Sheets:', err));
      
      // Ignition sequence
      setTimeout(() => {
        setIsIgniting(false);
        setIsSuccess(true);
        
        setTimeout(() => {
          setIsSubmitted(true);
          setEmail('');
          
          // Auto-hide confirmation after 5 seconds
          setTimeout(() => {
            setIsCtaVisible(false);
          }, 5000);
        }, 800);
      }, 1000);
    }
  };

  return (
    <div 
      className="min-h-screen text-slate-900 overflow-hidden relative font-sans selection:bg-blue-200 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=2070&auto=format&fit=crop')" }}
    >
      {/* Techy Ignition Overlay */}
      {isIgniting && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 0.8, 1, 0],
            backgroundColor: ["rgba(255,255,255,0)", "rgba(59,130,246,0.4)", "rgba(255,255,255,0.8)", "rgba(59,130,246,0.4)", "rgba(255,255,255,0)"]
          }}
          transition={{ duration: 1, times: [0, 0.2, 0.5, 0.8, 1] }}
          className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />
          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1.2, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 0.5 }}
            className="w-full h-1 bg-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.8)]"
          />
        </motion.div>
      )}

      {/* Main Content Wrapper with Glitch Effect */}
      <motion.div
        animate={isIgniting ? {
          x: [0, -5, 5, -2, 2, 0],
          y: [0, 2, -2, 1, -1, 0],
          filter: ["blur(0px)", "blur(2px)", "blur(0px)"],
        } : {}}
        transition={{ duration: 0.2, repeat: 5 }}
      >
        {/* Background Nebulae (Vibrant Red and Blue overlays for the glass effect) */}
      <motion.div 
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 60, 0],
          scale: [1, 1.1, 0.9, 1],
          backgroundColor: ["rgba(59, 130, 246, 0.2)", "rgba(37, 99, 235, 0.25)", "rgba(59, 130, 246, 0.2)"]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="fixed top-[-10%] left-[-10%] w-[70vw] h-[70vw] rounded-full blur-[120px] pointer-events-none mix-blend-overlay" 
      />
      <motion.div 
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 50, -30, 0],
          scale: [1, 0.9, 1.1, 1],
          backgroundColor: ["rgba(239, 68, 68, 0.2)", "rgba(220, 38, 38, 0.25)", "rgba(239, 68, 68, 0.2)"]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="fixed bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full blur-[120px] pointer-events-none mix-blend-overlay" 
      />
      <motion.div 
        animate={{
          x: [0, 30, -50, 0],
          y: [0, 40, -60, 0],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
        className="fixed top-[30%] left-[40%] w-[50vw] h-[50vw] bg-purple-400/10 rounded-full blur-[100px] pointer-events-none mix-blend-overlay" 
      />

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-24 flex flex-col items-center justify-center pb-48 space-y-16 md:space-y-32">
        
        {/* HERO SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`w-[95%] max-w-md md:max-w-5xl mx-auto ${blurClass} bg-white/10 border border-white/20 rounded-3xl md:rounded-[2.5rem] p-6 md:p-20 shadow-[0_8px_32px_rgba(0,0,0,0.04)] relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />

          <div className="relative z-20 flex flex-col items-center text-center">
            <div className="space-y-8 max-w-4xl">
              <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.15] text-slate-900">
                Acceso Total. Conexión Real. <br className="hidden md:block" />
                <span className="text-slate-700">Gestión de Reservas</span>{' '}
                <span className="relative inline-block mt-2 md:mt-0">
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
                className={`flex flex-col items-center p-6 ${blurClass} bg-white/10 border border-white/20 rounded-3xl shadow-sm`}
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
                className={`flex flex-col items-center p-6 ${blurClass} bg-white/10 border border-white/20 rounded-3xl shadow-sm`}
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
                className={`flex flex-col items-center p-6 ${blurClass} bg-white/10 border border-white/20 rounded-3xl shadow-sm`}
              >
                <span className="text-4xl font-bold text-slate-900 mb-2">24/7</span>
                <span className="text-sm text-slate-700 font-semibold text-center">Soporte inteligente</span>
              </motion.div>
            </div>

            {/* Waitlist Text */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-[10px] md:text-xs text-slate-600 font-bold tracking-wider uppercase text-center mt-8 drop-shadow-sm"
            >
              2,157 personas en lista de espera...
            </motion.div>
          </div>
        </motion.div>

        {/* EL PODER DE LA COMISIÓN CERO (Comparison Widget) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className={`w-[95%] max-w-md md:max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center ${blurClass} bg-white/10 border border-white/20 rounded-3xl md:rounded-[2.5rem] p-6 md:p-16 shadow-sm`}
        >
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900">El Poder de la Comisión Cero</h2>
            <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">
              ¿Por qué pagar por trabajar? Somos la única plataforma que no toca tus ingresos. Gestión gratis, éxito real.
            </p>
          </div>
          
          {/* Desktop Graph */}
          <div className="hidden md:flex items-end justify-center gap-8 h-56 pt-8">
            <div className="flex flex-col items-center gap-4 w-1/3">
              <div className={`w-full h-40 bg-red-500/20 border border-red-500/30 rounded-t-2xl relative overflow-hidden ${innerBlurClass} flex items-end justify-center pb-4`}>
                <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-red-500/40 to-transparent" />
                <span className="relative z-10 text-2xl font-bold text-red-900">30%</span>
              </div>
              <span className="text-sm font-semibold text-slate-800 text-center leading-tight">Plataformas<br/>Tradicionales</span>
            </div>
            <div className="flex flex-col items-center gap-4 w-1/3">
              <div className={`w-full h-8 bg-blue-500/20 border border-blue-500/30 rounded-t-2xl relative overflow-hidden ${innerBlurClass} flex items-end justify-center pb-1`}>
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

        {/* IA ADAPTATIVA EN ACCIÓN (Radar Widget) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className={`w-[95%] max-w-md md:max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center ${blurClass} bg-white/10 border border-white/20 rounded-3xl md:rounded-[2.5rem] p-6 md:p-16 shadow-sm`}
        >
          <div className="order-2 md:order-1 flex justify-center items-center h-48 md:h-64 relative scale-75 md:scale-100">
            <div className="relative w-48 h-48 flex items-center justify-center">
              {/* Center Dot */}
              <div className="absolute w-4 h-4 bg-blue-600 rounded-full z-20 shadow-[0_0_15px_rgba(37,99,235,0.6)]" />
              {/* Radar Rings */}
              <div className="absolute w-full h-full border border-blue-500/30 rounded-full animate-[ping_3s_linear_infinite]" />
              <div className="absolute w-3/4 h-3/4 border border-blue-500/30 rounded-full animate-[ping_3s_linear_infinite_1s]" />
              <div className="absolute w-1/2 h-1/2 border border-blue-500/30 rounded-full animate-[ping_3s_linear_infinite_2s]" />
              
              {/* Floating Elements */}
              <div className={`absolute top-0 right-4 w-8 h-8 bg-white/40 ${innerBlurClass} border border-white/50 rounded-full shadow-sm flex items-center justify-center`}>
                <div className="w-2 h-2 bg-green-500 rounded-full" />
              </div>
              <div className={`absolute bottom-4 left-0 w-10 h-10 bg-white/40 ${innerBlurClass} border border-white/50 rounded-full shadow-sm flex items-center justify-center`}>
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
              </div>
              <div className={`absolute top-1/2 -left-4 w-6 h-6 bg-white/40 ${innerBlurClass} border border-white/50 rounded-full shadow-sm flex items-center justify-center`}>
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-4 md:space-y-6">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900">IA Adaptativa en Acción</h2>
            <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">
              Nuestra IA no solo busca, conecta. Encuentra al profesional perfecto según tu ubicación, presupuesto y disponibilidad en menos de 5 segundos.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-4">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 ${innerBlurClass} shadow-sm text-sm text-slate-800 font-medium`}>
                <Scissors className="w-4 h-4 text-slate-700" /> Servicio: Fisioterapia
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 ${innerBlurClass} shadow-sm text-sm text-slate-800 font-medium`}>
                <Clock className="w-4 h-4 text-slate-700" /> Reserva: <span className="text-amber-700 font-bold">GRATIS</span>
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
            className={`${blurClass} bg-white/10 border border-white/20 rounded-3xl p-8 shadow-sm flex flex-col gap-4 hover:bg-white/20 transition-colors`}
          >
            <div className="w-12 h-12 rounded-full bg-white/30 border border-white/40 flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-6 h-6 text-slate-800" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Referencias Blindadas</h3>
            <p className="text-sm text-slate-600 font-medium">Sistema de reviews basado en transacciones reales, sin bots.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`${blurClass} bg-white/10 border border-white/20 rounded-3xl p-8 shadow-sm flex flex-col gap-4 hover:bg-white/20 transition-colors`}
          >
            <div className="w-12 h-12 rounded-full bg-white/30 border border-white/40 flex items-center justify-center shadow-sm">
              <CreditCard className="w-6 h-6 text-slate-800" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Pagos Directos</h3>
            <p className="text-sm text-slate-600 font-medium">El cliente paga al profesional. Sin intermediarios reteniendo tu dinero.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className={`${blurClass} bg-white/10 border border-white/20 rounded-3xl p-8 shadow-sm flex flex-col gap-4 hover:bg-white/20 transition-colors`}
          >
            <div className="w-12 h-12 rounded-full bg-white/30 border border-white/40 flex items-center justify-center shadow-sm">
              <CalendarDays className="w-6 h-6 text-slate-800" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Agenda Inteligente</h3>
            <p className="text-sm text-slate-600 font-medium">Optimización de huecos libres para maximizar tus ingresos.</p>
          </motion.div>
        </div>

      </div>

    </motion.div>

    {/* Sticky Floating CTA Pill */}
    <AnimatePresence>
      {isCtaVisible && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="fixed bottom-4 left-4 right-4 md:bottom-10 md:left-1/2 md:-translate-x-1/2 z-50 md:w-[95%] md:max-w-4xl flex flex-col items-center gap-3"
        >
          {!isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
              className="w-full"
            >
              <div className="relative rounded-2xl md:rounded-full p-[1px] overflow-hidden shadow-2xl">
                {/* AI Studio Style Animated Glow Border - Subtle Data Stream */}
                <div className="absolute top-1/2 left-1/2 w-[400%] aspect-square bg-[conic-gradient(from_0deg,transparent_0_270deg,rgba(59,130,246,0.8)_315deg,rgba(239,68,68,0.8)_360deg)] animate-border-spin opacity-100" />
                
                {/* Inner Glass Pill */}
                <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-full p-4 md:p-3 md:pl-8 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6 border border-white/20">
                  <form 
                    onSubmit={handleSubscribe}
                    className="flex items-center gap-2 md:gap-3 bg-white/10 border border-white/20 backdrop-blur-md rounded-full p-1.5 md:p-2 pl-4 md:pl-6 shadow-inner w-full"
                  >
                    {ctaStep === 1 ? (
                      <div className="flex flex-col flex-1">
                        <input 
                          type="text" 
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (error) setError('');
                          }}
                          placeholder="Tu email para acceso prioritario" 
                          className="bg-transparent border-none outline-none text-sm md:text-base w-full text-slate-900 placeholder:text-slate-700 font-semibold"
                        />
                        {error && (
                          <span className="text-[10px] md:text-xs text-red-600 font-bold animate-pulse">
                            {error}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col flex-1 py-1">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            checked={isAccepted}
                            onChange={(e) => setIsAccepted(e.target.checked)}
                            className="w-3.5 h-3.5 rounded border-white/30 bg-white/10 checked:bg-blue-500 transition-colors cursor-pointer accent-blue-500"
                          />
                          <span className="text-[10px] md:text-xs text-slate-700 font-bold leading-tight">
                            Acepto la <a href="https://finefound.net/politica-de-privacidad/" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-900">política de privacidad</a> y recibir el aviso de lanzamiento.
                          </span>
                        </label>
                        <p className="text-[9px] md:text-[10px] text-slate-500 leading-tight mt-1 font-medium">
                          Responsable: FINEFOUND. Finalidad: Gestión de lista de espera. Legitimación: Consentimiento. No cedemos datos a terceros.
                        </p>
                      </div>
                    )}
                    <button 
                      type="submit"
                      disabled={ctaStep === 2 && !isAccepted}
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 hover:bg-slate-800 transition-colors shadow-md ${(ctaStep === 2 && !isAccepted) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isSuccess ? (
                        <Check className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
                      ) : (
                        <Plus className={`w-5 h-5 md:w-6 md:h-6 transition-transform ${ctaStep === 2 ? 'rotate-45' : ''}`} />
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-green-500/20 backdrop-blur-xl border border-green-500/30 rounded-full px-8 py-4 shadow-xl"
            >
              <p className="text-green-900 font-bold text-lg md:text-xl flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-green-600" />
                ¡Enhorabuena! Ya estás en la lista.
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>

    </div>
  );
}
