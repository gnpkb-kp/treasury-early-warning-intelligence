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
  Coins,
  TrendingUp,
  CreditCard,
  Wallet,
  Activity
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

  const getIconAndColor = (title: string) => {
    switch (title.toLowerCase()) {
      case 'pendapatan negara':
        return { Icon: TrendingUp, bgTint: 'bg-success-tint', iconColor: 'text-success' };
      case 'belanja negara':
        return { Icon: CreditCard, bgTint: 'bg-primary-tint', iconColor: 'text-primary' };
      case 'defisit apbn':
        return { Icon: AlertTriangle, bgTint: 'bg-danger-tint', iconColor: 'text-danger' };
      case 'realisasi pembiayaan':
        return { Icon: Coins, bgTint: 'bg-info-tint', iconColor: 'text-info' };
      case 'kas di k/l':
        return { Icon: Wallet, bgTint: 'bg-warning-tint', iconColor: 'text-warning' };
      default:
        return { Icon: Activity, bgTint: 'bg-primary-tint', iconColor: 'text-primary' };
    }
  };

  const { Icon, bgTint, iconColor } = getIconAndColor(title);

  return (
    <div className="bg-surface border border-border p-5 rounded-xl shadow-card flex flex-col justify-between group transition-all duration-300 hover:border-primary/40 hover:shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg ${bgTint}`}>
          <Icon size={16} className={iconColor} />
        </div>
        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold flex items-center ${isUp ? 'bg-success-tint text-success' : 'bg-danger-tint text-danger'}`}>
          {isUp ? '▲' : '▼'} {displayChange.replace('+', '').replace('-', '')}
        </span>
      </div>
      <div>
        <h3 className="text-[10px] font-bold text-text-secondary uppercase mb-1 tracking-wider">{title}</h3>
        <p className="text-xl font-black text-text-primary tracking-tight group-hover:text-primary transition-colors duration-200 tabular-nums">{value}</p>
      </div>
      <div className="flex items-end justify-between mt-3 pt-2 border-t border-border/50">
        <p className="text-[9px] text-text-tertiary font-semibold">{vsText || 'vs bulan lalu'}</p>
        <div className="w-14 h-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparklineData}>
              <Line type="monotone" dataKey="val" stroke={isUp ? 'var(--color-success)' : 'var(--color-danger)'} strokeWidth={1.5} dot={false} isAnimationActive={false} />
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
  <div className="bg-gradient-to-br from-primary-tint/40 to-surface border border-primary/20 p-5 rounded-xl shadow-card flex flex-col justify-between">
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-1">
        <Sparkles size={11} className="text-primary animate-pulse" /> AI INSIGHT SUMMARY
      </h3>
    </div>
    <p className="text-[10.5px] text-text-primary leading-relaxed flex-1 mt-1 font-medium">
      Tekanan fiskal meningkat terutama disebabkan oleh lonjakan subsidi energi (belanja wajib) dan perlambatan penerimaan sektor komoditas ekspor. Defisit terkoreksi melebar.
    </p>
    <button className="text-[10px] text-primary font-bold flex items-center justify-end mt-3 hover:text-primary-hover transition-colors">
      Detail Analisis <ArrowRight size={10} className="ml-1" />
    </button>
  </div>
);

// ==========================================
// 3. FISCAL STRESS SECTION
// ==========================================
export const FiscalStressSection = () => {
  const gaugeData = [
    { name: 'Score', value: 62, color: 'var(--color-warning)' }, // Yellow for WASPADA
    { name: 'Remaining', value: 38, color: 'var(--color-border)' }
  ];
  const barData = [
    { name: 'Risiko Penerimaan', value: 58, fill: 'var(--color-success)' },
    { name: 'Risiko Belanja', value: 72, fill: 'var(--color-warning)' },
    { name: 'Risiko Subsidi', value: 81, fill: 'var(--color-danger)' },
    { name: 'Risiko Utang', value: 45, fill: 'var(--color-success)' },
    { name: 'Risiko Eksternal', value: 67, fill: 'var(--color-warning)' },
  ];

  return (
    <div className="bg-surface border border-border p-5 rounded-xl shadow-card flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-1.5">
          <AlertTriangle size={13} className="text-warning" />
          FISCAL STRESS INDEX <span className="text-primary/60 font-normal capitalize">(Early Warning)</span>
        </h2>
        <Info size={13} className="text-text-tertiary" />
      </div>
      <div className="flex flex-1 flex-col sm:flex-row items-center gap-6">
        <div className="w-full sm:w-1/2 relative flex items-center justify-center">
          <PieChart width={150} height={150}>
            <Pie data={gaugeData} cx={75} cy={75} innerRadius={48} outerRadius={62} startAngle={180} endAngle={0} dataKey="value" stroke="none">
              {gaugeData.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie>
          </PieChart>
          <div className="absolute flex flex-col items-center top-[50px]">
            <span className="text-[7.5px] font-bold text-text-tertiary mb-0.5">WASPADA (40 - 69)</span>
            <span className="text-2xl font-black text-text-primary">62.0</span>
            <span className="text-[9px] text-warning bg-warning-tint/60 px-2.5 py-0.5 rounded-full font-bold mt-1.5 uppercase tracking-wider">STATUS: WASPADA</span>
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <h3 className="text-[9px] font-bold text-text-secondary mb-2 uppercase tracking-wider">Komponen Penyusun</h3>
          <div className="space-y-2">
            {barData.map(item => (
              <div key={item.name} className="flex items-center text-[10px]">
                <span className="w-24 text-text-secondary font-medium">{item.name}</span>
                <div className="flex-1 bg-canvas h-2.5 rounded-full overflow-hidden border border-border flex">
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
    <div className="bg-surface border border-border p-5 rounded-xl shadow-card flex flex-col relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-1.5">
          <Globe size={13} className="text-primary" />
          PETA KERENTANAN FISKAL DAERAH
        </h2>
        <Info size={13} className="text-text-tertiary" />
      </div>
      <div className="flex-1 bg-canvas rounded-lg border border-border flex items-center justify-center relative overflow-hidden min-h-[160px]">
        <div className="w-full h-full flex flex-col items-center justify-center opacity-70 p-2">
          <svg viewBox="0 0 800 350" className="w-full h-full text-text-tertiary/40" fill="currentColor">
            {/* Map representation */}
            <path d="M100,100 Q150,80 200,110 T300,130 T400,150 T450,200 Q400,230 350,210 T250,170 T150,150 Z" fill="#16A34A" opacity="0.6" />
            <path d="M480,170 Q520,150 550,180 T600,230 Q560,250 520,220 Z" fill="#F59E0B" opacity="0.6" />
            <path d="M620,130 Q660,100 700,140 T750,180 Q720,210 680,170 Z" fill="#EF4444" opacity="0.6" />
            <path d="M200,230 Q250,220 300,250 T350,280 Q300,300 250,270 Z" fill="#EF4444" opacity="0.6" />
            <path d="M350,100 Q400,80 450,120 T500,150 Q450,180 400,150 Z" fill="#16A34A" opacity="0.6" />
          </svg>
          <span className="absolute text-text-tertiary/60 text-[10px] font-black tracking-widest uppercase">SPASIAL REALISASI APBN / TKD</span>
        </div>

        <div className="absolute right-3 top-3 bg-surface border border-border p-2 rounded text-[8px] shadow-card">
          <p className="font-bold text-text-primary mb-1">Tingkat Kerentanan</p>
          <div className="flex items-center mb-1"><div className="w-1.5 h-1.5 rounded-full bg-danger mr-1.5"></div>Tinggi</div>
          <div className="flex items-center mb-1"><div className="w-1.5 h-1.5 rounded-full bg-warning mr-1.5"></div>Sedang</div>
          <div className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-success mr-1.5"></div>Rendah</div>
        </div>
      </div>
      <p className="text-[8px] text-text-tertiary mt-2">*Kombinasi ketergantungan dana transfer TKD & rasio belanja wajib mandatori</p>
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
    <div className="bg-surface border border-border p-5 rounded-xl shadow-card md:col-span-2 lg:col-span-2 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold text-text-primary uppercase tracking-wider">TREND PENERIMAAN & BELANJA (YTD)</h2>
      </div>
      <div className="flex-1 min-h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity="0.6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: 'var(--color-text-secondary)' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: 'var(--color-text-secondary)' }} tickFormatter={(val) => `${val} T`} />
            <Tooltip contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text-primary)', fontSize: '10px', borderRadius: '8px', boxShadow: 'var(--shadow-card)' }} />
            <Legend wrapperStyle={{ fontSize: '9px', paddingTop: '10px' }} iconType="circle" />
            <Line type="monotone" dataKey="penerimaan" name="Penerimaan Negara" stroke="var(--color-primary)" strokeWidth={2.5} dot={{ r: 2 }} activeDot={{ r: 4 }} />
            <Line type="monotone" dataKey="belanja" name="Belanja Negara" stroke="var(--color-warning)" strokeWidth={2.5} dot={{ r: 2 }} activeDot={{ r: 4 }} />
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
    { name: 'PPh', value: 21.7, color: '#4361EE' }, // Primary
    { name: 'PPh Badan', value: 18.3, color: '#14B8A6' }, // Teal
    { name: 'PPN & PPnBM', value: 16.8, color: '#8B5CF6' }, // Violet
    { name: 'Bea Masuk', value: 7.6, color: '#3B82F6' }, // Info Blue
    { name: 'Cukai', value: 6.3, color: '#F59E0B' }, // Warning Amber
    { name: 'PNBP', value: 15.4, color: '#EC4899' }, // Pink
    { name: 'Lainnya', value: 13.9, color: '#9CA3AF' }, // Gray
  ];
  return (
    <div className="bg-surface border border-border p-5 rounded-xl shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold text-text-primary uppercase tracking-wider">KONTRIBUSI PENERIMAAN NEGARA</h2>
        <Info size={13} className="text-text-tertiary" />
      </div>
      <div className="flex flex-col sm:flex-row items-center min-h-[160px] gap-4 sm:gap-2">
        <div className="w-full sm:w-1/2 h-full relative flex items-center justify-center">
          <div className="w-28 h-28">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} cx="50%" cy="50%" innerRadius={32} outerRadius={52} dataKey="value" stroke="var(--color-surface)" strokeWidth={1.5}>
                  {data.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
            <span className="text-[8px] text-text-secondary">Total</span>
            <span className="text-[9px] font-bold text-text-primary">Rp1.158,7 T</span>
          </div>
        </div>
        <div className="w-full sm:w-1/2 pl-0 sm:pl-2">
          <ul className="space-y-1">
            {data.map(item => (
              <li key={item.name} className="flex items-center justify-between text-[9px]">
                <div className="flex items-center flex-1 min-w-0 mr-2">
                  <span className="w-1.5 h-1.5 rounded-full mr-1.5 flex-shrink-0" style={{ backgroundColor: item.color }}></span>
                  <span className="text-text-secondary font-medium truncate" title={item.name}>{item.name}</span>
                </div>
                <span className="font-bold text-text-primary flex-shrink-0">{item.value}%</span>
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
    { factor: 'Harga Minyak Dunia', impact: 'Tinggi', impactDir: 'up', trend: 'down', level: 'Tinggi', levelColor: 'bg-danger-tint text-danger' },
    { factor: 'Harga Batu Bara', impact: 'Sedang', impactDir: 'down', trend: 'flat', level: 'Sedang', levelColor: 'bg-warning-tint text-warning' },
    { factor: 'Nilai Tukar (USD/IDR)', impact: 'Sedang', impactDir: 'up', trend: 'up', level: 'Sedang', levelColor: 'bg-warning-tint text-warning' },
    { factor: 'Suku Bunga Global', impact: 'Rendah', impactDir: 'up', trend: 'down', level: 'Rendah', levelColor: 'bg-success-tint text-success' },
    { factor: 'Pertumbuhan Ekonomi Global', impact: 'Rendah', impactDir: 'down', trend: 'up', level: 'Rendah', levelColor: 'bg-success-tint text-success' },
  ];
  return (
    <div className="bg-surface border border-border p-5 rounded-xl shadow-card md:col-span-1 lg:col-span-2 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-1">
          <Coins size={12} className="text-primary" /> RISK DRIVER ANALYSIS (AI)
        </h2>
        <Info size={13} className="text-text-tertiary" />
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse min-w-[280px]">
          <thead>
            <tr className="text-[9px] text-text-tertiary border-b border-border uppercase">
              <th className="pb-2 font-bold">Faktor Risiko</th>
              <th className="pb-2 font-bold">Dampak</th>
              <th className="pb-2 font-bold">Tren</th>
              <th className="pb-2 font-bold text-center">Level Risiko</th>
            </tr>
          </thead>
          <tbody className="text-[10px]">
            {data.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-canvas/50 transition-colors">
                <td className="py-2.5 font-semibold text-text-primary">{row.factor}</td>
                <td className="py-2.5 text-text-secondary">
                  <span className="flex items-center font-medium">
                    {row.impactDir === 'up' ? <ArrowUp size={10} className="text-danger mr-0.5" /> : <ArrowDown size={10} className="text-success mr-0.5" />}
                    {row.impact}
                  </span>
                </td>
                <td className="py-2.5">
                  <svg width="40" height="12" viewBox="0 0 40 12">
                    {row.trend === 'up' && <path d="M0,12 L10,8 L20,10 L30,4 L40,0" fill="none" stroke="var(--color-danger)" strokeWidth="1.5" />}
                    {row.trend === 'down' && <path d="M0,0 L10,4 L20,2 L30,8 L40,12" fill="none" stroke="var(--color-success)" strokeWidth="1.5" />}
                    {row.trend === 'flat' && <path d="M0,8 L10,6 L20,9 L30,5 L40,7" fill="none" stroke="var(--color-warning)" strokeWidth="1.5" />}
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
      <p className="text-[7.5px] text-text-tertiary mt-2">*Diperbarui otomatis oleh model makro-fiskal AI</p>
    </div>
  );
};

export const RiskDriverTable = RiskDriverAnalysis;

// ==========================================
// 8. ANOMALI BELANJA TABLE COMPONENT
// ==========================================
export const AnomaliBelanjaTable = () => {
  const data = [
    { unit: 'K/L A (Satker Jakarta)', type: 'Belanja Barang', anomaly: 'Lonjakan pengadaan modal di akhir bulan tidak wajar', value: 'Rp24,8 M', level: 'Tinggi', levelColor: 'bg-danger-tint text-danger' },
    { unit: 'K/L B (Perwakilan Daerah)', type: 'Belanja Perjalanan', anomaly: 'Frekuensi SPK di atas batas rata-rata kelompok dinas', value: 'Rp9,7 M', level: 'Sedang', levelColor: 'bg-warning-tint text-warning' },
    { unit: 'K/L C (Ditjen Teknis)', type: 'Belanja Modal', anomaly: 'Deviasi dari kontrak termin reguler OMSPAN', value: 'Rp15,3 M', level: 'Sedang', levelColor: 'bg-warning-tint text-warning' },
    { unit: 'K/L D (Badan Diklat)', type: 'Belanja Jasa Konsultan', anomaly: 'Deviasi nilai wajar pengadaan penyedia jasa serupa', value: 'Rp6,1 M', level: 'Rendah', levelColor: 'bg-success-tint text-success' },
    { unit: 'K/L E (Unit Khusus)', type: 'Belanja Hibah Darurat', anomaly: 'Deviasi transfer luar siklus anggaran reguler', value: 'Rp4,2 M', level: 'Rendah', levelColor: 'bg-success-tint text-success' },
  ];
  return (
    <div className="bg-surface border border-border p-5 rounded-xl shadow-card md:col-span-2 lg:col-span-2 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-1">
          <Flame size={12} className="text-danger animate-pulse" /> DETEKSI ANOMALI BELANJA K/L (AI)
        </h2>
        <Info size={13} className="text-text-tertiary" />
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse min-w-[320px]">
          <thead>
            <tr className="text-[9px] text-text-tertiary border-b border-border uppercase">
              <th className="pb-2 font-bold">Unit / Satker</th>
              <th className="pb-2 font-bold">Jenis Belanja</th>
              <th className="pb-2 font-bold">Indikator Anomali</th>
              <th className="pb-2 font-bold text-right">Nilai</th>
              <th className="pb-2 font-bold text-center">Risiko</th>
            </tr>
          </thead>
          <tbody className="text-[10px]">
            {data.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-canvas/50 transition-colors">
                <td className="py-2.5 font-semibold text-text-primary">{row.unit}</td>
                <td className="py-2.5 text-text-secondary">{row.type}</td>
                <td className="py-2.5 text-warning font-semibold">{row.anomaly}</td>
                <td className="py-2.5 text-right font-black text-text-primary tabular-nums">{row.value}</td>
                <td className="py-2.5 text-center">
                  <span className={`px-2 py-0.5 rounded-full text-[8.5px] font-bold ${row.levelColor}`}>{row.level}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex justify-end">
        <button className="text-[9px] text-primary font-bold flex items-center hover:text-primary-hover transition-colors">
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
    <div className="bg-surface border border-border p-5 rounded-xl shadow-card flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold text-text-primary uppercase tracking-wider">SIMULASI SKENARIO (WHAT IF)</h2>
        <Info size={13} className="text-text-tertiary" />
      </div>

      <div className="mb-4">
        <label className="block text-[8px] font-bold text-text-secondary uppercase mb-1.5 tracking-wider">Pilih Skenario Stres</label>
        <select className="w-full border border-border rounded-lg bg-canvas px-2.5 py-2 text-[11px] text-text-primary outline-none cursor-pointer focus:border-primary/50 transition-colors duration-150">
          <option>Harga Minyak Naik 20%</option>
          <option>Suku Bunga Naik 100 bps</option>
          <option>Penerimaan Pajak Turun 5%</option>
        </select>
      </div>

      <div className="flex-1">
        <p className="text-[9px] font-bold text-text-tertiary mb-3 uppercase tracking-wider">Dampak Proyeksi APBN (Full Year)</p>
        <div className="space-y-3.5 text-[10px]">
          <div className="flex items-center">
            <span className="w-24 text-text-secondary font-medium">Penerimaan Negara</span>
            <div className="flex-1 flex items-center px-2">
              <div className="w-full bg-canvas border border-border h-2 flex items-center relative rounded-full">
                <div className="absolute right-1/2 bg-danger h-1.5 rounded-l-full" style={{ width: '20%' }}></div>
                <div className="absolute left-1/2 bg-border-strong w-px h-3"></div>
              </div>
            </div>
            <span className="w-16 text-right font-bold text-danger">-Rp23,6 T</span>
          </div>

          <div className="flex items-center">
            <span className="w-24 text-text-secondary font-medium">Subsidi Energi</span>
            <div className="flex-1 flex items-center px-2">
              <div className="w-full bg-canvas border border-border h-2 flex items-center relative rounded-full">
                <div className="absolute left-1/2 bg-danger h-1.5 rounded-r-full" style={{ width: '40%' }}></div>
                <div className="absolute left-1/2 bg-border-strong w-px h-3"></div>
              </div>
            </div>
            <span className="w-16 text-right font-bold text-danger">+Rp37,9 T</span>
          </div>

          <div className="flex items-center">
            <span className="w-24 text-text-secondary font-medium">Defisit APBN</span>
            <div className="flex-1 flex items-center px-2">
              <div className="w-full bg-canvas border border-border h-2 flex items-center relative rounded-full">
                <div className="absolute left-1/2 bg-danger h-1.5 rounded-r-full" style={{ width: '30%' }}></div>
                <div className="absolute left-1/2 bg-border-strong w-px h-3"></div>
              </div>
            </div>
            <span className="w-16 text-right font-bold text-danger">+0,18% PDB</span>
          </div>

          <div className="flex items-center">
            <span className="w-24 text-text-secondary font-medium">Keseimbangan Primer</span>
            <div className="flex-1 flex items-center px-2">
              <div className="w-full bg-canvas border border-border h-2 flex items-center relative rounded-full">
                <div className="absolute right-1/2 bg-danger h-1.5 rounded-l-full" style={{ width: '15%' }}></div>
                <div className="absolute left-1/2 bg-border-strong w-px h-3"></div>
              </div>
            </div>
            <span className="w-16 text-right font-bold text-danger">-Rp14,2 T</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button className="text-[9px] text-primary font-bold flex items-center hover:text-primary-hover transition-colors">
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
    <div className="bg-surface border border-border p-5 rounded-xl shadow-card md:col-span-1 lg:col-span-2 flex flex-col relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-1">
          <Sparkles size={12} className="text-primary" /> TREASURY NARRATIVE
        </h2>
        <Info size={13} className="text-text-tertiary" />
      </div>

      <div className="flex-1 relative mt-2">
        <span className="text-5xl text-primary-tint/60 font-serif absolute -top-4 -left-1.5 leading-none">“</span>
        <p className="text-[10.5px] text-text-primary leading-relaxed pl-5 pr-1 pt-1.5 relative z-10 font-medium italic">
          Kinerja makro fiskal per 31 Mei 2026 menunjukkan peningkatan agregat kerentanan. Belanja subsidi energi membengkak yoy akibat fluktuasi harga minyak mentah dan nilai tukar. Direkomendasikan optimalisasi penerimaan pajak non-komoditas dan pengendalian realisasi belanja barang K/L yang terdeteksi anomali tinggi.
        </p>
        <div className="flex items-center mt-3 pl-5">
          <span className="text-[8px] text-primary font-bold tracking-wider uppercase">Generated by Treasury AI Assistant</span>
        </div>
      </div>

      <div className="mt-4 flex justify-end relative z-10">
        <button className="text-[9px] text-primary font-bold flex items-center hover:text-primary-hover transition-colors">
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
    <div className="p-4 sm:p-6 space-y-5 bg-canvas min-h-screen text-text-primary">
      {/* Row 1: KPIs + AI Insight Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <TrendChart />
        <RevenueContributionChart />
        <RiskDriverAnalysis />
      </div>

      {/* Row 4: Anomaly & Scenario & Narrative */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <AnomaliBelanjaTable />
        <SimulationSection />
        <TreasuryNarrative />
      </div>
    </div>
  );
};

export default Overview;
