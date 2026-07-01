import { Calendar, ChevronDown, Menu, MessageSquare } from 'lucide-react';
import logo from '../assets/logo_kemenkeu.svg';

export const AICopilot = () => (
  <div className="flex items-center border border-slate-800 rounded-full px-4 py-1.5 bg-slate-950 w-64 shadow-inner">
    <MessageSquare size={13} className="text-blue-400 mr-2.5" />
    <input 
      type="text" 
      placeholder="Tanya sesuatu tentang APBN..." 
      className="bg-transparent border-none outline-none text-[10px] w-full text-slate-100 placeholder-slate-500" 
    />
  </div>
);

export const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => (
  <header className="bg-[#0f172a] w-full h-20 px-6 border-b border-slate-800 flex items-center justify-between shadow-lg flex-shrink-0 z-30">
    <div className="flex items-center space-x-4">
      <button 
        onClick={toggleSidebar} 
        className="text-slate-200 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-slate-800"
      >
        <Menu size={20} />
      </button>
      <img src={logo} alt="Logo Kemenkeu" className="w-9 h-9 object-contain" />
      <div className="flex flex-col border-l border-slate-800 pl-4">
        <span className="text-white font-bold text-[9px] uppercase tracking-wider leading-tight">DJPb Kemenkeu</span>
        <h1 className="text-white font-bold text-xs tracking-tight leading-tight">TREASURY EARLY WARNING INTELLIGENCE</h1>
        <p className="text-blue-400 text-[8px] uppercase tracking-widest mt-0.5 font-bold">AI-POWERED FISCAL RISK MONITOR</p>
      </div>
    </div>
    <div className="flex items-center space-x-6">
      <div className="hidden lg:flex flex-col">
        <label className="text-[8px] font-bold text-slate-500 uppercase mb-1 tracking-widest">PERIODE DATA</label>
        <div className="relative flex items-center border border-slate-800 rounded bg-slate-950 px-2.5 py-1 text-white">
          <Calendar size={11} className="text-blue-400 mr-2" />
          <input type="date" defaultValue="2026-05-21" className="bg-transparent border-none outline-none text-[10px] w-24 cursor-pointer text-slate-200" />
        </div>
      </div>
      <div className="hidden sm:flex flex-col">
        <label className="text-[8px] font-bold text-slate-500 uppercase mb-1 tracking-widest">SKENARIO</label>
        <div className="relative">
          <select className="border border-slate-800 rounded px-3 py-1 bg-slate-950 text-white text-[10px] w-28 outline-none appearance-none cursor-pointer focus:border-blue-500 font-semibold">
            <option>Baseline</option>
            <option>Optimis</option>
            <option>Pesimis</option>
          </select>
          <ChevronDown size={10} className="absolute right-2 top-2 text-slate-400 pointer-events-none" />
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-[8px] font-bold text-slate-500 uppercase mb-1 tracking-widest hidden md:inline">AI COPILOT</span>
        <AICopilot />
      </div>
    </div>
  </header>
);

export default Header;
