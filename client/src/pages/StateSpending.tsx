import { CreditCard } from 'lucide-react';
import { AnomaliBelanjaTable, TrendChart } from './Overview';

export const StateSpending = () => (
  <div className="p-6 space-y-6 bg-[#030712] min-h-screen text-slate-100">
    <div className="flex items-center space-x-2 border-b border-blue-900/40 pb-4">
      <CreditCard size={24} className="text-blue-400" />
      <h2 className="text-xl font-bold tracking-tight">State Spending Analysis YTD</h2>
    </div>
    <div className="grid grid-cols-1 gap-6">
      <TrendChart />
      <AnomaliBelanjaTable />
    </div>
  </div>
);

export default StateSpending;
