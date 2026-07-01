import { 
  LayoutDashboard, 
  LineChart, 
  Wallet, 
  CreditCard, 
  Activity, 
  ShieldAlert, 
  AlertTriangle, 
  GitBranch, 
  BookOpen, 
  FileText 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

const APBNHealthScoreWidget = () => (
  <div className="mt-auto p-4 bg-slate-950 rounded-xl text-center border border-slate-800/80">
    <h3 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">APBN Health Score</h3>
    <div className="text-2xl font-black text-white mb-0.5">72<span className="text-[10px] text-slate-400 font-normal">/100</span></div>
    <div className="text-[10px] font-bold text-yellow-400 uppercase tracking-wider">Status: WASPADA</div>
    <p className="text-[8px] text-slate-500 mt-1.5 leading-normal">Skor terdepresiasi -5 poin dibanding bulan lalu</p>
  </div>
);

export const Sidebar = ({ isOpen, activeTab, onSelectTab }: SidebarProps) => {
  const menuItems = [
    { name: 'Overview', icon: LayoutDashboard },
    { name: 'Fiskal Dashboard', icon: LineChart },
    { name: 'Penerimaan Negara', icon: Wallet },
    { name: 'Belanja Negara', icon: CreditCard },
    { name: 'APBN Health Score', icon: Activity },
    { name: 'Risk Intelligence', icon: ShieldAlert },
    { name: 'Early Warning', icon: AlertTriangle },
    { name: 'Scenario Simulation', icon: GitBranch },
    { name: 'Data Stories', icon: BookOpen },
    { name: 'Dokumentasi', icon: FileText },
  ];

  return (
    <aside 
      className={`${isOpen ? 'w-64' : 'w-20'} bg-[#0f172a] text-slate-300 transition-all duration-300 flex flex-col h-full border-r border-slate-800 overflow-y-auto p-4 z-10`}
    >
      <nav className="space-y-1.5 flex-1 mt-2">
        {menuItems.map((item) => {
          const isActive = activeTab === item.name;
          return (
            <div
              key={item.name}
              onClick={() => onSelectTab(item.name)}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150 ${
                isActive 
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-900/30' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={16} className={isActive ? 'text-white' : 'text-slate-400'} />
              {isOpen && <span className="text-xs font-semibold tracking-wide whitespace-nowrap">{item.name}</span>}
            </div>
          );
        })}
      </nav>
      {isOpen && <APBNHealthScoreWidget />}
    </aside>
  );
};

export default Sidebar;
