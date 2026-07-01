import { Activity } from 'lucide-react';
import { FiscalStressSection } from './Overview';

const APBNHealthScore = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6 bg-canvas min-h-screen text-text-primary">
      <div className="flex items-center space-x-2 border-b border-border pb-4">
        <Activity size={24} className="text-primary" />
        <h2 className="text-xl font-bold tracking-tight">APBN Health Score Analysis</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface p-6 rounded-xl border border-border shadow-card">
          <h3 className="font-bold text-text-primary mb-3 text-sm">Health Index Detailed View</h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            Indeks kesehatan APBN dihitung menggunakan formula penimbangan rasio realisasi pendapatan terhadap target, realisasi belanja terhadap pagu, serta kecukupan kas negara di K/L. Nilai saat ini (72) berada pada ambang batas atas status <span className="text-warning font-bold">WASPADA</span>.
          </p>
        </div>
        <FiscalStressSection />
      </div>
    </div>
  );
};

export default APBNHealthScore;
