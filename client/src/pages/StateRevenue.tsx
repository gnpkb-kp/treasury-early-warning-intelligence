import { Wallet } from 'lucide-react';
import { RevenueContributionChart, TrendChart } from './Overview';

export const StateRevenue = () => (
  <div className="p-6 space-y-6 bg-[#030712] min-h-screen text-slate-100">
    <div className="flex items-center space-x-2 border-b border-blue-900/40 pb-4">
      <Wallet size={24} className="text-blue-400" />
      <h2 className="text-xl font-bold tracking-tight">State Revenue Analysis YTD</h2>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <TrendChart />
      <RevenueContributionChart />
    </div>
  </div>
);

export default StateRevenue;
