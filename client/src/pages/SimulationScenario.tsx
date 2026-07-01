import { GitBranch } from 'lucide-react';
import { SimulationSection } from './Overview';

export const SimulationScenario = () => (
  <div className="p-4 sm:p-6 space-y-6 bg-canvas min-h-screen text-text-primary">
    <div className="flex items-center space-x-2 border-b border-border pb-4">
      <GitBranch size={24} className="text-primary" />
      <h2 className="text-xl font-bold tracking-tight">Simulation Scenario (What-If)</h2>
    </div>
    <div className="flex flex-col gap-6 max-w-2xl">
      <SimulationSection />
    </div>
  </div>
);

export default SimulationScenario;
