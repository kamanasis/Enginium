import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

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
    <div className="w-full min-h-0 flex-1 bg-[#07100e] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/20 via-[#0d0e14] to-[#050507] flex items-center justify-center p-2 sm:p-4 font-sans">
      {/* Premium Bezel / Mobile casing for Desktop rendering */}
      <div className="relative w-full max-w-[430px] h-[82vh] max-h-[880px] bg-[#0e0f14] rounded-[46px] shadow-[0_0_0_8px_#1f212c,_0_25px_70px_-15px_rgba(0,0,0,0.8)] border-4 border-[#2c2f3a] flex flex-col overflow-hidden transition-all duration-300">
        
        {/* Dynamic Notch / Dynamic Island */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50 flex items-center justify-center border border-zinc-800">
          <div className="w-3 h-3 bg-zinc-900 rounded-full mr-2 flex items-center justify-center">
            <div className="w-1 h-1 bg-[#2c2f3a] rounded-full"></div>
          </div>
          <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full"></div>
        </div>

        {/* Custom Premium Status Bar */}
        <div className="h-11 shrink-0 pt-3 px-8 flex justify-between items-center text-xs font-semibold select-none text-[#a5b6aa] z-40 bg-[#0b2118] border-b border-white/[0.06]">
          <span>{time}</span>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <div className="flex items-center gap-0.5">
              <span className="text-[10px]">98%</span>
              <Battery className="w-4 h-4 text-red-400" />
            </div>
          </div>
        </div>

        {/* Screen Content Wrapper */}
        <div className="min-h-0 flex-1 flex flex-col overflow-y-auto bg-[#07100e] relative scrollbar-none">
          {children}
        </div>
        
        {/* Home Indicator bar */}
        <div className="h-6 shrink-0 bg-[#07100e] flex items-center justify-center pb-2 z-40">
          <div className="w-32 h-1.5 bg-[#557262] rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
