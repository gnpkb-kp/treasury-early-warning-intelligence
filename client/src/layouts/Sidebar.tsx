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
  onClose?: () => void;
}

const APBNHealthScoreWidget = () => (
  <div className="mt-auto p-4 bg-canvas rounded-xl text-center border border-border shadow-inner">
    <h3 className="text-[9px] font-bold text-text-secondary uppercase tracking-widest mb-1.5">APBN Health Score</h3>
    <div className="text-2xl font-black text-text-primary mb-0.5">72<span className="text-[10px] text-text-tertiary font-normal">/100</span></div>
    <div className="text-[10px] font-bold text-warning uppercase tracking-wider bg-warning-tint/50 py-0.5 px-2 rounded-full inline-block">Status: WASPADA</div>
    <p className="text-[8px] text-text-secondary mt-1.5 leading-normal">Skor terdepresiasi -5 poin dibanding bulan lalu</p>
  </div>
);

export const Sidebar = ({ isOpen, activeTab, onSelectTab, onClose }: SidebarProps) => {
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
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/40 z-30 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-40 w-64 lg:static lg:h-full lg:w-auto
          ${isOpen ? 'translate-x-0 lg:w-64' : '-translate-x-full lg:translate-x-0 lg:w-20'}
          bg-surface text-text-secondary transition-all duration-300 flex flex-col border-r border-border overflow-y-auto p-4
        `}
      >
        <nav className="space-y-1.5 flex-1 mt-2">
          {menuItems.map((item) => {
            const isActive = activeTab === item.name;
            return (
              <div
                key={item.name}
                onClick={() => {
                  onSelectTab(item.name);
                  if (window.innerWidth < 1024) {
                    onClose?.();
                  }
                }}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150 ${
                  isActive 
                    ? 'bg-primary-tint text-primary font-bold shadow-sm' 
                    : 'hover:bg-canvas hover:text-text-primary'
                }`}
              >
                <item.icon size={16} className={isActive ? 'text-primary' : 'text-text-secondary'} />
                {(isOpen || window.innerWidth < 1024) && (
                  <span className="text-xs font-semibold tracking-wide whitespace-nowrap lg:inline">
                    {item.name}
                  </span>
                )}
              </div>
            );
          })}
        </nav>
        {isOpen && <APBNHealthScoreWidget />}
      </aside>
    </>
  );
};

export default Sidebar;
