import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal, Zap } from 'lucide-react';

export default function MobileFrame({ children }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#070709] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-steel-light/10 via-[#0C0C0F] to-[#050507] flex items-center justify-center p-2 sm:p-6 font-sans">
      {/* Premium Bezel / Mobile casing for Desktop rendering */}
      <div className="relative w-full max-w-[430px] h-[92vh] max-h-[880px] bg-[#141416] rounded-[50px] shadow-[0_0_0_10px_#27272A,_0_25px_60px_-15px_rgba(0,0,0,0.9),_0_0_80px_rgba(249,115,22,0.15)] border-4 border-zinc-700/50 flex flex-col overflow-hidden transition-all duration-300">
        
        {/* Dynamic Notch / Dynamic Island */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50 flex items-center justify-center border border-zinc-800">
          <div className="w-3 h-3 bg-zinc-900 rounded-full mr-2 flex items-center justify-center">
            <div className="w-1 h-1 bg-[#1E3A8A] rounded-full"></div>
          </div>
          <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full"></div>
        </div>

        {/* Custom Premium Status Bar */}
        <div className="h-11 pt-3 px-8 flex justify-between items-center text-xs font-semibold select-none text-zinc-400 z-40 bg-[#0F0F12] border-b border-zinc-800/20">
          <span>{time}</span>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <div className="flex items-center gap-0.5">
              <span className="text-[10px]">98%</span>
              <Battery className="w-4 h-4 text-accent" />
            </div>
          </div>
        </div>

        {/* Screen Content Wrapper */}
        <div className="flex-1 flex flex-col overflow-y-auto bg-[#0F0F12] relative scrollbar-none">
          {children}
        </div>
        
        {/* Home Indicator bar */}
        <div className="h-6 bg-[#0F0F12] flex items-center justify-center pb-2 z-40">
          <div className="w-32 h-1.5 bg-zinc-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
