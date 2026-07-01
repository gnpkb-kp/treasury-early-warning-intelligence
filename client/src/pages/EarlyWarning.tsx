import { AlertTriangle } from 'lucide-react';
import { AnomaliBelanjaTable, RiskDriverAnalysis, FiscalStressSection } from './Overview';

export const EarlyWarning = () => (
  <div className="p-4 sm:p-6 space-y-6 bg-canvas min-h-screen text-text-primary">
    <div className="flex items-center space-x-2 border-b border-border pb-4">
      <AlertTriangle size={24} className="text-warning" />
      <h2 className="text-xl font-bold tracking-tight">Early Warning System</h2>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <FiscalStressSection />
      <RiskDriverAnalysis />
      <div className="lg:col-span-2">
        <AnomaliBelanjaTable />
      </div>
    </div>
  </div>
);

export default EarlyWarning;
