import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Lock, KeyRound, Eye, EyeOff, ShieldCheck, ArrowLeft, AlertCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/useStore';

export function AdminLockScreen() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(0);

  const authenticateAdmin = useStore((s) => s.authenticateAdmin);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError(true);
      setShake((s) => s + 1);
      return;
    }

    const success = authenticateAdmin(password.trim(), rememberMe);
    if (!success) {
      setError(true);
      setShake((s) => s + 1);
    } else {
      setError(false);
    }
  };

  const fillDemoPassword = () => {
    setPassword('quickcrave2024');
    setError(false);
  };

  return (
    <div className="min-h-screen bg-[#0C1427] text-white flex flex-col justify-between selection:bg-[#F9D36A] selection:text-[#0C1427] relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#1E3A8A]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#C2410C]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar Navigation */}
      <header className="relative z-10 p-6 flex items-center justify-between max-w-6xl mx-auto w-full">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-wider group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Storefront</span>
        </Link>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">
          <ShieldCheck size={14} className="text-[#F9D36A]" />
          <span>256-bit Encrypted Session</span>
        </div>
      </header>

      {/* Center Lock Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <motion.div
          key={shake}
          animate={shake > 0 ? { x: [-12, 12, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl relative"
        >
          {/* Badge Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1E2B58] to-[#2563EB] border border-white/20 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-900/40">
            <Lock size={28} className="text-[#F9D36A]" />
          </div>

          <div className="text-center mb-6">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#F9D36A] px-3 py-1 rounded-full bg-[#F9D36A]/10 border border-[#F9D36A]/20 inline-block mb-2">
              Kitchen Operating System
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Admin Portal
            </h1>
            <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
              Enter authorized kitchen administrator passcode to manage live orders, menu pricing, and discount coupons.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                Passcode
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <KeyRound size={17} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder="Enter admin passcode"
                  autoFocus
                  className={`w-full pl-10 pr-11 py-3 rounded-xl bg-black/40 border text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                    error
                      ? 'border-red-500 focus:ring-red-500/50 bg-red-950/20'
                      : 'border-white/15 focus:border-[#F9D36A] focus:ring-[#F9D36A]/30'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {error && (
                <div className="flex items-center gap-1.5 text-xs text-red-400 mt-2 font-medium">
                  <AlertCircle size={14} />
                  <span>Invalid passcode. Please try again.</span>
                </div>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs text-gray-300">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-600 bg-black/40 text-[#F9D36A] focus:ring-[#F9D36A]/40"
                />
                <span>Remember this session</span>
              </label>

              <button
                type="button"
                onClick={fillDemoPassword}
                className="text-[#F9D36A] hover:underline font-bold flex items-center gap-1"
              >
                <Sparkles size={12} />
                <span>Quick demo fill</span>
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#F9D36A] hover:bg-[#F8CA4D] text-[#0C1427] font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#F9D36A]/20 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Unlock Kitchen Portal</span>
            </button>
          </form>

          {/* Quick Credential Hint Box */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center text-xs text-gray-400">
            <span>Default demo passcode: </span>
            <button
              type="button"
              onClick={fillDemoPassword}
              className="font-mono font-bold text-[#F9D36A] bg-white/5 px-2 py-0.5 rounded border border-white/10 hover:bg-white/10 transition-colors"
            >
              quickcrave2024
            </button>
          </div>
        </motion.div>
      </main>

      {/* Footer Info */}
      <footer className="relative z-10 p-6 text-center text-xs text-gray-500">
        QUICK CRAVE Coastal Kitchen · Restricted Admin Access
      </footer>
    </div>
  );
}
