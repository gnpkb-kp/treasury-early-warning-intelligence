import { ShieldAlert } from 'lucide-react';
import { RiskDriverAnalysis } from './Overview';

export const RiskIntelligence = () => (
  <div className="p-4 sm:p-6 space-y-6 bg-canvas min-h-screen text-text-primary">
    <div className="flex items-center space-x-2 border-b border-border pb-4">
      <ShieldAlert size={24} className="text-primary" />
      <h2 className="text-xl font-bold tracking-tight">Risk Intelligence Analysis</h2>
    </div>
    <div className="flex flex-col gap-6 max-w-4xl">
      <RiskDriverAnalysis />
    </div>
  </div>
);

export default RiskIntelligence;
