import { BookOpen } from 'lucide-react';
import { TreasuryNarrative } from './Overview';

const DataStory = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6 bg-canvas min-h-screen text-text-primary">
      <div className="flex items-center space-x-2 border-b border-border pb-4">
        <BookOpen size={24} className="text-primary" />
        <h2 className="text-xl font-bold tracking-tight">AI-Powered Data Stories</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface p-6 rounded-xl border border-border shadow-card">
          <h3 className="text-sm font-bold text-text-primary mb-3">Insight Narratives</h3>
          <p className="text-xs text-text-secondary leading-relaxed mb-4">
            Fitur Data Stories menerjemahkan agregat angka-angka APBN yang kompleks menjadi cerita deskriptif-naratif yang mudah dipahami menggunakan pemrosesan bahasa alami (NLP).
          </p>
          <div className="border-t border-border pt-4">
            <h4 className="text-xs font-semibold text-primary mb-2">Poin Penting Kinerja:</h4>
            <ul className="list-disc list-inside text-xs text-text-secondary space-y-2">
              <li>Kontraksi penerimaan komoditas ekspor (CPO & Batubara).</li>
              <li>Akumulasi sisa kas di rekening K/L meningkat menjelang akhir kuartal.</li>
              <li>Deviasi kontrak belanja modal satker di luar koridor baseline.</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col">
          <TreasuryNarrative />
        </div>
      </div>
    </div>
  );
};

export default DataStory;
