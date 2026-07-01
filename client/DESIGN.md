# Design System — SaaS Dashboard

> Disusun dari analisis 10 referensi dashboard yang diunggah (lihat tabel **Sumber Referensi** di bagian akhir). Dokumen ini merangkum *pattern* yang konsisten di seluruh referensi menjadi satu sistem desain yang bisa langsung dipakai untuk membangun dashboard baru.

## 1. Prinsip Desain

- **Card-based, modular** — setiap blok informasi (KPI, chart, table) hidup di dalam card putih terpisah di atas canvas abu-abu terang. Tidak ada konten yang menempel langsung ke background.
- **Data-dense tapi tetap "bernapas"** — banyak angka & chart, tapi padding generous dan whitespace antar-card menjaga halaman tidak terasa sesak.
- **Satu warna brand, dipakai konsisten** — accent color yang sama dipakai berulang di: logo, state aktif navigasi, tombol primary, link, dan highlight pada chart. Ini yang membuat dashboard terasa "satu produk", bukan kumpulan widget acak.
- **Warna semantik yang jelas** — hijau = positif, merah = negatif, kuning/oranye = pending/warning, biru = netral/info. Dipakai konsisten di badge, trend indicator, dan status pill.
- **Angka besar adalah hero-nya tiap card** — pola paling sering berulang: ikon kecil + label kecil di atas, lalu satu angka besar bold di bawahnya, ditutup indikator tren (▲/▼ + %).
- **Chart sebagai *signature*, bukan sekadar data** — beberapa referensi punya chart kustom yang jadi pembeda visual (sankey gradient, dot-matrix/waffle, radar, peta dunia). Chart generik (bar/line polos) terasa "template"; pilih satu jenis chart custom sebagai ciri khas produk.

## 2. Warna

### Netral & Surface

| Token | Hex | Penggunaan |
|---|---|---|
| `--canvas` | `#F6F7FB` | Background halaman |
| `--surface` | `#FFFFFF` | Card, sidebar, sidebar panel |
| `--border` | `#E9EBF0` | Border tipis antar elemen |
| `--border-strong` | `#D8DBE3` | Border input, divider tegas |
| `--text-primary` | `#14161A` | Heading, angka besar |
| `--text-secondary` | `#6B7280` | Body text, label |
| `--text-tertiary` | `#9CA3AF` | Placeholder, caption |

### Primary Accent

Referensi memakai 3 arah warna brand yang berbeda namun pola pemakaiannya sama. **Default yang disarankan: indigo-blue**, karena paling banyak muncul (5 dari 10 referensi memakai keluarga biru/indigo).

| Arah Warna | Hex | Terinspirasi dari |
|---|---|---|
| **Default — Indigo Blue** | `#4361EE` (hover `#364FC7`, tint bg `#EEF1FF`) | Ref 01, 02, 04, 06, 07 |
| Alt — Violet | `#7C5CFC` (tint `#F1ECFF`) | Ref 03 |
| Alt — Amber/Orange | `#F5841F` (tint `#FFF1E2`) | Ref 10 |
| Alt — Mono/Black | `#111111` | Ref 04 (state aktif nav solid hitam/biru) |

> Ganti `--primary` ke salah satu alt di atas bila ingin arah brand yang berbeda — semua token lain (radius, spacing, tipografi) tetap sama.

### Warna Semantik

| Token | Warna | Background Tint |
|---|---|---|
| `--success` | `#16A34A` | `#E7F8ED` |
| `--danger` | `#EF4444` | `#FDE8EA` |
| `--warning` | `#F59E0B` | `#FEF3DA` |
| `--info` | `#3B82F6` | `#E8F1FF` |

### Palet Chart (kualitatif, multi-series)

```
#4361EE  #14B8A6  #8B5CF6  #F59E0B  #EC4899  #22C55E
```
Dipakai untuk legend kategori (mis. negara, channel, device) — urutkan dari accent utama lalu warna pendukung.

## 3. Tipografi

**Font family:** sans-serif grotesque modern — *Inter*, *Geist Sans*, atau *Plus Jakarta Sans*. Angka memakai `font-variant-numeric: tabular-nums` agar kolom angka rapi sejajar.

| Role | Size | Weight | Line-height | Contoh pemakaian |
|---|---|---|---|---|
| Greeting / Display | 32px | 700 | 1.2 | "Good Evening, John" |
| Page Title (H1) | 24px | 700 | 1.3 | "Dashboard", "Overview" |
| Card Title (H2) | 16px | 600 | 1.4 | "Total Profit", "Performance" |
| **Stat Number** | 30px | 700 | 1.1 | "$446.7K", "16,431" |
| Body | 14px | 500 | 1.5 | Teks umum, deskripsi |
| Table cell | 13px | 500 | 1.5 | Isi tabel |
| Caption / Eyebrow | 12px | 600 | 1.4 | Label grup sidebar (UPPERCASE, letter-spacing 0.06em, warna `--text-tertiary`) |

## 4. Spacing & Radius

**Spacing scale (basis 4px):** `4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64`
- Padding di dalam card: `20–24px`
- Gap antar card dalam grid: `16–24px`
- Gap antar item list (table row, activity feed): `12–16px`

**Radius scale:**

| Token | Px | Dipakai untuk |
|---|---|---|
| `--radius-sm` | 10px | Input, button kecil |
| `--radius-md` | 12px | Button, dropdown, icon container |
| `--radius-lg` | 16px | Card standar |
| `--radius-xl` | 24px | Hero/banner card |
| `--radius-full` | 9999px | Badge, pill, avatar |

## 5. Elevation

```css
--shadow-card: 0 1px 2px rgba(16,24,40,.04), 0 8px 20px rgba(16,24,40,.06);
--shadow-popover: 0 4px 6px rgba(16,24,40,.05), 0 20px 40px rgba(16,24,40,.12);
```
Shadow selalu lembut, blur besar, opacity rendah — efek "card mengambang" di atas canvas abu-abu, bukan shadow tajam.

## 6. Struktur Layout

Dua pola app-shell muncul di referensi:

**A — Sidebar kiri (dominan, 7/10 referensi)**
```
┌─────────┬──────────────────────────────────────┐
│         │  Topbar: search · notif · avatar       │
│ Sidebar │ ───────────────────────────────────── │
│ 240-280 │  Page title · filter/date · primary CTA│
│ px      │ ───────────────────────────────────── │
│         │  [KPI] [KPI] [KPI] [KPI]               │
│ logo    │ ───────────────────────────────────── │
│ nav     │  [ Chart/Table besar  ] [ Panel kanan ]│
│ groups  │  [                    ] [ list/feed   ]│
│         │                                        │
│ promo   │                                        │
│ card    │                                        │
└─────────┴──────────────────────────────────────┘
```
- Sidebar berisi: logo, grup nav dengan label kecil (mis. "GENERAL", "TOOLS"), item aktif ditandai pill/bar warna primary, dan card promo "Upgrade to Pro" di paling bawah.

**B — Top nav horizontal (2/10 referensi, cocok untuk tool analitik padat)**
```
┌──────────────────────────────────────────────┐
│ logo · nav items (pill aktif) · search · avatar│
├──────────────────────────────────────────────┤
│  Page title besar + date range comparison      │
│  Grid card konten                              │
└──────────────────────────────────────────────┘
```

**Grid konten:** baris KPI = grid auto-fit (4 kolom desktop → 2 kolom tablet → 1 kolom mobile). Area utama biasanya split **8/12 (chart/table utama) + 4/12 (panel kanan: activity, meeting, mentor list, dll)**.

## 7. Komponen Utama

- **KPI Stat Card** — ikon kecil bulat (bg tint warna kategori) + label abu-abu + angka besar bold + pill tren (`▲ 4,4%` hijau / `▼ 10,5%` merah). Ini pola paling sering berulang di seluruh referensi.
- **Chart Card** — header berisi judul + dropdown periode (mis. "Last 30 days") + ikon kebab `···`. Tooltip hover berupa card gelap kecil dengan 2-3 baris data.
- **Data Table** — kolom pertama selalu avatar/ikon + nama; kolom terakhir status pill atau aksi. Tanpa garis vertikal, hanya divider horizontal tipis; baris di-hover dengan background tint sangat halus.
- **Badge / Status Pill** — bentuk full-radius, background tint warna semantik, teks warna solid yang sama (mis. bg `#E7F8ED` + teks `#16A34A` untuk "Completed").
- **Avatar & Avatar Group** — lingkaran dengan border putih 2px saat stacking; dot status online di pojok kanan-bawah bila relevan.
- **Primary Button** — bg `--primary`, teks putih, radius `--radius-md`, padding `10px 16px`. Secondary/outline pakai border `--border-strong` + teks `--text-primary`.
- **Search Input** — full pill/rounded, ikon kaca pembesar kiri, shortcut key (`⌘K`/`⌘F`) rata kanan dalam input, bg sedikit lebih terang dari surface.
- **Promo/Upsell Card** — di bagian bawah sidebar, bg solid warna primary atau abu lembut, judul singkat + 1 kalimat + tombol pill.
- **AI Assist Surface** *(tren baru, opsional)* — input field "Ask me anything…" dengan orb/ikon glow, atau prompt bar inline di atas chart ("What would you like to explore next?") yang menyarankan pertanyaan terkait data yang sedang dilihat.

## 8. Pola Visualisasi Data

| Jenis Chart | Gaya | Sumber |
|---|---|---|
| Line chart | Garis halus + area gradient tipis di bawahnya, tooltip dark popover saat hover titik | Ref 01, 06 |
| Bar/column | Bar dengan 1 bar di-highlight warna primary, sisanya abu muda (menonjolkan hari/kategori "peak") | Ref 01, 02 |
| Donut / radial gauge | Setengah/penuh lingkaran progress dengan angka % besar di tengah, target text kecil di bawah | Ref 01, 02, 05 |
| Dot-matrix / waffle | Grid titik-titik kecil sebagai pengganti bar, sebagian disorot warna untuk menunjukkan volume | Ref 10 |
| Funnel / waterfall | Bar bertingkat menurun antar tahap proses, sebagian bertekstur hatch untuk tahap "potensial" | Ref 10 |
| Sankey/flow gradient | Bar custom yang menyambung antar periode dengan gradient warna — chart paling distinctive di referensi | Ref 02 |
| Radar / spider | Multi-axis dengan beberapa garis warna berbeda (per channel/platform) | Ref 09 |
| Map chart | Peta dunia dot-pattern dengan label pin angka per negara | Ref 09 |
| Workflow/journey diagram | Card-card tahapan dihubungkan garis lengkung berarah, mensimulasikan alur proses | Ref 05 |

## 9. Ikon & Voice

- **Ikon:** outline/stroke style (mirip Lucide/Phosphor), ukuran konsisten 16–20px, stroke width seragam.
- **Voice produk:** singkat, aktif, berorientasi aksi — label tombol = hasil yang terjadi ("Export", "Add Widget", "Upgrade"), bukan istilah teknis sistem. Status ditulis sebagai kata sifat netral ("In Progress", "Pending"), tidak menghakimi.

## 10. Peluang Elemen Signature

Pilih **satu** dari elemen berikut untuk jadi ciri khas produk — jangan gabung semua, agar tetap fokus:

1. **AI insight bar di atas chart** (Ref 10) — prompt input yang langsung menyarankan pertanyaan kontekstual terhadap data di card tersebut.
2. **Gradient stat card berwarna** (Ref 08) — dua card besar gradient hangat/dingin untuk membedakan kategori metrik utama dari sisanya yang monokrom.
3. **Workflow diagram bergaris penghubung** (Ref 05) — cocok untuk produk yang punya proses/pipeline multi-tahap (CRM, case management).
4. **Chart flow gradient antar periode** (Ref 02) — alternatif visual untuk komparasi bulanan yang lebih ekspresif dari bar chart biasa.

## 11. Responsif & Aksesibilitas

- Breakpoint: desktop ≥1280px (grid 4 kolom KPI), tablet 768–1279px (2 kolom, sidebar collapsible jadi ikon saja), mobile <768px (1 kolom, sidebar jadi bottom-sheet/drawer).
- Kontras teks minimal 4.5:1 terhadap background card putih.
- Semua state interaktif (button, nav item, row table) punya focus ring yang terlihat jelas (outline 2px warna primary, offset 2px).
- Status tidak boleh hanya mengandalkan warna — selalu sertai ikon arah (▲▼) atau label teks di samping warna.

## 12. Token CSS Ringkas

```css
:root {
  --canvas: #F6F7FB;
  --surface: #FFFFFF;
  --border: #E9EBF0;
  --border-strong: #D8DBE3;

  --text-primary: #14161A;
  --text-secondary: #6B7280;
  --text-tertiary: #9CA3AF;

  --primary: #4361EE;
  --primary-hover: #364FC7;
  --primary-tint: #EEF1FF;

  --success: #16A34A;  --success-tint: #E7F8ED;
  --danger:  #EF4444;  --danger-tint:  #FDE8EA;
  --warning: #F59E0B;  --warning-tint: #FEF3DA;
  --info:    #3B82F6;  --info-tint:    #E8F1FF;

  --radius-sm: 10px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  --shadow-card: 0 1px 2px rgba(16,24,40,.04), 0 8px 20px rgba(16,24,40,.06);
  --shadow-popover: 0 4px 6px rgba(16,24,40,.05), 0 20px 40px rgba(16,24,40,.12);

  --font-sans: "Inter", "Plus Jakarta Sans", system-ui, sans-serif;
}
```

## Sumber Referensi

| # | Tipe Produk | Pola Sidebar/Nav | Elemen Khas |
|---|---|---|---|
| 01 | E-commerce admin (Shopeers) | Sidebar | AI assistant orb, widget picker modal |
| 02 | Sales/finance dashboard (Nexus) | Sidebar, browser frame | Sankey-style gradient chart |
| 03 | Online course platform (Coursue) | Sidebar | Hero banner gradient, circular progress avatar |
| 04 | Project management (Mondays) | Sidebar | Tipografi greeting besar, schedule day-picker |
| 05 | CRM / case management (SugarCRM) | Top nav | Workflow diagram bergaris penghubung |
| 06 | Time tracking (logip) | Sidebar + chat panel | Activity feed + chat kombinasi |
| 07 | File storage (minecloud) | Top nav + sidebar filter | Detail panel kanan dengan tab Activity/Comments/Versions |
| 08 | Personal productivity dashboard | Tanpa sidebar (single shell) | Gradient stat card warna-warni |
| 09 | Social/influencer campaign analytics | Sidebar | Peta dunia, radar chart |
| 10 | Fintech/payments (Zentra) | Top nav | Funnel chart, AI insight bar inline |

---
*Dokumen ini adalah sintesis pola, bukan tiruan piksel-demi-piksel dari referensi manapun — siap dipakai sebagai baseline untuk membangun UI dashboard baru.*
