import { useState } from "react";

const MISSION = {
  name: "OPERATIE ATLAS",
  subtitle: "Police Operation Order — Narcotics — 04 APR",
  department: "POLITIE EENHEID OOST-NEDERLAND — TGO NARCOTICA",
  classification: "POLICE SENSITIVE — NOT FOR DISTRIBUTION",
  date: "04 APR 2025 · H-HOUR: 19:00",
  objectives: [
    { id: 1, title: "Execute simultaneous entry", desc: "Both teams breach at exactly 19:00. No early movement." },
    { id: 2, title: "Secure suspect ALPHA", desc: "Detain Daan Verhoeven at the residential address, Arnhem." },
    { id: 3, title: "Secure suspect BRAVO", desc: "Detain Sven Houben at or near the business premises." },
    { id: 4, title: "Seize narcotics & evidence", desc: "Preserve all substances, packaging, cash, phones, and ledgers." },
    { id: 5, title: "Search & clear both premises", desc: "Full sweep for additional persons, weapons, or concealed stashes." },
  ],
  briefing: [
    "INCIDENT COMMANDER: Attention all units. Operation Atlas targets a two-person narcotics distribution network operating between a residential address at Kronenburgsingel 2, Arnhem and a business premises at Westervoortsedijk 73, Arnhem-Noord (Lorentz Bedrijvenpark). Intelligence gathered over six weeks of surveillance indicates regular movement of suspected controlled substances between the two locations, primarily between 17:00 and 21:00.",
    "Both suspects have been observed alternating between the warehouse and the residence multiple times per week. On at least four occasions, vehicles (blue VW Transporter, kenteken GH-214-R; silver BMW 520d, kenteken ZN-486-H) were tracked moving directly between the two addresses within 30 minutes. Packages consistent in size with bulk narcotics packaging were observed during two vehicle stops.",
    "Intelligence Assessment: The warehouse unit (Unit 14, Westervoortsedijk 73) is rented under a shell company — Sven Houben is listed as contact. The property has two large roller doors, one loading bay, external CCTV facing the access road, and a side personnel door. The Kronenburgsingel address is a ground-floor apartment in a 4-storey residential block. Suspect ALPHA occupies the rear unit. There is a shared entrance with intercom and a rear courtyard exit.",
    "Rules of Engagement: Both suspects are considered potentially armed. One firearm has been associated with Sven Houben from a prior arrest. Non-lethal force is preferred. Lethal force is authorized in case of direct threat to officer or civilian safety. Neutralise CCTV at the warehouse approach before breach. Announce clearly: POLITIE — DEUREN OPEN.",
  ],
  suspects: [
    {
      id: 1, name: "DAAN VERHOEVEN", alias: "D / De Kat", age: 31, threat: "MEDIUM", armed: false, initials: "DV",
      location: "RESIDENTIAL — KRONENBURGSINGEL",
      priors: ["Drugs possession (2019)", "Drugs trafficking (2021)", "Resisting arrest (2022)"],
      desc: "Primary distribution coordinator. Manages client contacts and logistics. Known to operate from the Kronenburgsingel apartment. No confirmed firearms but has used a knife in a prior altercation. Expect verbal resistance.",
      vehicle: "Silver BMW 520d · ZN-486-H",
    },
    {
      id: 2, name: "SVEN HOUBEN", alias: "Sven / De Hond", age: 38, threat: "HIGH", armed: true, initials: "SH",
      location: "BUSINESS — WESTERVOORTSEDIJK",
      priors: ["Drugs trafficking (2017)", "Illegal firearm possession (2020)", "Assault LEO (2021)"],
      desc: "Logistics and storage. Controls the warehouse unit. Previously arrested in possession of a Glock 17. Hostile history with law enforcement — consider armed until confirmed otherwise. May flee via rear access road toward the river.",
      vehicle: "Blue VW Transporter · GH-214-R",
    },
  ],
  locations: [
    {
      id: 1,
      team: "TEAM ALPHA",
      label: "RESIDENTIAL",
      address: "Kronenburgsingel 2, 6831 GM Arnhem",
      type: "Ground-floor apartment — 4-storey block",
      suspect: "DAAN VERHOEVEN",
      coords: "51.9847° N, 5.9137° E",
      approach: "Stage in Kronenburgpark (80m south). Approach on foot via Kronenburgsingel from east. No vehicle approach — block is overlooked from upper floors. Confirm unit number: rear ground-floor buzzer 002.",
      breach: "Front shared entrance (intercom — force if no response). Rear courtyard accessible via alley off Schelmseweg — seal to prevent flight.",
      flightRisk: "Rear courtyard exit to Schelmseweg. Ground-floor window faces courtyard. Position one officer at alley mouth before breach.",
      visibility: "Suspect can observe Kronenburgsingel from front window. Do not approach in marked vehicles. Approach from east on foot.",
      staging: "Kronenburgpark — parking area 80m south. Non-marked vehicles only.",
      notes: "Residential block has 3 other apartments. Minimise noise. Advise neighbours via intercom AFTER suspect is secured. No children registered at this address.",
      satFeatures: ["4-storey residential block", "Shared front entrance with intercom", "Rear courtyard — flight risk", "Street-level windows with sightlines to approach road", "Kronenburgpark staging area 80m S"],
    },
    {
      id: 2,
      team: "TEAM BRAVO",
      label: "BUSINESS",
      address: "Westervoortsedijk 73 Unit 14, 6827 AT Arnhem",
      type: "Industrial warehouse unit — Lorentz Bedrijvenpark",
      suspect: "SVEN HOUBEN",
      coords: "51.9972° N, 5.9281° E",
      approach: "Stage at Lorentz 3 carpark (150m NW). Approach via service road on north side — avoids CCTV camera facing main access road. Disable or obscure CCTV before final 30m advance. Radio silence from T-2 minutes.",
      breach: "Main roller door (hydraulic — use ram or request opener unit). Personnel side door (east face) — pick or ram. Both teams enter simultaneously.",
      flightRisk: "Rear access road along the IJssel riverbank. River immediately behind the estate — no bridge within 300m. A unit in a vehicle must be pre-positioned on Westervoortsedijk south to cut off vehicle escape.",
      visibility: "CCTV camera on access road gives 60m early warning. Suspect may hear vehicles from inside. Approach on foot from staging. Confirm roller doors closed before breach — open doors indicate suspect is mobile.",
      staging: "Lorentz 3 carpark, Westervoortsedijk 55 (150m NW). Out of CCTV view. 3 vehicles max.",
      notes: "Adjacent units 13 and 15 occupied by legitimate businesses (metalworks, logistics). They close at 17:30. Confirm unit 14 only for breach. Heavy goods vehicles may be parked in yard — cover.",
      satFeatures: ["Industrial unit with 2 roller doors + side personnel door", "External CCTV on access road (60m range)", "Rear riverbank — IJssel — vehicle flight route south", "Adjacent occupied units 13 & 15", "Lorentz 3 staging carpark 150m NW"],
    },
  ],
};

const TABS = ["MISSION BRIEF", "SUSPECTS", "LOCATIONS", "SURVEILLANCE"];

const C = {
  bg: "#080b10", surface: "#0d1118", surface2: "#111820",
  border: "#1c2535", borderFaint: "#151e2c",
  text: "#b8c8d8", muted: "#5a7088", faint: "#2a3a4a",
  accent: "#1a6abf", accentBright: "#2a88f0", accentDim: "rgba(26,106,191,0.14)",
  red: "#c03020", redDim: "rgba(192,48,32,0.14)",
  amber: "#b07018", amberDim: "rgba(176,112,24,0.12)",
  green: "#1a7040", greenDim: "rgba(26,112,64,0.14)",
  font: "'Barlow Condensed', sans-serif",
  mono: "'Share Tech Mono', monospace",
};

const WarehouseArt = () => (
  <svg width="100%" height="170" viewBox="0 0 700 170" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
    <rect width="700" height="170" fill="#060910" />
    {/* Ground */}
    <rect y="130" width="700" height="40" fill="#08090c" />
    {/* Road */}
    <rect x="0" y="120" width="700" height="12" fill="#0b0d12" />
    <rect x="280" y="123" width="40" height="3" fill="#151820" rx="1" />
    <rect x="370" y="123" width="40" height="3" fill="#151820" rx="1" />
    {/* Warehouse building */}
    <rect x="60" y="35" width="380" height="95" fill="#0c1018" stroke="#161e28" strokeWidth="1" />
    {/* Roof triangle */}
    <polygon points="50,35 440,35 440,20 250,5 60,20" fill="#0f141c" stroke="#161e28" strokeWidth="1" />
    {/* Roller doors */}
    <rect x="90" y="75" width="90" height="55" fill="#080c14" stroke="#1a2535" strokeWidth="1" />
    <line x1="90" y1="90" x2="180" y2="90" stroke="#141c28" strokeWidth="1" />
    <line x1="90" y1="105" x2="180" y2="105" strokeWidth="1" stroke="#141c28" />
    <line x1="90" y1="119" x2="180" y2="119" strokeWidth="1" stroke="#141c28" />
    <rect x="220" y="75" width="90" height="55" fill="#080c14" stroke="#1a2535" strokeWidth="1" />
    <line x1="220" y1="90" x2="310" y2="90" stroke="#141c28" strokeWidth="1" />
    <line x1="220" y1="105" x2="310" y2="105" strokeWidth="1" stroke="#141c28" />
    <line x1="220" y1="119" x2="310" y2="119" strokeWidth="1" stroke="#141c28" />
    {/* Personnel door */}
    <rect x="360" y="95" width="32" height="35" fill="#09111a" stroke="#1a2a3a" strokeWidth="1" />
    <circle cx="388" cy="113" r="2" fill="#1a3050" />
    {/* CCTV camera */}
    <rect x="430" y="42" width="14" height="8" fill="#0d1820" stroke="#1a2a3a" strokeWidth="1" rx="2" />
    <line x1="444" y1="46" x2="460" y2="52" stroke="#1a2a3a" strokeWidth="1" />
    {/* CCTV cone */}
    <polygon points="444,44 444,50 530,70 530,30" fill="#1a6abf" opacity="0.04" />
    <line x1="460" y1="30" x2="530" y2="10" stroke="#1a6abf" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3,4" />
    <text x="450" y="25" fill="#1a4a7a" fontFamily="monospace" fontSize="7" letterSpacing="1">CCTV 60M RANGE</text>
    {/* River */}
    <path d="M480 130 Q530 115 580 125 Q630 135 680 120 L680 170 L480 170Z" fill="#0a1018" opacity="0.8" />
    <path d="M480 140 Q530 128 580 136" stroke="#121c28" strokeWidth="1" fill="none" />
    <text x="530" y="158" fill="#10182a" fontFamily="monospace" fontSize="8" letterSpacing="2">RIVIER DE IJSSEL</text>
    {/* Unit label */}
    <text x="200" y="58" textAnchor="middle" fill="#1a3a5a" fontFamily="monospace" fontSize="9" letterSpacing="2">UNIT 14 — WESTERVOORTSEDIJK 73</text>
    {/* VW Transporter */}
    <rect x="95" y="112" width="44" height="18" fill="#0c1820" stroke="#1a2a3a" strokeWidth="1" rx="1" />
    <rect x="108" y="115" width="18" height="7" fill="#0a1420" rx="1" />
    <text x="117" y="135" textAnchor="middle" fill="#1a3a5a" fontFamily="monospace" fontSize="6">GH-214-R</text>
    {/* Staging arrow */}
    <line x1="30" y1="40" x2="60" y2="60" stroke="#1a6abf" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="4,3" />
    <text x="5" y="38" fill="#1a4a7a" fontFamily="monospace" fontSize="7">STAGING →</text>
    {/* Scanline overlay */}
    {Array.from({ length: 43 }).map((_, i) => (
      <line key={i} x1="0" y1={i * 4} x2="700" y2={i * 4} stroke="#000" strokeWidth="0.8" strokeOpacity="0.18" />
    ))}
    {/* Corners */}
    <path d="M2 2 L2 12 M2 2 L12 2" stroke="#1a2535" strokeWidth="1" fill="none" />
    <path d="M698 2 L698 12 M698 2 L688 2" stroke="#1a2535" strokeWidth="1" fill="none" />
    <path d="M2 168 L2 158 M2 168 L12 168" stroke="#1a2535" strokeWidth="1" fill="none" />
    <path d="M698 168 L698 158 M698 168 L688 168" stroke="#1a2535" strokeWidth="1" fill="none" />
    <text x="12" y="163" fill="#1a2535" fontFamily="monospace" fontSize="8" letterSpacing="1.5">LORENTZ BEDRIJVENPARK — ARNHEM-NOORD — SATELLITE RECONSTRUCTION</text>
    <text x="610" y="163" fill="#1a2535" fontFamily="monospace" fontSize="8">04.04 · 19:00</text>
    <circle cx="685" cy="10" r="3" fill="#c03020" opacity="0.6" />
    <text x="672" y="8" textAnchor="end" fill="#501808" fontFamily="monospace" fontSize="7">● REC</text>
  </svg>
);

const ResidentialArt = () => (
  <svg width="100%" height="170" viewBox="0 0 700 170" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
    <rect width="700" height="170" fill="#060910" />
    <rect y="130" width="700" height="40" fill="#08090c" />
    <rect x="0" y="118" width="700" height="14" fill="#0b0d12" />
    {/* Apartment block */}
    <rect x="150" y="20" width="260" height="110" fill="#0c1018" stroke="#161e28" strokeWidth="1" />
    {/* Floor lines */}
    <line x1="150" y1="48" x2="410" y2="48" stroke="#121820" strokeWidth="1" />
    <line x1="150" y1="76" x2="410" y2="76" stroke="#121820" strokeWidth="1" />
    <line x1="150" y1="104" x2="410" y2="104" strokeWidth="1" stroke="#121820" />
    {/* Windows per floor */}
    {[28, 56, 84].map((y, fi) =>
      [175, 225, 290, 340].map((x, wi) => (
        <rect key={`${fi}-${wi}`} x={x} y={y} width="28" height="14" fill={fi === 2 && wi === 3 ? "#0d1e30" : "#080c14"}
          stroke="#141c28" strokeWidth="1" />
      ))
    )}
    {/* Ground floor: shared entrance + target unit */}
    <rect x="240" y="108" width="40" height="22" fill="#09111a" stroke="#1a2a3a" strokeWidth="1" />
    <circle cx="258" cy="122" r="2" fill="#1a3050" />
    <text x="258" y="136" textAnchor="middle" fill="#1a3a5a" fontFamily="monospace" fontSize="6">ENTRANCE</text>
    {/* Target unit rear */}
    <rect x="360" y="108" width="38" height="22" fill="#0d1a2a" stroke="#1a4060" strokeWidth="1" />
    <text x="379" y="136" textAnchor="middle" fill="#1a5a8a" fontFamily="monospace" fontSize="6">UNIT 002</text>
    {/* Courtyard */}
    <rect x="410" y="60" width="80" height="70" fill="#090d14" stroke="#141e2a" strokeWidth="1" strokeDasharray="3,3" />
    <text x="450" y="98" textAnchor="middle" fill="#1a2a3a" fontFamily="monospace" fontSize="7">COURTYARD</text>
    {/* Alley exit */}
    <line x1="490" y1="130" x2="560" y2="145" stroke="#c03020" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="4,3" />
    <text x="540" y="140" fill="#5a1808" fontFamily="monospace" fontSize="7">ALLEY EXIT ↗</text>
    {/* Park staging */}
    <rect x="30" y="90" width="80" height="40" fill="#0a100a" stroke="#141e14" strokeWidth="1" strokeDasharray="3,3" />
    <text x="70" y="105" textAnchor="middle" fill="#1a3a1a" fontFamily="monospace" fontSize="7">KRONENBURG</text>
    <text x="70" y="116" textAnchor="middle" fill="#1a3a1a" fontFamily="monospace" fontSize="7">PARK</text>
    <text x="70" y="127" textAnchor="middle" fill="#103010" fontFamily="monospace" fontSize="7">STAGING</text>
    {/* Approach arrow */}
    <line x1="130" y1="124" x2="152" y2="124" stroke="#1a6abf" strokeOpacity="0.4" strokeWidth="1" />
    <polygon points="152,121 152,127 158,124" fill="#1a6abf" opacity="0.4" />
    <text x="95" y="121" fill="#1a3a6a" fontFamily="monospace" fontSize="7">ON FOOT →</text>
    {/* BMW */}
    <rect x="155" y="121" width="38" height="14" fill="#0c1820" stroke="#1a2a3a" strokeWidth="1" rx="1" />
    <text x="174" y="131" textAnchor="middle" fill="#1a3a5a" fontFamily="monospace" fontSize="5.5">ZN-486-H</text>
    {/* Scanlines */}
    {Array.from({ length: 43 }).map((_, i) => (
      <line key={i} x1="0" y1={i * 4} x2="700" y2={i * 4} stroke="#000" strokeWidth="0.8" strokeOpacity="0.18" />
    ))}
    <path d="M2 2 L2 12 M2 2 L12 2" stroke="#1a2535" strokeWidth="1" fill="none" />
    <path d="M698 2 L698 12 M698 2 L688 2" stroke="#1a2535" strokeWidth="1" fill="none" />
    <path d="M2 168 L2 158 M2 168 L12 168" stroke="#1a2535" strokeWidth="1" fill="none" />
    <path d="M698 168 L698 158 M698 168 L688 168" stroke="#1a2535" strokeWidth="1" fill="none" />
    <text x="12" y="163" fill="#1a2535" fontFamily="monospace" fontSize="8" letterSpacing="1.5">KRONENBURGSINGEL 2 — ARNHEM — SATELLITE RECONSTRUCTION</text>
    <text x="610" y="163" fill="#1a2535" fontFamily="monospace" fontSize="8">04.04 · 19:00</text>
    <circle cx="685" cy="10" r="3" fill="#c03020" opacity="0.6" />
    <text x="672" y="8" textAnchor="end" fill="#501808" fontFamily="monospace" fontSize="7">● REC</text>
  </svg>
);

export default function BriefingTablet() {
  const [activeTab, setActiveTab] = useState("MISSION BRIEF");
  const [activeLoc, setActiveLoc] = useState(0);
  const [objectives, setObjectives] = useState(MISSION.objectives.map(o => ({ ...o, done: false })));

  const toggle = (id) => setObjectives(prev => prev.map(o => o.id === id ? { ...o, done: !o.done } : o));
  const done = objectives.filter(o => o.done).length;

  const threatColor = { HIGH: C.red, MEDIUM: C.amber, LOW: C.green };
  const threatDim   = { HIGH: C.redDim, MEDIUM: C.amberDim, LOW: C.greenDim };

  const loc = MISSION.locations[activeLoc];

  return (
    <div style={{ fontFamily: C.font, background: C.bg, color: C.text, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .t-tab { transition: color .15s, border-color .15s, background .15s; }
        .t-tab:hover { color: #8aa8c8 !important; }
        .t-card { transition: border-color .15s; }
        .t-card:hover { border-color: #222e3e !important; }
        .t-scroll { overflow-y: auto; scrollbar-width: thin; scrollbar-color: #1a2535 transparent; }
        .t-scroll::-webkit-scrollbar { width: 3px; }
        .t-scroll::-webkit-scrollbar-thumb { background: #1a2535; }
        .t-obj:hover .t-box { border-color: #3a5070 !important; }
        .loc-btn { transition: all .15s; cursor: pointer; }
        .loc-btn:hover { border-color: #2a4060 !important; }
      `}</style>

      {/* HEADER */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 24px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 3, color: "#d0dce8", textTransform: "uppercase", lineHeight: 1 }}>{MISSION.name}</div>
            <div style={{ fontFamily: C.mono, fontSize: 11, color: C.muted, letterSpacing: 1.5, marginTop: 4 }}>{MISSION.subtitle}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: C.mono, fontSize: 11, color: "#5a8aaa", letterSpacing: 1 }}>NARCOTICS ENTRY</div>
            <div style={{ fontFamily: C.mono, fontSize: 10, color: C.muted, marginTop: 2 }}>{MISSION.date}</div>
            <div style={{ fontFamily: C.mono, fontSize: 10, color: "#2a4a6a", marginTop: 2 }}>2 LOCATIONS · SIMULTANEOUS</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          {TABS.map(tab => (
            <button key={tab} className="t-tab" onClick={() => setActiveTab(tab)} style={{
              fontFamily: C.font, fontSize: 13, fontWeight: 600, letterSpacing: 2,
              padding: "7px 16px", background: activeTab === tab ? C.accentDim : "transparent",
              border: "none", borderBottom: `2px solid ${activeTab === tab ? C.accentBright : "transparent"}`,
              color: activeTab === tab ? "#d0dce8" : C.muted, cursor: "pointer", textTransform: "uppercase",
            }}>{tab}</button>
          ))}
        </div>
      </div>

      {/* BODY */}
      <div style={{ display: "flex", minHeight: "calc(100vh - 108px)" }}>

        {/* LEFT MAIN */}
        <div className="t-scroll" style={{ flex: 1, padding: "20px 24px", borderRight: `1px solid ${C.border}` }}>

          {/* ── MISSION BRIEF ── */}
          {activeTab === "MISSION BRIEF" && (
            <div>
              {/* dual location mini-map placeholder */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
                {[
                  { label: "ALPHA — RESIDENTIAL", addr: "Kronenburgsingel 2, Arnhem", team: "TEAM ALPHA", color: C.accent },
                  { label: "BRAVO — WAREHOUSE", addr: "Westervoortsedijk 73, Arnhem", team: "TEAM BRAVO", color: C.red },
                ].map(l => (
                  <div key={l.label} style={{ background: C.surface, border: `1px solid ${C.border}`, padding: "10px 14px" }}>
                    <div style={{ fontFamily: C.mono, fontSize: 9, letterSpacing: 2, color: l.color, marginBottom: 4 }}>{l.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#b0c4d8" }}>{l.addr}</div>
                    <div style={{ fontFamily: C.mono, fontSize: 9, color: C.faint, marginTop: 4, letterSpacing: 1 }}>{l.team} · H-HOUR 19:00</div>
                  </div>
                ))}
              </div>
              {/* Divider */}
              <div style={{ height: 1, background: `linear-gradient(to right, ${C.accent}, transparent)`, marginBottom: 18, opacity: 0.4 }} />
              <div style={{ fontFamily: C.mono, fontSize: 10, letterSpacing: 2, color: C.muted, marginBottom: 12 }}>OPERATIONAL BRIEFING — INCIDENT COMMANDER</div>
              {MISSION.briefing.map((p, i) => (
                <p key={i} style={{ fontFamily: C.mono, fontSize: 11, lineHeight: 1.9, color: "#6a8098", marginBottom: 16 }}>{p}</p>
              ))}
            </div>
          )}

          {/* ── SUSPECTS ── */}
          {activeTab === "SUSPECTS" && MISSION.suspects.map(s => (
            <div key={s.id} className="t-card" style={{ background: C.surface, border: `1px solid ${C.borderFaint}`, marginBottom: 16, padding: 16, position: "relative" }}>
              <div style={{ position: "absolute", top: 12, right: 12, display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-end" }}>
                <div style={{ fontFamily: C.font, fontSize: 11, fontWeight: 700, letterSpacing: 2, padding: "2px 8px", color: threatColor[s.threat], border: `1px solid ${threatColor[s.threat]}`, background: threatDim[s.threat] }}>
                  THREAT: {s.threat}
                </div>
                <div style={{ fontFamily: C.mono, fontSize: 9, letterSpacing: 1.5, padding: "2px 7px", color: s.armed ? C.red : C.green, border: `1px solid ${s.armed ? C.red : C.green}`, background: s.armed ? C.redDim : C.greenDim }}>
                  {s.armed ? "ARMED — CONFIRMED" : "ARMED — UNCONFIRMED"}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                <div style={{ width: 50, height: 50, background: C.surface2, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: C.mono, fontSize: 14, color: C.muted, flexShrink: 0 }}>{s.initials}</div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 2, color: "#d0dce8", textTransform: "uppercase" }}>{s.name}</div>
                  <div style={{ fontFamily: C.mono, fontSize: 11, color: C.faint }}>AKA "{s.alias}" · AGE {s.age}</div>
                  <div style={{ fontFamily: C.mono, fontSize: 9, color: C.accent, letterSpacing: 1, marginTop: 3 }}>{s.location}</div>
                </div>
              </div>
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontFamily: C.mono, fontSize: 10, color: C.faint, letterSpacing: 1, marginBottom: 2 }}>ASSOCIATED VEHICLE</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#8aaac8", letterSpacing: 1 }}>{s.vehicle}</div>
              </div>
              <p style={{ fontFamily: C.mono, fontSize: 11, color: "#5a7890", lineHeight: 1.7, marginBottom: 12 }}>{s.desc}</p>
              <div style={{ fontFamily: C.font, fontSize: 11, fontWeight: 700, letterSpacing: 2, color: C.faint, marginBottom: 6, textTransform: "uppercase" }}>Prior Offenses</div>
              {s.priors.map(p => (
                <div key={p} style={{ fontFamily: C.mono, fontSize: 10, color: C.faint, padding: "2px 0 2px 10px", borderLeft: `2px solid ${C.borderFaint}`, marginBottom: 3 }}>{p}</div>
              ))}
              {s.armed && (
                <div style={{ fontFamily: C.font, fontSize: 12, fontWeight: 700, letterSpacing: 2, color: C.red, marginTop: 12 }}>⚠ CONSIDER ARMED — APPROACH WITH EXTREME CAUTION</div>
              )}
            </div>
          ))}

          {/* ── LOCATIONS ── */}
          {activeTab === "LOCATIONS" && (
            <div>
              {/* Location selector */}
              <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
                {MISSION.locations.map((l, i) => (
                  <button key={l.id} className="loc-btn" onClick={() => setActiveLoc(i)} style={{
                    fontFamily: C.font, fontSize: 13, fontWeight: 700, letterSpacing: 2,
                    padding: "8px 20px", background: activeLoc === i ? C.accentDim : "transparent",
                    border: `1px solid ${activeLoc === i ? C.accentBright : C.border}`,
                    color: activeLoc === i ? "#d0dce8" : C.muted, textTransform: "uppercase",
                  }}>
                    {l.team}<br />
                    <span style={{ fontFamily: C.mono, fontSize: 9, letterSpacing: 1 }}>{l.label}</span>
                  </button>
                ))}
              </div>

              {/* Satellite art */}
              {activeLoc === 0 ? <ResidentialArt /> : <WarehouseArt />}

              {/* Address bar */}
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderTop: "none", padding: "8px 14px", display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
                <span style={{ fontFamily: C.mono, fontSize: 10, color: C.accent, letterSpacing: 1 }}>{loc.address}</span>
                <span style={{ fontFamily: C.mono, fontSize: 10, color: C.faint }}>{loc.coords}</span>
              </div>

              {/* Detail cards */}
              {[
                { icon: "→", label: "APPROACH ROUTE", value: loc.approach, color: C.accent },
                { icon: "⬛", label: "BREACH POINT(S)", value: loc.breach, color: C.amber },
                { icon: "⚠", label: "FLIGHT RISK ROUTES", value: loc.flightRisk, color: C.red },
                { icon: "👁", label: "SUSPECT VISIBILITY", value: loc.visibility, color: C.amber },
                { icon: "◈", label: "STAGING AREA", value: loc.staging, color: C.green },
                { icon: "ℹ", label: "NOTES", value: loc.notes, color: C.muted },
              ].map(card => (
                <div key={card.label} className="t-card" style={{ background: C.surface, border: `1px solid ${C.borderFaint}`, marginBottom: 10, padding: "12px 14px" }}>
                  <div style={{ fontFamily: C.mono, fontSize: 9, letterSpacing: 2, color: card.color, marginBottom: 6 }}>{card.icon} {card.label}</div>
                  <p style={{ fontFamily: C.mono, fontSize: 11, color: "#6a8098", lineHeight: 1.75 }}>{card.value}</p>
                </div>
              ))}

              {/* Satellite features */}
              <div style={{ background: C.surface, border: `1px solid ${C.borderFaint}`, padding: "12px 14px", marginBottom: 10 }}>
                <div style={{ fontFamily: C.mono, fontSize: 9, letterSpacing: 2, color: C.accent, marginBottom: 8 }}>◉ SATELLITE-IDENTIFIED FEATURES</div>
                {loc.satFeatures.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 5 }}>
                    <span style={{ color: C.accentBright, fontSize: 9, marginTop: 2, flexShrink: 0 }}>▸</span>
                    <span style={{ fontFamily: C.mono, fontSize: 10, color: C.text, lineHeight: 1.6 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── SURVEILLANCE ── */}
          {activeTab === "SURVEILLANCE" && (
            <div>
              <div style={{ fontSize: 13, letterSpacing: 2, color: C.muted, marginBottom: 6, textTransform: "uppercase" }}>Surveillance assets — Operation Atlas</div>
              <div style={{ fontFamily: C.mono, fontSize: 10, color: C.faint, marginBottom: 16 }}>All feeds routed to TOC. Visual confirmation required before H-HOUR.</div>
              {["ALPHA — RESIDENTIAL — FRONT APPROACH", "ALPHA — REAR COURTYARD", "ALPHA — UNIT 002 ENTRANCE", "BRAVO — ACCESS ROAD CCTV (INTERCEPTED)", "BRAVO — WAREHOUSE EXTERIOR", "BRAVO — VEHICLE YARD", "VEHICLE TRACK — ZN-486-H", "VEHICLE TRACK — GH-214-R"].map(label => (
                <div key={label} style={{ background: C.surface, border: `1px solid ${C.borderFaint}`, aspectRatio: "16/6", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", marginBottom: 10 }}>
                  <div style={{ fontFamily: C.mono, fontSize: 10, color: "#1a2535", letterSpacing: 2, marginBottom: 5 }}>[NO LIVE FEED]</div>
                  <div style={{ fontFamily: C.mono, fontSize: 9, color: "#1a2535", letterSpacing: 1 }}>{label}</div>
                  <div style={{ position: "absolute", top: 6, left: 8, fontFamily: C.mono, fontSize: 8, color: "#2a2a18" }}>● REC</div>
                  <div style={{ position: "absolute", bottom: 6, right: 8, fontFamily: C.mono, fontSize: 8, color: "#1a2535" }}>04.04 · 19:00:00</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT — Objectives */}
        <div className="t-scroll" style={{ width: 278, padding: "18px 16px", background: "#0a0e14", flexShrink: 0 }}>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: 3, color: "#d0dce8", textTransform: "uppercase", marginBottom: 8 }}>Objectives</div>
          <div style={{ height: 1, background: `linear-gradient(to right, ${C.accentBright}, transparent)`, marginBottom: 12 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, background: C.accent, color: "#fff", padding: "3px 10px", textTransform: "uppercase" }}>Narcotics Entry</div>
            <div style={{ fontFamily: C.mono, fontSize: 10, color: C.faint }}>{done}/{objectives.length}</div>
          </div>
          <div style={{ height: 2, background: C.surface2, marginBottom: 16 }}>
            <div style={{ height: "100%", width: `${(done / objectives.length) * 100}%`, background: C.accentBright, transition: "width 0.3s" }} />
          </div>

          {objectives.map(obj => (
            <div key={obj.id} className="t-obj" onClick={() => toggle(obj.id)}
              style={{ marginBottom: 14, paddingBottom: 14, borderBottom: `1px solid ${C.borderFaint}`, cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div className="t-box" style={{
                  width: 15, height: 15, border: `1.5px solid ${obj.done ? C.accentBright : "#2a3a4a"}`,
                  background: obj.done ? C.accentDim : "transparent", flexShrink: 0, marginTop: 3,
                  display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s",
                }}>
                  {obj.done && <span style={{ color: C.accentBright, fontSize: 9, fontWeight: "bold", lineHeight: 1 }}>✓</span>}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: obj.done ? C.faint : "#c0d0e0", letterSpacing: 0.5, textDecoration: obj.done ? "line-through" : "none", textDecorationColor: C.accentBright }}>
                    {obj.title}
                  </div>
                  <div style={{ fontFamily: C.mono, fontSize: 10, color: C.faint, marginTop: 3, lineHeight: 1.5 }}>{obj.desc}</div>
                </div>
              </div>
            </div>
          ))}

          <div style={{ height: 1, background: C.borderFaint, marginBottom: 12 }} />
          <div style={{ fontFamily: C.mono, fontSize: 10, color: C.faint, lineHeight: 2 }}>
            {[
              ["TYPE", "NARCOTICS ENTRY"],
              ["DATE", "04 APR 2025"],
              ["H-HOUR", "19:00"],
              ["LOCATIONS", "2 SIMULTANEOUS"],
              ["SUSPECTS", "2 CONFIRMED"],
              ["TEAMS", "ALPHA + BRAVO"],
              ["STATUS", "BRIEFING"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{k}:</span><span style={{ color: "#3a5068" }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Warning box */}
          <div style={{ marginTop: 18, background: C.redDim, border: `1px solid ${C.red}`, padding: "10px 12px" }}>
            <div style={{ fontFamily: C.font, fontSize: 11, fontWeight: 700, letterSpacing: 2, color: C.red, marginBottom: 4 }}>⚠ ARMED SUSPECT</div>
            <div style={{ fontFamily: C.mono, fontSize: 9, color: "#8a4030", lineHeight: 1.6 }}>SVEN HOUBEN — prior firearm arrest. TEAM BRAVO: treat as armed until secured and searched.</div>
          </div>

          <div style={{ marginTop: 10, background: C.accentDim, border: `1px solid ${C.accent}`, padding: "10px 12px" }}>
            <div style={{ fontFamily: C.font, fontSize: 11, fontWeight: 700, letterSpacing: 2, color: C.accentBright, marginBottom: 4 }}>RADIO</div>
            <div style={{ fontFamily: C.mono, fontSize: 9, color: "#3a6080", lineHeight: 1.6 }}>SILENCE from T-2 min on approach. Confirm "GROEN" when in position. IC broadcasts H-HOUR. Both teams breach on IC mark.</div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: "#08090e", borderTop: `1px solid ${C.borderFaint}`, padding: "9px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: C.mono, fontSize: 10, color: C.faint, letterSpacing: 1.5 }}>{MISSION.department}</div>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, background: C.accent, color: "#fff", padding: "3px 12px" }}>{MISSION.classification}</div>
      </div>
    </div>
  );
}
