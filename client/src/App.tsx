import { useState, useEffect } from 'react';
import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';
import Footer from './layouts/Footer';
import Overview from './pages/Overview';
import FiscalDashboard from './pages/FiscalDashboard';
import StateRevenue from './pages/StateRevenue';
import StateSpending from './pages/StateSpending';
import APBNHealthScore from './pages/APBNHealthScore';
import RiskIntelligence from './pages/RiskIntelligence';
import EarlyWarning from './pages/EarlyWarning';
import SimulationScenario from './pages/SimulationScenario';
import DataStory from './pages/DataStory';
import Documentation from './pages/Documentation';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderActivePage = () => {
    switch (activeTab) {
      case 'Overview':
        return <Overview />;
      case 'Fiskal Dashboard':
        return <FiscalDashboard />;
      case 'Penerimaan Negara':
        return <StateRevenue />;
      case 'Belanja Negara':
        return <StateSpending />;
      case 'APBN Health Score':
        return <APBNHealthScore />;
      case 'Risk Intelligence':
        return <RiskIntelligence />;
      case 'Early Warning':
        return <EarlyWarning />;
      case 'Scenario Simulation':
        return <SimulationScenario />;
      case 'Data Stories':
        return <DataStory />;
      case 'Dokumentasi':
        return <Documentation />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-canvas overflow-hidden text-text-primary font-sans antialiased">
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isOpen={isSidebarOpen} 
          activeTab={activeTab} 
          onSelectTab={setActiveTab} 
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="flex-1 overflow-y-auto bg-canvas">
          {renderActivePage()}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
