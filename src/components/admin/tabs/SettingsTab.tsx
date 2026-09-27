import { useState, type FormEvent } from 'react';
import { KeyRound, Shield, Phone, MapPin, Clock, RotateCcw, Check, AlertCircle, Save } from 'lucide-react';
import { useStore } from '../../../store/useStore';
import { PHONE_1, PHONE_2 } from '../../../data/menu';

export function SettingsTab() {
  const adminPasscode = useStore((s) => s.adminPasscode);
  const updatePasscode = useStore((s) => s.updatePasscode);
  const resetAllDemoData = useStore((s) => s.resetAllDemoData);

  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');

  const handlePasswordChange = (e: FormEvent) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');

    if (currentPass !== adminPasscode) {
      setPassError('Current passcode is incorrect.');
      return;
    }

    if (newPass.length < 6) {
      setPassError('New passcode must be at least 6 characters.');
      return;
    }

    if (newPass !== confirmPass) {
      setPassError('New passcodes do not match.');
      return;
    }

    updatePasscode(newPass);
    setPassSuccess('Passcode successfully updated! Remember this for your next login.');
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  const handleResetData = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all data (menu items, coupons, and orders) to fresh demo defaults?'
      )
    ) {
      resetAllDemoData();
      alert('All kitchen demo data has been restored.');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="bg-[#121E36] border border-white/15 p-5 rounded-3xl shadow-xl">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#F9D36A]">
          Kitchen Configuration
        </span>
        <h2 className="text-xl font-black text-white">
          Admin Security & Kitchen Settings
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Update your administrative passcode, kitchen contact hotlines, and manage demo session data.
        </p>
      </div>

      {/* Security & Password Card */}
      <div className="bg-[#121E36] border border-white/15 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-xl bg-[#F9D36A]/20 flex items-center justify-center text-[#F9D36A]">
            <KeyRound size={16} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Change Admin Passcode
            </h3>
            <p className="text-xs text-gray-400">
              Used to unlock the `/admin` screen on this device.
            </p>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Current Passcode
            </label>
            <input
              type="password"
              required
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              placeholder="Enter current passcode"
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white focus:outline-none focus:border-[#F9D36A]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                New Passcode
              </label>
              <input
                type="password"
                required
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Min 6 characters"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white focus:outline-none focus:border-[#F9D36A]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Confirm Passcode
              </label>
              <input
                type="password"
                required
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Repeat new passcode"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-sm text-white focus:outline-none focus:border-[#F9D36A]"
              />
            </div>
          </div>

          {passError && (
            <div className="flex items-center gap-1.5 text-xs text-red-400 font-medium">
              <AlertCircle size={14} />
              <span>{passError}</span>
            </div>
          )}

          {passSuccess && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <Check size={14} />
              <span>{passSuccess}</span>
            </div>
          )}

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#F9D36A] hover:bg-[#F8CA4D] text-[#0C1427] font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-md active:scale-95 flex items-center gap-2"
          >
            <Save size={14} />
            <span>Update Passcode</span>
          </button>
        </form>
      </div>

      {/* Kitchen Details & Hotlines */}
      <div className="bg-[#121E36] border border-white/15 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white mb-2">
          Kitchen Hotlines & Operating Hours
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-300">
          <div className="p-4 rounded-2xl bg-black/30 border border-white/10 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
              Contact Numbers
            </span>
            <p className="flex items-center gap-2">
              <Phone size={14} className="text-[#F9D36A]" />
              <span className="font-mono font-bold text-white">+91 {PHONE_1} (Primary Kitchen Line)</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone size={14} className="text-[#F9D36A]" />
              <span className="font-mono font-bold text-white">022 {PHONE_2} (Landline Hotline)</span>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/30 border border-white/10 space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
              Kitchen Operating Shifts
            </span>
            <p className="flex items-center gap-2">
              <Clock size={14} className="text-[#F9D36A]" />
              <span>Lunch Service: <strong>11:30 AM – 4:00 PM</strong></span>
            </p>
            <p className="flex items-center gap-2">
              <Clock size={14} className="text-[#F9D36A]" />
              <span>Dinner Service: <strong>6:30 PM – 11:30 PM</strong></span>
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-black/30 border border-white/10 flex items-start gap-2.5 text-xs text-gray-300">
          <MapPin size={16} className="text-[#F9D36A] shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block">Main Cloud Kitchen Facility:</strong>
            Plot 44, Gokhale Road (North), Near Portuguese Church, Dadar West, Mumbai, Maharashtra 400028.
          </div>
        </div>
      </div>

      {/* Danger Zone: Demo Reset */}
      <div className="bg-red-950/20 border border-red-500/30 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center gap-2.5 mb-2">
          <RotateCcw size={18} className="text-red-400" />
          <h3 className="text-base font-bold text-white">
            Reset Kitchen Demo State
          </h3>
        </div>
        <p className="text-xs text-gray-400 mb-4 max-w-lg leading-relaxed">
          Restore original sample Konkan dishes, promotional coupons (`MALVANI20`, `COASTAL100`), and simulated live orders. Useful for demonstrating the portal from a clean state.
        </p>

        <button
          onClick={handleResetData}
          className="px-4 py-2 rounded-xl bg-red-600/30 hover:bg-red-600/50 border border-red-500/50 text-red-200 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
        >
          <RotateCcw size={14} />
          <span>Reset All Demo Data</span>
        </button>
      </div>
    </div>
  );
}
