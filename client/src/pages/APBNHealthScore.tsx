import { Activity } from 'lucide-react';
import { FiscalStressSection } from './Overview';

const APBNHealthScore = () => {
  return (
    <div className="p-6 space-y-6 bg-[#030712] min-h-screen text-slate-100">
      <div className="flex items-center space-x-2 border-b border-blue-900/40 pb-4">
        <Activity size={24} className="text-blue-400" />
        <h2 className="text-xl font-bold tracking-tight">APBN Health Score Analysis</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0b1329] p-6 rounded-xl border border-blue-900/40 shadow-lg">
          <h3 className="font-bold text-white mb-3 text-sm">Health Index Detailed View</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Indeks kesehatan APBN dihitung menggunakan formula penimbangan rasio realisasi pendapatan terhadap target, realisasi belanja terhadap pagu, serta kecukupan kas negara di K/L. Nilai saat ini (72) berada pada ambang batas atas status <span className="text-yellow-400 font-bold">WASPADA</span>.
          </p>
        </div>
        <FiscalStressSection />
      </div>
    </div>
  );
};

export default APBNHealthScore;
