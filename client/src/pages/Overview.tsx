import React from 'react';
import { 
  ArrowUp, 
  ArrowDown, 
  Info, 
  Sparkles, 
  ArrowRight, 
  AlertTriangle,
  Flame,
  Globe,
  Coins
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

// ==========================================
// 1. KPI CARD COMPONENT
// ==========================================
interface KPICardProps {
  title: string;
  value: string;
  change: string | number;
  isPositive?: boolean;
  status?: 'up' | 'down';
  vsText?: string;
}

export const KPICard = ({ title, value, change, isPositive, status, vsText }: KPICardProps) => {
  const isUp = status !== undefined ? status === 'up' : (typeof change === 'number' ? change > 0 : change.startsWith('+') || isPositive);
  const displayChange = typeof change === 'number' ? `${change > 0 ? '+' : ''}${change.toFixed(2)}%` : change;
  const sparklineData = React.useMemo(() => {
    const seed = title.length + (typeof change === 'number' ? Math.abs(change) : change.length);
    return Array.from({ length: 8 }).map((_, i) => ({
      val: 50 + ((seed * (i + 1)) % 25)
    }));
  }, [title, change]);

  return (
    <div className="bg-[#0b1329] border border-blue-900/40 p-4 rounded-xl shadow-lg flex flex-col justify-between group transition-all duration-300 hover:border-blue-500/50">
      <div>
        <h3 className="text-[10px] font-bold text-blue-300/70 uppercase mb-2 tracking-widest">{title}</h3>
        <p className="text-lg font-black text-white tracking-tight group-hover:text-amber-400 transition-colors duration-200">{value}</p>
      </div>
      <div className="flex items-end justify-between mt-3">
        <div>
          <div className={`flex items-center text-xs font-black ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
            {isUp ? <ArrowUp size={12} className="mr-0.5" /> : <ArrowDown size={12} className="mr-0.5" />}
            {displayChange}
          </div>
          <p className="text-[9px] text-blue-300/40 mt-0.5 font-semibold">{vsText || 'vs bulan lalu'}</p>
        </div>
        <div className="w-14 h-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparklineData}>
              <Line type="monotone" dataKey="val" stroke={isUp ? '#34d399' : '#f87171'} strokeWidth={1.5} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. AI INSIGHT CARD COMPONENT
// ==========================================
export const AIInsightCard = () => (
  <div className="bg-gradient-to-br from-blue-950/80 to-[#0b1329] border border-blue-800/40 p-4 rounded-xl shadow-lg flex flex-col justify-between">
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-[10px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
        <Sparkles size={11} /> AI INSIGHT SUMMARY
      </h3>
    </div>
    <p className="text-[10.5px] text-blue-100 leading-relaxed flex-1 mt-1 font-medium">
      Tekanan fiskal meningkat terutama disebabkan oleh lonjakan subsidi energi (belanja wajib) dan perlambatan penerimaan sektor komoditas ekspor. Defisit terkoreksi melebar.
    </p>
    <button className="text-[10px] text-amber-400 font-bold flex items-center justify-end mt-2 hover:text-amber-300 transition-colors">
      Detail Analisis <ArrowRight size={10} className="ml-1" />
    </button>
  </div>
);

// ==========================================
// 3. FISCAL STRESS SECTION
// ==========================================
export const FiscalStressSection = () => {
  const gaugeData = [
    { name: 'Score', value: 62, color: '#eab308' }, // Yellow for WASPADA
    { name: 'Remaining', value: 38, color: '#1e293b' }
  ];
  const barData = [
    { name: 'Risiko Penerimaan', value: 58, fill: '#84cc16' },
    { name: 'Risiko Belanja', value: 72, fill: '#eab308' },
    { name: 'Risiko Subsidi', value: 81, fill: '#f43f5e' },
    { name: 'Risiko Utang', value: 45, fill: '#84cc16' },
    { name: 'Risiko Eksternal', value: 67, fill: '#eab308' },
  ];

  return (
    <div className="bg-[#0b1329] border border-blue-900/40 p-5 rounded-xl shadow-xl flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <AlertTriangle size={13} className="text-amber-400" />
          FISCAL STRESS INDEX <span className="text-blue-400/60 font-normal capitalize">(Early Warning)</span>
        </h2>
        <Info size={13} className="text-blue-300/40" />
      </div>
      <div className="flex flex-1 flex-col sm:flex-row items-center gap-6">
        <div className="w-full sm:w-1/2 relative flex items-center justify-center">
          <PieChart width={150} height={150}>
            <Pie data={gaugeData} cx={75} cy={75} innerRadius={48} outerRadius={62} startAngle={180} endAngle={0} dataKey="value" stroke="none">
              {gaugeData.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie>
          </PieChart>
          <div className="absolute flex flex-col items-center top-[50px]">
            <span className="text-[7.5px] font-bold text-blue-300/40 mb-0.5">WASPADA (40 - 69)</span>
            <span className="text-2xl font-black text-white">62.0</span>
            <span className="text-[9px] text-yellow-400 font-bold mt-0.5 uppercase tracking-wider">STATUS: WASPADA</span>
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <h3 className="text-[9px] font-bold text-blue-300/60 mb-2 uppercase tracking-wider">Komponen Penyusun</h3>
          <div className="space-y-2">
            {barData.map(item => (
              <div key={item.name} className="flex items-center text-[10px]">
                <span className="w-24 text-blue-200">{item.name}</span>
                <div className="flex-1 bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700/30 flex">
                  <div 
                    className="h-full flex items-center justify-end pr-1 text-white text-[7.5px] font-black" 
                    style={{ width: `${item.value}%`, backgroundColor: item.fill }}
                  >
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Aliases for compatibility
export const FiscalStressIndex = FiscalStressSection;

// ==========================================
// 4. REGIONAL VULNERABILITY MAP
// ==========================================
export const RegionalVulnerabilityMap = () => {
  return (
    <div className="bg-[#0b1329] border border-blue-900/40 p-5 rounded-xl shadow-xl flex flex-col relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <Globe size={13} className="text-blue-400" />
          PETA KERENTANAN FISKAL DAERAH
        </h2>
        <Info size={13} className="text-blue-300/40" />
      </div>
      <div className="flex-1 bg-[#050a18] rounded-lg border border-blue-950 flex items-center justify-center relative overflow-hidden min-h-[160px]">
        <div className="w-full h-full flex flex-col items-center justify-center opacity-70 p-2">
          <svg viewBox="0 0 800 350" className="w-full h-full text-blue-900/40" fill="currentColor">
            {/* Map representation */}
            <path d="M100,100 Q150,80 200,110 T300,130 T400,150 T450,200 Q400,230 350,210 T250,170 T150,150 Z" fill="#10b981" opacity="0.6" />
            <path d="M480,170 Q520,150 550,180 T600,230 Q560,250 520,220 Z" fill="#eab308" opacity="0.6" />
            <path d="M620,130 Q660,100 700,140 T750,180 Q720,210 680,170 Z" fill="#ef4444" opacity="0.6" />
            <path d="M200,230 Q250,220 300,250 T350,280 Q300,300 250,270 Z" fill="#ef4444" opacity="0.6" />
            <path d="M350,100 Q400,80 450,120 T500,150 Q450,180 400,150 Z" fill="#10b981" opacity="0.6" />
          </svg>
          <span className="absolute text-blue-300/40 text-[10px] font-black tracking-widest uppercase">SPASIAL REALISASI APBN / TKD</span>
        </div>

        <div className="absolute right-3 top-3 bg-[#0c1630] border border-blue-900/50 p-2 rounded text-[8px] shadow-lg">
          <p className="font-bold text-blue-200 mb-1">Tingkat Kerentanan</p>
          <div className="flex items-center mb-1"><div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"></div>Tinggi</div>
          <div className="flex items-center mb-1"><div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mr-1.5"></div>Sedang</div>
          <div className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></div>Rendah</div>
        </div>
      </div>
      <p className="text-[8px] text-blue-300/30 mt-2">*Kombinasi ketergantungan dana transfer TKD & rasio belanja wajib mandatori</p>
    </div>
  );
};

export const VulnerabilityMap = RegionalVulnerabilityMap;

// ==========================================
// 5. TREND CHART COMPONENT
// ==========================================
export const TrendChart = () => {
  const data = [
    { name: 'Jan', penerimaan: 400, belanja: 450 },
    { name: 'Feb', penerimaan: 500, belanja: 520 },
    { name: 'Mar', penerimaan: 650, belanja: 700 },
    { name: 'Apr', penerimaan: 850, belanja: 950 },
    { name: 'Mei', penerimaan: 1158.7, belanja: 1348.9 },
  ];
  return (
    <div className="bg-[#0b1329] border border-blue-900/40 p-5 rounded-xl shadow-xl col-span-2 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold text-white uppercase tracking-wider">TREND PENERIMAAN & BELANJA (YTD)</h2>
      </div>
      <div className="flex-1 min-h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" opacity="0.3" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} tickFormatter={(val) => `${val} T`} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff', fontSize: '10px' }} />
            <Legend wrapperStyle={{ fontSize: '9px', paddingTop: '10px' }} iconType="circle" />
            <Line type="monotone" dataKey="penerimaan" name="Penerimaan Negara" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 2 }} activeDot={{ r: 4 }} />
            <Line type="monotone" dataKey="belanja" name="Belanja Negara" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 2 }} activeDot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// ==========================================
// 6. REVENUE CONTRIBUTION CHART
// ==========================================
export const RevenueContributionChart = () => {
  const data = [
    { name: 'PPh', value: 21.7, color: '#3b82f6' },
    { name: 'PPh Badan', value: 18.3, color: '#0ea5e9' },
    { name: 'PPN & PPnBM', value: 16.8, color: '#10b981' },
    { name: 'Bea Masuk', value: 7.6, color: '#84cc16' },
    { name: 'Cukai', value: 6.3, color: '#eab308' },
    { name: 'PNBP', value: 15.4, color: '#f97316' },
    { name: 'Lainnya', value: 13.9, color: '#64748b' },
  ];
  return (
    <div className="bg-[#0b1329] border border-blue-900/40 p-5 rounded-xl shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold text-white uppercase tracking-wider">KONTRIBUSI PENERIMAAN NEGARA</h2>
        <Info size={13} className="text-blue-300/40" />
      </div>
      <div className="flex items-center min-h-[160px]">
        <div className="w-1/2 h-full relative flex items-center justify-center">
          <div className="w-28 h-28">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} cx="50%" cy="50%" innerRadius={32} outerRadius={52} dataKey="value" stroke="#0b1329" strokeWidth={1.5}>
                  {data.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
            <span className="text-[8px] text-slate-400">Total</span>
            <span className="text-[9px] font-bold text-white">Rp1.158,7 T</span>
          </div>
        </div>
        <div className="w-1/2 pl-2">
          <ul className="space-y-1">
            {data.map(item => (
              <li key={item.name} className="flex items-center justify-between text-[9px]">
                <div className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full mr-1.5" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-300 truncate w-[64px]" title={item.name}>{item.name}</span>
                </div>
                <span className="font-bold text-white">{item.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const ContributionChart = RevenueContributionChart;

// ==========================================
// 7. RISK DRIVER ANALYSIS COMPONENT
// ==========================================
export const RiskDriverAnalysis = () => {
  const data = [
    { factor: 'Harga Minyak Dunia', impact: 'Tinggi', impactDir: 'up', trend: 'down', level: 'Tinggi', levelColor: 'bg-red-500/20 text-red-400 border border-red-500/30' },
    { factor: 'Harga Batu Bara', impact: 'Sedang', impactDir: 'down', trend: 'flat', level: 'Sedang', levelColor: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' },
    { factor: 'Nilai Tukar (USD/IDR)', impact: 'Sedang', impactDir: 'up', trend: 'up', level: 'Sedang', levelColor: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' },
    { factor: 'Suku Bunga Global', impact: 'Rendah', impactDir: 'up', trend: 'down', level: 'Rendah', levelColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' },
    { factor: 'Pertumbuhan Ekonomi Global', impact: 'Rendah', impactDir: 'down', trend: 'up', level: 'Rendah', levelColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' },
  ];
  return (
    <div className="bg-[#0b1329] border border-blue-900/40 p-5 rounded-xl shadow-xl col-span-2 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
          <Coins size={12} className="text-blue-400" /> RISK DRIVER ANALYSIS (AI)
        </h2>
        <Info size={13} className="text-blue-300/40" />
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse min-w-[280px]">
          <thead>
            <tr className="text-[9px] text-blue-300/50 border-b border-blue-950 uppercase">
              <th className="pb-2 font-bold">Faktor Risiko</th>
              <th className="pb-2 font-bold">Dampak</th>
              <th className="pb-2 font-bold">Tren</th>
              <th className="pb-2 font-bold text-center">Level Risiko</th>
            </tr>
          </thead>
          <tbody className="text-[10px]">
            {data.map((row, i) => (
              <tr key={i} className="border-b border-blue-950/40 last:border-0 hover:bg-blue-950/20 transition-colors">
                <td className="py-2.5 font-semibold text-slate-200">{row.factor}</td>
                <td className="py-2.5 text-slate-300">
                  <span className="flex items-center">
                    {row.impactDir === 'up' ? <ArrowUp size={10} className="text-red-400 mr-0.5" /> : <ArrowDown size={10} className="text-emerald-400 mr-0.5" />}
                    {row.impact}
                  </span>
                </td>
                <td className="py-2.5">
                  <svg width="40" height="12" viewBox="0 0 40 12">
                    {row.trend === 'up' && <path d="M0,12 L10,8 L20,10 L30,4 L40,0" fill="none" stroke="#ef4444" strokeWidth="1.5" />}
                    {row.trend === 'down' && <path d="M0,0 L10,4 L20,2 L30,8 L40,12" fill="none" stroke="#10b981" strokeWidth="1.5" />}
                    {row.trend === 'flat' && <path d="M0,8 L10,6 L20,9 L30,5 L40,7" fill="none" stroke="#eab308" strokeWidth="1.5" />}
                  </svg>
                </td>
                <td className="py-2.5 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-[8.5px] font-bold ${row.levelColor}`}>{row.level}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[7.5px] text-blue-300/30 mt-2">*Diperbarui otomatis oleh model makro-fiskal AI</p>
    </div>
  );
};

export const RiskDriverTable = RiskDriverAnalysis;

// ==========================================
// 8. ANOMALI BELANJA TABLE COMPONENT
// ==========================================
export const AnomaliBelanjaTable = () => {
  const data = [
    { unit: 'K/L A (Satker Jakarta)', type: 'Belanja Barang', anomaly: 'Lonjakan pengadaan modal di akhir bulan tidak wajar', value: 'Rp24,8 M', level: 'Tinggi', levelColor: 'bg-red-500/20 text-red-400 border border-red-500/30' },
    { unit: 'K/L B (Perwakilan Daerah)', type: 'Belanja Perjalanan', anomaly: 'Frekuensi SPK di atas batas rata-rata kelompok dinas', value: 'Rp9,7 M', level: 'Sedang', levelColor: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' },
    { unit: 'K/L C (Ditjen Teknis)', type: 'Belanja Modal', anomaly: 'Deviasi dari kontrak termin reguler OMSPAN', value: 'Rp15,3 M', level: 'Sedang', levelColor: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' },
    { unit: 'K/L D (Badan Diklat)', type: 'Belanja Jasa Konsultan', anomaly: 'Deviasi nilai wajar pengadaan penyedia jasa serupa', value: 'Rp6,1 M', level: 'Rendah', levelColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' },
    { unit: 'K/L E (Unit Khusus)', type: 'Belanja Hibah Darurat', anomaly: 'Deviasi transfer luar siklus anggaran reguler', value: 'Rp4,2 M', level: 'Rendah', levelColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' },
  ];
  return (
    <div className="bg-[#0b1329] border border-blue-900/40 p-5 rounded-xl shadow-xl col-span-2 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
          <Flame size={12} className="text-red-400" /> DETEKSI ANOMALI BELANJA K/L (AI)
        </h2>
        <Info size={13} className="text-blue-300/40" />
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse min-w-[320px]">
          <thead>
            <tr className="text-[9px] text-blue-300/50 border-b border-blue-950 uppercase">
              <th className="pb-2 font-bold">Unit / Satker</th>
              <th className="pb-2 font-bold">Jenis Belanja</th>
              <th className="pb-2 font-bold">Indikator Anomali</th>
              <th className="pb-2 font-bold text-right">Nilai</th>
              <th className="pb-2 font-bold text-center">Risiko</th>
            </tr>
          </thead>
          <tbody className="text-[10px]">
            {data.map((row, i) => (
              <tr key={i} className="border-b border-blue-950/40 last:border-0 hover:bg-blue-950/20 transition-colors">
                <td className="py-2.5 font-semibold text-slate-200">{row.unit}</td>
                <td className="py-2.5 text-slate-400">{row.type}</td>
                <td className="py-2.5 text-amber-400/90 font-medium">{row.anomaly}</td>
                <td className="py-2.5 text-right font-black text-white">{row.value}</td>
                <td className="py-2.5 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-[8.5px] font-bold ${row.levelColor}`}>{row.level}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex justify-end">
        <button className="text-[9px] text-blue-400 font-bold flex items-center hover:text-blue-300 transition-colors">
          Analisis SAKTI Detil <ArrowRight size={10} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export const AnomalyTable = AnomaliBelanjaTable;

// ==========================================
// 9. SIMULATION SECTION COMPONENT
// ==========================================
export const SimulationSection = () => {
  return (
    <div className="bg-[#0b1329] border border-blue-900/40 p-5 rounded-xl shadow-xl flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold text-white uppercase tracking-wider">SIMULASI SKENARIO (WHAT IF)</h2>
        <Info size={13} className="text-blue-300/40" />
      </div>

      <div className="mb-4">
        <label className="block text-[8px] font-bold text-blue-300/60 uppercase mb-1.5 tracking-wider">Pilih Skenario Stres</label>
        <select className="w-full border border-blue-900/60 rounded-lg bg-blue-950 px-2.5 py-2 text-[11px] text-white outline-none cursor-pointer focus:border-blue-500">
          <option>Harga Minyak Naik 20%</option>
          <option>Suku Bunga Naik 100 bps</option>
          <option>Penerimaan Pajak Turun 5%</option>
        </select>
      </div>

      <div className="flex-1">
        <p className="text-[9px] font-bold text-blue-300/50 mb-3 uppercase tracking-wider">Dampak Proyeksi APBN (Full Year)</p>
        <div className="space-y-3.5 text-[10px]">
          <div className="flex items-center">
            <span className="w-24 text-slate-300">Penerimaan Negara</span>
            <div className="flex-1 flex items-center px-2">
              <div className="w-full bg-slate-800 h-2 flex items-center relative rounded-full">
                <div className="absolute right-1/2 bg-red-500 h-2 rounded-l-full" style={{ width: '20%' }}></div>
                <div className="absolute left-1/2 bg-slate-700 w-px h-3"></div>
              </div>
            </div>
            <span className="w-16 text-right font-bold text-red-400">-Rp23,6 T</span>
          </div>

          <div className="flex items-center">
            <span className="w-24 text-slate-300">Subsidi Energi</span>
            <div className="flex-1 flex items-center px-2">
              <div className="w-full bg-slate-800 h-2 flex items-center relative rounded-full">
                <div className="absolute left-1/2 bg-red-500 h-2 rounded-r-full" style={{ width: '40%' }}></div>
                <div className="absolute left-1/2 bg-slate-700 w-px h-3"></div>
              </div>
            </div>
            <span className="w-16 text-right font-bold text-red-400">+Rp37,9 T</span>
          </div>

          <div className="flex items-center">
            <span className="w-24 text-slate-300">Defisit APBN</span>
            <div className="flex-1 flex items-center px-2">
              <div className="w-full bg-slate-800 h-2 flex items-center relative rounded-full">
                <div className="absolute left-1/2 bg-red-500 h-2 rounded-r-full" style={{ width: '30%' }}></div>
                <div className="absolute left-1/2 bg-slate-700 w-px h-3"></div>
              </div>
            </div>
            <span className="w-16 text-right font-bold text-red-400">+0,18% PDB</span>
          </div>

          <div className="flex items-center">
            <span className="w-24 text-slate-300">Keseimbangan Primer</span>
            <div className="flex-1 flex items-center px-2">
              <div className="w-full bg-slate-800 h-2 flex items-center relative rounded-full">
                <div className="absolute right-1/2 bg-red-500 h-2 rounded-l-full" style={{ width: '15%' }}></div>
                <div className="absolute left-1/2 bg-slate-700 w-px h-3"></div>
              </div>
            </div>
            <span className="w-16 text-right font-bold text-red-400">-Rp14,2 T</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button className="text-[9px] text-blue-400 font-bold flex items-center hover:text-blue-300 transition-colors">
          Jalankan Model <ArrowRight size={10} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export const ScenarioSimulation = SimulationSection;

// ==========================================
// 10. TREASURY NARRATIVE COMPONENT
// ==========================================
export const TreasuryNarrative = () => {
  return (
    <div className="bg-[#0b1329] border border-blue-900/40 p-5 rounded-xl shadow-xl flex flex-col relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
          <Sparkles size={12} className="text-amber-400" /> TREASURY NARRATIVE
        </h2>
        <Info size={13} className="text-blue-300/40" />
      </div>

      <div className="flex-1 relative mt-2">
        <span className="text-5xl text-blue-900/30 font-serif absolute -top-4 -left-1.5 leading-none">“</span>
        <p className="text-[10.5px] text-blue-200 leading-relaxed pl-5 pr-1 pt-1.5 relative z-10 font-medium italic">
          Kinerja makro fiskal per 31 Mei 2026 menunjukkan peningkatan agregat kerentanan. Belanja subsidi energi membengkak yoy akibat fluktuasi harga minyak mentah dan nilai tukar. Direkomendasikan optimalisasi penerimaan pajak non-komoditas dan pengendalian realisasi belanja barang K/L yang terdeteksi anomali tinggi.
        </p>
        <div className="flex items-center mt-3 pl-5">
          <span className="text-[8px] text-amber-400 font-bold tracking-wider uppercase">Generated by Treasury AI Assistant</span>
        </div>
      </div>

      <div className="mt-4 flex justify-end relative z-10">
        <button className="text-[9px] text-blue-400 font-bold flex items-center hover:text-blue-300 transition-colors">
          Salin Narasi <ArrowRight size={10} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

// ==========================================
// MAIN OVERVIEW PAGE EXPORT
// ==========================================
export const Overview = () => {
  const kpiData = [
    { title: 'Pendapatan Negara', value: 'Rp1.158,7 T', change: -4.12, vsText: 'vs Mei 2025 YTD' },
    { title: 'Belanja Negara', value: 'Rp1.348,9 T', change: 8.35, vsText: 'vs Mei 2025 YTD' },
    { title: 'Defisit APBN', value: 'Rp -190,2 T', change: -0.97, vsText: 'vs Mei 2025' },
    { title: 'Realisasi Pembiayaan', value: 'Rp190,2 T', change: 3.21, vsText: 'vs Mei 2025' },
    { title: 'Kas Di K/L', value: 'Rp89,6 T', change: -6.15, vsText: 'vs Apr 2026' },
  ];

  return (
    <div className="p-6 space-y-5 bg-[#030712] min-h-screen text-slate-100">
      {/* Row 1: KPIs + AI Insight Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpiData.map((data, index) => (
          <KPICard key={index} {...data} />
        ))}
        <AIInsightCard />
      </div>

      {/* Row 2: Fiscal Stress Index & Vulnerability Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FiscalStressSection />
        <RegionalVulnerabilityMap />
      </div>

      {/* Row 3: Trend & Contribution & Risk Driver */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <TrendChart />
        <RevenueContributionChart />
        <RiskDriverAnalysis />
      </div>

      {/* Row 4: Anomaly & Scenario & Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <AnomaliBelanjaTable />
        <SimulationSection />
        <TreasuryNarrative />
      </div>
    </div>
  );
};

export default Overview;
