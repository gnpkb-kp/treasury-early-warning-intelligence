import { ShieldAlert } from 'lucide-react';
import { RiskDriverAnalysis } from './Overview';

export const RiskIntelligence = () => (
  <div className="p-6 space-y-6 bg-[#030712] min-h-screen text-slate-100">
    <div className="flex items-center space-x-2 border-b border-blue-900/40 pb-4">
      <ShieldAlert size={24} className="text-blue-400" />
      <h2 className="text-xl font-bold tracking-tight">Risk Intelligence Analysis</h2>
    </div>
    <div className="grid grid-cols-1 gap-6 max-w-4xl">
      <RiskDriverAnalysis />
    </div>
  </div>
);

export default RiskIntelligence;
