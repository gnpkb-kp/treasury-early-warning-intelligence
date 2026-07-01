import { GitBranch } from 'lucide-react';
import { SimulationSection } from './Overview';

export const SimulationScenario = () => (
  <div className="p-6 space-y-6 bg-[#030712] min-h-screen text-slate-100">
    <div className="flex items-center space-x-2 border-b border-blue-900/40 pb-4">
      <GitBranch size={24} className="text-blue-400" />
      <h2 className="text-xl font-bold tracking-tight">Simulation Scenario (What-If)</h2>
    </div>
    <div className="grid grid-cols-1 gap-6 max-w-2xl">
      <SimulationSection />
    </div>
  </div>
);

export default SimulationScenario;
