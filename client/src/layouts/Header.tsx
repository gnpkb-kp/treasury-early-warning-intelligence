import { Calendar, ChevronDown, Menu, MessageSquare } from 'lucide-react';
import logo from '../assets/logo_kemenkeu.svg';

export const AICopilot = () => (
  <div className="flex items-center border border-border rounded-full px-3 py-1 bg-canvas w-32 min-[380px]:w-44 sm:w-64 sm:px-4 sm:py-1.5 shadow-inner transition-colors duration-150 focus-within:border-primary/50">
    <MessageSquare size={13} className="text-primary mr-1.5 sm:mr-2.5 flex-shrink-0" />
    <input 
      type="text" 
      placeholder="Tanya APBN..." 
      className="bg-transparent border-none outline-none text-[9px] sm:text-[10px] w-full text-text-primary placeholder-text-tertiary" 
    />
  </div>
);

export const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => (
  <header className="bg-surface w-full h-20 px-4 sm:px-6 border-b border-border flex items-center justify-between shadow-card flex-shrink-0 z-30">
    <div className="flex items-center space-x-2.5 sm:space-x-4">
      <button 
        onClick={toggleSidebar} 
        className="text-text-secondary hover:text-text-primary transition-colors p-1.5 rounded-lg hover:bg-canvas"
      >
        <Menu size={20} />
      </button>
      <img src={logo} alt="Logo Kemenkeu" className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
      <div className="flex flex-col border-l border-border pl-3 sm:pl-4">
        <span className="text-text-secondary font-bold text-[8px] sm:text-[9px] uppercase tracking-wider leading-tight">DJPb Kemenkeu</span>
        <h1 className="text-text-primary font-bold text-[10px] sm:text-xs tracking-tight leading-tight">
          <span className="hidden sm:inline">TREASURY EARLY WARNING INTELLIGENCE</span>
          <span className="sm:hidden">TEWI</span>
        </h1>
        <p className="text-primary text-[8px] uppercase tracking-widest mt-0.5 font-bold hidden md:block">AI-POWERED FISCAL RISK MONITOR</p>
      </div>
    </div>
    <div className="flex items-center space-x-3 sm:space-x-6">
      <div className="hidden lg:flex flex-col">
        <label className="text-[8px] font-bold text-text-tertiary uppercase mb-1 tracking-widest">PERIODE DATA</label>
        <div className="relative flex items-center border border-border rounded bg-canvas px-2.5 py-1 text-text-primary transition-colors duration-150 focus-within:border-primary/50">
          <Calendar size={11} className="text-primary mr-2" />
          <input type="date" defaultValue="2026-05-21" className="bg-transparent border-none outline-none text-[10px] w-24 cursor-pointer text-text-primary" />
        </div>
      </div>
      <div className="hidden sm:flex flex-col">
        <label className="text-[8px] font-bold text-text-tertiary uppercase mb-1 tracking-widest">SKENARIO</label>
        <div className="relative">
          <select className="border border-border rounded px-3 py-1 bg-canvas text-text-primary text-[10px] w-28 outline-none appearance-none cursor-pointer focus:border-primary/50 font-semibold transition-colors duration-150">
            <option>Baseline</option>
            <option>Optimis</option>
            <option>Pesimis</option>
          </select>
          <ChevronDown size={10} className="absolute right-2 top-2.5 text-text-secondary pointer-events-none" />
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-[8px] font-bold text-text-tertiary uppercase mb-1 tracking-widest hidden md:inline">AI COPILOT</span>
        <AICopilot />
      </div>
    </div>
  </header>
);

export default Header;
