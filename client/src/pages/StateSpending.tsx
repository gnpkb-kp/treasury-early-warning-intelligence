import { CreditCard } from 'lucide-react';
import { AnomaliBelanjaTable, TrendChart } from './Overview';

export const StateSpending = () => (
  <div className="p-4 sm:p-6 space-y-6 bg-canvas min-h-screen text-text-primary">
    <div className="flex items-center space-x-2 border-b border-border pb-4">
      <CreditCard size={24} className="text-primary" />
      <h2 className="text-xl font-bold tracking-tight">State Spending Analysis YTD</h2>
    </div>
    <div className="flex flex-col gap-6">
      <TrendChart />
      <AnomaliBelanjaTable />
    </div>
  </div>
);

export default StateSpending;
