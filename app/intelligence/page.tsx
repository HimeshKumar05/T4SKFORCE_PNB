"use client";

import { motion } from "framer-motion";
import { 
  ShieldAlert, BrainCircuit, FileText, Target, ShieldCheck, 
  TrendingUp, TrendingDown, Lock, Key, Server, Fingerprint, 
  Award, List, AlertTriangle, Landmark, Workflow, Clock
} from "lucide-react";
import { useScan } from "../../context/ScanContext"; 
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, 
  RadarChart, PolarGrid, PolarAngleAxis, Radar, 
  PieChart, Pie, Cell, BarChart, Bar, YAxis, CartesianGrid, Legend
} from "recharts";

export default function IntelligenceCore() {
  const { layer2Data, isScanning } = useScan();
  const currentPath = usePathname();
  const d = layer2Data as any;

  if (isScanning || !d) return <LoadingState />;

  const cbom = d.cryptographic_bill_of_materials || {};
  const cert = cbom.certificate || {};
  const pqc = d.pqc_migration_recommendations || {};
  const aiInsights = d.ai_risk_insights || {};
  const timeline = d.visualization_data?.pqc_migration_timeline || [];

  // --- ENHANCED CHART DATA MAPPING ---

  // 1. Bigger, Better Radar Chart (Overlapping datasets like the reference)
  const radarData = [
    { subject: 'Protocol', Target: cbom.tls?.version === 'TLSv1.3' ? 90 : 40, Benchmark: 80, fullMark: 100 },
    { subject: 'Key Exchange', Target: (cbom.cipher_inventory?.key_exchange_methods || [])[0]?.includes('ECDHE') ? 70 : 30, Benchmark: 85, fullMark: 100 },
    { subject: 'Encryption', Target: (cbom.cipher_inventory?.encryption_algorithms || [])[0]?.includes('256') ? 85 : 50, Benchmark: 90, fullMark: 100 },
    { subject: 'Hash Strength', Target: cbom.crypto_properties?.legacy_hash_detected ? 20 : 90, Benchmark: 80, fullMark: 100 },
    { subject: 'Fwd Secrecy', Target: cbom.crypto_properties?.forward_secrecy_supported ? 100 : 10, Benchmark: 100, fullMark: 100 },
    { subject: 'PQC Readiness', Target: aiInsights.crypto_agility_score || 20, Benchmark: 75, fullMark: 100 },
  ];

  // 2. Semi-Circle Gauge Data (Agility)
  const agilityScore = aiInsights.crypto_agility_score || 0;
  const gaugeData = [
    { name: 'Score', value: agilityScore, color: agilityScore > 70 ? '#10b981' : agilityScore > 40 ? '#f59e0b' : '#ef4444' },
    { name: 'Remainder', value: 100 - agilityScore, color: '#f1f5f9' }
  ];

  // 3. Mini Sparklines
  const sparklineData = [{ val: 10 }, { val: 25 }, { val: 20 }, { val: 45 }, { val: 30 }, { val: 60 }, { val: 75 }];
  const cipherBarData = [
    { name: 'Strong', count: cbom.cipher_inventory?.total_ciphers - (cbom.cipher_inventory?.weak_cipher_count || 0) },
    { name: 'Weak', count: cbom.cipher_inventory?.weak_cipher_count || 0 },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-16 font-sans">
      
      {/* WHITE NAV BAR */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2.5">
              <div className="bg-blue-600 p-1.5 rounded shadow-sm"><BrainCircuit className="w-5 h-5 text-white" /></div>
              <span className="font-black text-slate-800 tracking-tight text-xl">T4SKFORCE</span>
            </div>
            <div className="hidden md:flex items-center gap-1 text-[12px] font-bold">
              <Link href="/" className={`${currentPath === '/' ? 'text-blue-700 bg-blue-50' : 'text-slate-500 hover:bg-slate-50'} px-4 py-2 rounded-lg transition-all`}>OVERVIEW</Link>
              {/* THE FIX: Changed to CBOM */}
              <Link href="/intelligence" className={`${currentPath === '/intelligence' ? 'text-blue-700 bg-blue-50' : 'text-slate-500 hover:bg-slate-50'} px-4 py-2 rounded-lg transition-all`}>CBOM</Link>
              <Link href="/telemetry" className={`${currentPath === '/telemetry' ? 'text-blue-700 bg-blue-50' : 'text-slate-500 hover:bg-slate-50'} px-4 py-2 rounded-lg transition-all`}>TELEMETRY</Link>
            </div>
          </div>
          <button onClick={() => window.print()} className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 text-xs font-bold flex items-center gap-2 shadow-sm rounded-lg transition-colors print:hidden">
             <FileText size={16} /> Export PDF
          </button>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-4 md:px-6 mt-6 print:m-0 print:p-0">
        
        {/* NEW CREATIVE PAGE HEADER */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
           <div>
             <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">CBOM</h1>
             <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mt-1">Cryptographic Bill of Materials & Forensic Intel</p>
           </div>
           <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm text-xs font-bold text-slate-500 flex items-center gap-2">
             <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>
             LIVE ANALYSIS ACTIVE
           </div>
        </div>

        {/* 4-COLUMN MASONRY GRID SYSTEM */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* --- ROW 1: KPIs --- */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] flex flex-col justify-between col-span-1">
            <p className="text-sm font-bold text-slate-600">HNDL Strike Risk</p>
            <h2 className="text-4xl font-black text-slate-800 mt-2">{(aiInsights.hndl_probability || 0) * 100}%</h2>
            <div className="flex items-end justify-between mt-4">
              <span className="flex items-center text-xs font-bold text-rose-500"><TrendingUp className="w-3 h-3 mr-1"/> +12% YoY</span>
              <div className="w-20 h-8">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sparklineData}><Area type="monotone" dataKey="val" stroke="#f43f5e" fill="#ffe4e6" strokeWidth={2} /></AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] flex flex-col justify-between col-span-1">
            <p className="text-sm font-bold text-slate-600">Vulnerable Ciphers</p>
            <h2 className="text-4xl font-black text-slate-800 mt-2">{cbom.cipher_inventory?.weak_cipher_count || 0}</h2>
            <div className="flex items-end justify-between mt-4">
              <span className="flex items-center text-xs font-bold text-emerald-500"><TrendingDown className="w-3 h-3 mr-1"/> -2% YoY</span>
              <div className="w-20 h-8">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cipherBarData}><Bar dataKey="count" fill="#3b82f6" radius={[2, 2, 0, 0]} /></BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] col-span-1 md:col-span-2 flex flex-col justify-between relative overflow-hidden">
             <div className="relative z-10">
               <p className="text-sm font-bold text-slate-600">Target Analyzed</p>
               <h2 className="text-3xl font-black text-blue-700 mt-2">{d.asset_profile?.hostname || "UNKNOWN"}</h2>
               <p className="text-sm font-bold text-slate-500 mt-1">{d.asset_profile?.ip_address}</p>
             </div>
             <div className="absolute right-0 bottom-0 p-4 opacity-5 pointer-events-none"><Server size={100} /></div>
          </div>

          {/* --- ROW 2: RADAR, GAUGE, UPGRADE PATH --- */}
          
          {/* BIGGER RADAR CHART */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] col-span-1 md:col-span-2 flex flex-col">
             <h3 className="text-sm font-bold text-slate-800 mb-2">Threat Vector Profile</h3>
             <div className="flex-1 w-full min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} />
                    <Radar name="Target Security" dataKey="Target" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
                    <Radar name="Industry Benchmark" dataKey="Benchmark" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}/>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  </RadarChart>
                </ResponsiveContainer>
             </div>
          </div>

          {/* SEMI-CIRCLE GAUGE */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] col-span-1 flex flex-col items-center">
             <h3 className="text-sm font-bold text-slate-800 mb-4 w-full text-left">Crypto Agility Rating</h3>
             <div className="relative w-full h-[180px] flex items-center justify-center mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={gaugeData} cx="50%" cy="100%" startAngle={180} endAngle={0} innerRadius={70} outerRadius={100} dataKey="value" stroke="none" cornerRadius={5}>
                      {gaugeData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute bottom-0 flex flex-col items-center">
                   <p className="text-4xl font-black text-slate-800">{agilityScore}</p>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Score</p>
                </div>
             </div>
             <div className="w-full mt-auto pt-4 border-t border-slate-100 flex justify-between text-[10px] font-bold text-slate-500 uppercase">
               <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-rose-500"/> Critical</span>
               <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"/> Mod</span>
               <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"/> Agile</span>
             </div>
          </div>

          {/* UPGRADE PATH */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] col-span-1 flex flex-col">
             <h3 className="text-sm font-bold text-slate-800 mb-4 flex justify-between items-center">Algorithm Strategy <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-[10px] uppercase tracking-widest">PQC</span></h3>
             <div className="space-y-4 flex-1">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                   <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0"><Key className="w-4 h-4 text-blue-600"/></div>
                   <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase">Key Exchange</p>
                      <p className="text-xs font-bold text-slate-900">{pqc.recommended_algorithms?.key_exchange || "ML-KEM"}</p>
                   </div>
                </div>
                <div className="flex items-center gap-3 pb-2">
                   <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0"><Lock className="w-4 h-4 text-emerald-600"/></div>
                   <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase">Signature</p>
                      <p className="text-xs font-bold text-slate-900">{pqc.recommended_algorithms?.signature || "ML-DSA"}</p>
                   </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg mt-auto border border-slate-100">
                   <p className="text-[10px] font-bold text-slate-600 leading-relaxed">{pqc.strategy || "Execute hybrid architecture phaseout."}</p>
                </div>
             </div>
          </div>

          {/* --- ROW 3: ALL MISSING JSON DATA WEAVED IN --- */}

          {/* Active Infrastructure (TLS & Inventory) */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] col-span-1 md:col-span-2 flex flex-col">
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2"><Fingerprint className="w-4 h-4 text-blue-500"/> Active Infrastructure Ledger</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
               <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protocol & Ver</p>
                  <p className="text-sm font-bold text-slate-900">{cbom.tls?.protocol} {cbom.tls?.version}</p>
               </div>
               <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Suites Supported</p>
                  <p className="text-sm font-bold text-slate-900">{cbom.tls?.supported_cipher_count || cbom.cipher_inventory?.total_ciphers || 0} Vectors</p>
               </div>
               <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Encryption & Hash</p>
                  <p className="text-xs font-bold text-slate-900">{(cbom.cipher_inventory?.encryption_algorithms || [])[0]} / {(cbom.cipher_inventory?.hash_algorithms || [])[0]}</p>
               </div>
               <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Weak Ciphers Active</p>
                  <p className="text-xs font-bold text-rose-600">{(cbom.cipher_inventory?.weak_ciphers || []).join(', ') || "None Detected"}</p>
               </div>
            </div>
            <div className="mt-auto bg-slate-900 p-3 rounded-lg">
               <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Negotiated Cipher Path</p>
               <p className="text-xs font-mono font-bold text-slate-100 break-all">{cbom.tls?.negotiated_cipher || "N/A"}</p>
            </div>
          </div>

          {/* X.509 Certificate */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] col-span-1 md:col-span-2 flex flex-col">
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2"><Award className="w-4 h-4 text-blue-500"/> X.509 Certificate Identity</h3>
            <div className="grid grid-cols-2 gap-4 h-full">
               <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg flex flex-col justify-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Subject / Domain</p>
                  <p className="text-xs font-bold text-slate-800 truncate" title={cert.subject}>{cert.subject?.split('CN=')[1] || cert.subject || "N/A"}</p>
               </div>
               <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg flex flex-col justify-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Issuing Authority</p>
                  <p className="text-xs font-bold text-slate-800 truncate" title={cert.issuer}>{cert.issuer?.split('O=')[1]?.split(',')[0] || cert.issuer || "N/A"}</p>
               </div>
               <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg flex flex-col justify-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Signature Algorithm</p>
                  <p className="text-xs font-bold text-slate-800">{cert.signature_algorithm} <span className="text-blue-600">({cert.key_size} bit)</span></p>
               </div>
               <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg flex flex-col justify-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Validity Window</p>
                  <p className="text-xs font-bold text-slate-800">{cert.validity_days} Days <span className="text-emerald-500 ml-1">Active</span></p>
               </div>
            </div>
          </div>

          {/* --- ROW 4: THREAT MODEL & COMPLIANCE --- */}
          
          {/* Threat Pathology */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] col-span-1 md:col-span-3 flex flex-col">
             <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2"><List className="w-4 h-4 text-rose-500"/> Neural Threat Pathology</h3>
             <div className="space-y-2 overflow-y-auto max-h-[160px] pr-2">
                 {(d.quantum_risk_analysis?.quantum_threat_model?.quantum_threat_analysis || []).map((t: any, i: number) => (
                    <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center bg-slate-50 border border-slate-100 p-3 rounded-lg">
                       <p className="text-[10px] font-bold text-rose-600 bg-white border border-rose-100 px-2 py-1 rounded sm:w-48 flex-shrink-0 uppercase tracking-widest truncate" title={t.algorithm}>{t.algorithm}</p>
                       <p className="text-xs font-semibold text-slate-700">"{t.quantum_vulnerability_reason}"</p>
                    </div>
                 ))}
                 {!(d.quantum_risk_analysis?.quantum_threat_model?.quantum_threat_analysis?.length) && <p className="text-xs text-slate-500">No specific threat models generated.</p>}
              </div>
          </div>

          {/* Compliance */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] col-span-1 flex flex-col">
             <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2"><Landmark className="w-4 h-4 text-blue-500"/> Regulatory Impact</h3>
             <div className="flex flex-wrap gap-2 mb-4">
                 {(aiInsights?.banking_compliance_context?.compliance_frameworks || []).map((fw: string, i: number) => (
                    <span key={i} className="bg-slate-50 border border-slate-200 text-slate-700 text-[10px] font-bold px-2 py-1.5 rounded uppercase">{fw}</span>
                 ))}
             </div>
             <p className="text-[10px] text-slate-500 leading-relaxed mt-auto border-t border-slate-100 pt-3">
               <span className="font-bold text-rose-600 uppercase mr-1">Risk:</span>{aiInsights?.banking_compliance_context?.compliance_impact || "Standard compliance required."}
             </p>
          </div>

          {/* --- ROW 5: CHARTS & VERIFICATION --- */}

          {/* Area Chart */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] col-span-1 md:col-span-2 flex flex-col">
             <div className="flex justify-between items-center mb-6">
               <h3 className="text-sm font-bold text-slate-800">Risk Forecast Timeline</h3>
               <span className="flex items-center gap-1 text-xs font-bold text-slate-500"><div className="w-2 h-2 rounded-full bg-indigo-500"/> Quantum Risk</span>
             </div>
             <div className="w-full h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={d.visualization_data?.quantum_risk_forecast || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Area type="monotone" dataKey="risk" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRisk)" />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>

          {/* Timeline Phases */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] col-span-1 flex flex-col">
             <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2"><Clock className="w-4 h-4 text-blue-500"/> Phased Deployment</h3>
             <div className="relative pl-4 space-y-5 flex-1">
                <div className="absolute top-2 left-0 bottom-2 w-0.5 bg-slate-100" />
                {timeline.map((phase: any, idx: number) => (
                   <div key={idx} className="relative">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white shadow-sm" />
                      <div>
                         <p className="text-[10px] font-bold text-slate-500 uppercase mb-0.5">{phase.start_year} - {phase.end_year}</p>
                         <p className="text-xs font-bold text-slate-800 leading-tight">{phase.phase}</p>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          {/* Certificate SVG */}
          <div className="bg-slate-900 rounded-xl p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.2)] col-span-1 flex flex-col items-center justify-center relative overflow-hidden print:bg-white print:border print:border-slate-200">
             <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:16px_16px] print:hidden" />
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 relative z-10 print:text-slate-500">Security Certification</h3>
             
             {d.quantum_security_certificate?.certificate_svg_base64 ? (
               <div className="w-full max-w-[240px] relative z-10 transition-transform hover:scale-105 duration-500">
                  <img src={`data:image/svg+xml;base64,${d.quantum_security_certificate.certificate_svg_base64}`} alt="Certificate" className="w-full drop-shadow-xl rounded-md print:shadow-none print:border print:border-slate-200"/>
               </div>
             ) : (
               <div className="w-full h-24 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700 relative z-10">
                 <p className="text-xs font-mono text-slate-500">NO CERTIFICATE</p>
               </div>
             )}
             
             <div className="mt-6 z-10 flex items-center gap-2 bg-black/40 border border-slate-700 px-4 py-2 rounded-full print:bg-slate-50 print:border-slate-200">
               <ShieldCheck className="w-3 h-3 text-emerald-500" />
               <p className="text-[9px] text-slate-300 font-mono tracking-widest uppercase print:text-slate-600">ID: <span className="text-white font-bold">{d.quantum_security_certificate?.certificate_verification?.verification_id || "PENDING"}</span></p>
             </div>
          </div>

        </div>

      </main>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-50 font-sans">
        <ShieldAlert size={60} className="text-blue-300 mb-6 animate-pulse" />
        <div className="flex gap-2 text-slate-500 font-bold uppercase text-sm tracking-widest">
            Loading Dashboard
            <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} >.</motion.span>
            <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} >.</motion.span>
            <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} >.</motion.span>
        </div>
    </div>
  );
}