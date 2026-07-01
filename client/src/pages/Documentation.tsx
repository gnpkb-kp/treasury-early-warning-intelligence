import { FileText } from 'lucide-react';

const Documentation = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6 bg-canvas min-h-screen text-text-primary">
      <div className="flex items-center space-x-2 border-b border-border pb-4">
        <FileText size={24} className="text-primary" />
        <h2 className="text-xl font-bold tracking-tight">System Documentation</h2>
      </div>
      <div className="bg-surface p-6 sm:p-8 rounded-xl border border-border shadow-card max-w-3xl">
        <h3 className="text-sm font-bold text-text-primary mb-3">Panduan Penggunaan</h3>
        <p className="text-xs text-text-secondary leading-relaxed mb-4">
          Dokumentasi teknis dan panduan operasional sistem Treasury Early Warning Intelligence. Sistem ini dirancang untuk mendeteksi risiko anggaran negara secara dini menggunakan model machine learning prediktif.
        </p>
        <div className="space-y-4 border-t border-border pt-4">
          <div>
            <h4 className="text-xs font-bold text-primary">1. Sinkronisasi Data OMSPAN & SAKTI</h4>
            <p className="text-[11px] text-text-secondary leading-relaxed mt-1">
              Data realisasi pendapatan dan belanja ditarik secara berkala dari OMSPAN dan dianalisis silang dengan data komitmen kontrak satker di SAKTI.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-primary">2. Indikator Fiscal Stress</h4>
            <p className="text-[11px] text-text-secondary leading-relaxed mt-1">
              Stress index mengukur level kerentanan dari 0 (Aman) hingga 100 (Kritis) berdasarkan 5 sub-indeks utama, termasuk belanja subsidi energi dan beban utang luar negeri.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-primary">3. Mesin Deteksi Anomali AI</h4>
            <p className="text-[11px] text-text-secondary leading-relaxed mt-1">
              Menggunakan algoritma unsupervised anomaly detection untuk mengidentifikasi transaksi belanja barang/modal satker K/L yang menyimpang dari tren historis kelompok sejenisnya.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
