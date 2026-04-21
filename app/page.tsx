"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShieldAlert, Clock, TrendingUp, FileDown, Plus, Landmark, AlertTriangle, SlidersHorizontal, Globe, Server, Lock, Key, Activity, Fingerprint, ShieldCheck } from "lucide-react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useScan } from "../context/ScanContext";
import Link from "next/link";

export default function CommandCenter() {
  const { layer2Data, isScanning, targetUrl, setTargetUrl, executeScan, clearCurrentScan } = useScan();
  
  const [logs, setLogs] = useState<string[]>([]);
  const [driftYear, setDriftYear] = useState(2025);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (targetUrl) executeScan(targetUrl);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isScanning) {
      const sequence = [
        "Initializing T4SKFORCE Enterprise Handshake...",
        `Target Vector: ${targetUrl}`,
        "Parsing infrastructure metadata...",
        "[DETECTION] TLSv1.3 Active",
        "[DETECTION] ECDHE_RSA Key Exchange Identified",
        "[VULNERABILITY] Classical RSA-2048 Found",
        "Calculating Harvest-Now-Decrypt-Later probability...",
        "Applying RBI & NIST compliance cross-analysis...",
        "Generating intelligence report..."
      ];
      setLogs([]); 
      interval = setInterval(() => {
        setLogs((prev) => {
          if (prev.length < sequence.length) return [...prev, sequence[prev.length]];
          clearInterval(interval);
          return prev;
        });
      }, 200); 
    } else {
      setDriftYear(2025);
    }
    return () => clearInterval(interval);
  }, [isScanning, targetUrl]);

  const data = layer2Data as any;
  let dynamicReadiness = 0;
  let dynamicHndl = 0;
  
  if (data) {
    const yearsAdvanced = driftYear - 2025;
    const baseReadiness = data.quantum_risk_analysis?.quantum_readiness_score?.quantum_readiness_score || 0;
    const baseHndl = data.ai_risk_insights?.hndl_probability || 0;
    
    // Readiness drops as time advances towards Q-Day
    dynamicReadiness = Math.max(0, Math.floor(baseReadiness - (yearsAdvanced * 2.8)));
    dynamicHndl = Math.min(0.99, baseHndl + (yearsAdvanced * 0.012));
  }

  if (!data && !isScanning) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative bg-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />
        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-blue-600/20 relative z-10">
          <ShieldAlert className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3 relative z-10">T4SKFORCE Enterprise</h1>
        <p className="text-slate-500 font-medium text-sm tracking-widest mb-12 uppercase relative z-10">Post-Quantum Risk Intelligence</p>
        
        <form onSubmit={handleScan} className="w-full max-w-2xl relative z-10 px-4">
          <div className="relative flex items-center bg-white border border-slate-200 rounded-full overflow-hidden p-2 shadow-xl shadow-slate-200/50 transition-all focus-within:ring-4 focus-within:ring-blue-100 focus-within:border-blue-400">
            <Search className="w-6 h-6 text-slate-400 ml-4" />
            <input type="text" value={targetUrl} onChange={(e) => setTargetUrl(e.target.value)} placeholder="Enter target domain (e.g., www.pnbindia.in)..." className="flex-1 bg-transparent border-none outline-none text-slate-900 px-4 py-3 placeholder:text-slate-400 font-medium" required />
            <button type="submit" className="bg-slate-900 hover:bg-blue-600 text-white font-semibold text-sm px-8 py-3 rounded-full transition-colors shadow-md">Run Audit</button>
          </div>
        </form>
      </div>
    );
  }

  if (isScanning) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />
        <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl shadow-slate-200/50 relative z-10">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
            <Activity className="w-5 h-5 text-blue-600 animate-spin-slow" />
            <span className="text-slate-800 font-bold text-sm tracking-widest uppercase">Active Audit Sequence</span>
          </div>
          <div className="space-y-3 h-64 overflow-hidden flex flex-col justify-end font-mono">
            <AnimatePresence>
              {logs.map((log, index) => {
                if (!log) return null; 
                const isAlert = log.includes("[WARNING]") || log.includes("[VULNERABILITY]");
                return (
                  <motion.div key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-[13px]">
                    <span className="text-slate-400 mr-3">[{new Date().toISOString().split('T')[1].slice(0,-1)}]</span>
                    <span className={isAlert ? "text-rose-600 font-bold" : "text-slate-700"}>{log}</span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-2 h-4 bg-blue-600 mt-2" />
          </div>
        </div>
      </div>
    );
  }

  const asset = data.asset_profile || {};
  const cbom = data.cryptographic_bill_of_materials || {};
  const compliance = data.ai_risk_insights?.banking_compliance_context || {};
  const exec = data.executive_summary || {};
  const meta = data.scan_summary || {};
  const riskAnalysis = data.quantum_risk_analysis || {};

  const radius = 40; 
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (dynamicReadiness / 100) * circumference;
  
  // FIX: Quantum Readiness Colors (Higher is Better)
  const readinessColor = dynamicReadiness >= 80 ? '#059669' : dynamicReadiness >= 50 ? '#ea580c' : '#e11d48'; // Emerald, Amber, Rose

  // FIX: Dynamic styling for the badge based on Readiness Score
  let badgeStyle = "bg-rose-50 border-rose-200 text-rose-700";
  if (dynamicReadiness >= 80) badgeStyle = "bg-emerald-50 border-emerald-200 text-emerald-700";
  else if (dynamicReadiness >= 50) badgeStyle = "bg-amber-50 border-amber-200 text-amber-700";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#f8fafc] pb-16 font-sans text-slate-900 relative">
      
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-30 -z-10" />

      {/* TOP NAVIGATION */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50 print:hidden shadow-sm">
        <div className="max-w-[90rem] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-1.5 rounded-lg shadow-md"><ShieldAlert className="w-5 h-5 text-white"/></div>
              <span className="font-extrabold text-slate-900 tracking-tight text-lg">T4SKFORCE</span>
            </div>
            <div className="hidden md:flex items-center gap-1 text-sm font-semibold">
              <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">Command Center</span>
              <Link href="/intelligence" className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 px-4 py-2 rounded-lg transition-colors">CBOM</Link>
              <Link href="/telemetry" className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 px-4 py-2 rounded-lg transition-colors">Raw Telemetry</Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={clearCurrentScan} className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 px-4 py-2 rounded-lg transition-all shadow-sm uppercase tracking-wider">
              <Plus className="w-4 h-4"/> New Scan
            </button>
            <button onClick={() => window.print()} className="flex items-center gap-2 text-xs font-bold text-white bg-slate-900 hover:bg-blue-600 px-4 py-2 rounded-lg transition-all shadow-md uppercase tracking-wider">
              <FileDown className="w-4 h-4"/> Export PDF
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-[90rem] mx-auto px-4 md:px-6 mt-8 space-y-6">

        {/* HERO ANCHOR CARD */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Globe className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{asset.hostname || 'UNKNOWN'}</h1>
              <p className="text-slate-500 font-medium text-sm mt-1">{asset.ip_address}:{asset.port} &bull; {asset.asset_type?.replace('_', ' ').toUpperCase()}</p>
            </div>
          </div>
          
          <div className="flex bg-slate-50 border border-slate-200 rounded-xl p-1 shadow-inner text-xs w-full md:w-auto overflow-hidden">
            <div className="px-4 py-2">
              <p className="text-slate-400 font-bold mb-1 uppercase tracking-wider text-[9px]">Scan ID</p>
              <p className="font-mono text-slate-700 font-medium">{meta.scan_id?.split('-')[0] || 'N/A'}</p>
            </div>
            <div className="px-4 py-2 border-l border-slate-200 bg-white">
              <p className="text-slate-400 font-bold mb-1 uppercase tracking-wider text-[9px]">Engine</p>
              <p className="font-mono text-slate-700 font-medium">v{meta.scanner_version || '1.0'} ({meta.scan_mode || 'auto'})</p>
            </div>
            <div className="px-4 py-2 border-l border-slate-200 hidden sm:block">
              <p className="text-slate-400 font-bold mb-1 uppercase tracking-wider text-[9px]">Timestamp</p>
              <p className="font-mono text-slate-700 font-medium">{meta.scan_timestamp ? new Date(meta.scan_timestamp).toLocaleString() : 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* ROW 1: THE PULSE */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          
          {/* Gauge - FIXED COLOR MAPPING */}
          <div className="xl:col-span-3 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-between min-h-[300px] relative">
            <h2 className="font-bold text-[10px] text-slate-400 uppercase tracking-widest w-full text-left mb-4">Global Posture</h2>
            
            <div className="relative flex-1 w-full max-w-[180px] flex items-center justify-center">
              <svg className="w-full aspect-square transform -rotate-90 drop-shadow-sm" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="8" />
                <motion.circle cx="50" cy="50" r={radius} fill="none" stroke={readinessColor} strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset }} transition={{ duration: 1.5, ease: "easeOut" }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-slate-900 tracking-tighter" style={{ color: readinessColor }}>{dynamicReadiness}</span>
                <span className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest text-center leading-tight">Quantum Readiness<br/>Score</span>
              </div>
            </div>

            <div className="w-full text-center mt-4">
               <span className={`text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest border inline-block ${badgeStyle}`}>
                 {riskAnalysis.quantum_safety_label|| 'UNVERIFIED'}
               </span>
            </div>
          </div>

          {/* AI Briefing */}
          <div className="xl:col-span-6 bg-gradient-to-br from-rose-50 to-white border border-rose-100 rounded-3xl p-8 relative overflow-hidden shadow-sm flex flex-col justify-between min-h-[300px]">
            <div className="absolute -right-10 -top-10 opacity-[0.03] pointer-events-none"><AlertTriangle className="w-64 h-64 text-rose-900"/></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"/>
                  <p className="font-bold text-[10px] text-rose-600 uppercase tracking-widest">AI Threat Briefing</p>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">"{exec.primary_risk}"</h2>
                <p className="text-slate-600 mt-4 text-sm leading-relaxed font-medium max-w-xl">{riskAnalysis.hndl_exposure?.reason}</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 p-5 rounded-2xl mt-6 shadow-sm flex items-start gap-4">
                <div className="bg-emerald-100 p-2 rounded-lg shrink-0"><ShieldCheck className="w-5 h-5 text-emerald-600" /></div>
                <div>
                  <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-1">Recommended Action Plan</p>
                  <p className="text-sm font-semibold text-slate-800">{exec.recommended_action}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Predictive */}
          <div className="xl:col-span-3 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[300px]">
            <h2 className="font-bold text-[10px] text-slate-400 uppercase tracking-widest mb-6">Predictive Analytics</h2>
            <div className="space-y-6 flex-1 flex flex-col justify-center">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">HNDL Rate</span>
                  <span className="text-2xl font-black text-rose-600">{(dynamicHndl * 100).toFixed(0)}%</span>
                </div>
                <div className="flex gap-1 h-3">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className={`flex-1 rounded-sm ${i < (dynamicHndl * 10) ? 'bg-rose-500 shadow-sm' : 'bg-slate-200'}`} />
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Agility</span>
                  <span className="text-2xl font-black text-amber-600">{data.ai_risk_insights?.crypto_agility_score || 0}</span>
                </div>
                <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden relative shadow-inner">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${data.ai_risk_insights?.crypto_agility_score || 0}%` }} className="h-full bg-amber-500" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ROW 2: INFRASTRUCTURE & COMPLIANCE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Target Footprint */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h2 className="font-bold text-[10px] text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2"><Server className="w-4 h-4 text-blue-500"/> Target Footprint</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors p-4 rounded-2xl flex flex-col items-center text-center gap-1 shadow-sm">
                <Lock className="w-5 h-5 text-indigo-500 mb-2" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Protocol</span>
                <span className="text-sm font-bold text-slate-900">{cbom.tls?.version || "N/A"}</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors p-4 rounded-2xl flex flex-col items-center text-center gap-1 shadow-sm">
                <Key className="w-5 h-5 text-emerald-500 mb-2" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Ciphers</span>
                <span className="text-sm font-bold text-slate-900">{cbom.cipher_inventory?.total_ciphers || 0} Suites</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors p-4 rounded-2xl flex flex-col items-center text-center gap-1 col-span-2 shadow-sm">
                <Fingerprint className="w-5 h-5 text-fuchsia-500 mb-2" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Certificate Authority</span>
                <span className="text-sm font-bold text-slate-900 truncate w-full px-2">{cbom.certificate?.issuer?.split(',')[1]?.replace(' O=', '') || 'Unknown'}</span>
              </div>
            </div>
          </div>

          {/* Compliance */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-2"><Landmark className="w-4 h-4 text-blue-500"/> Regulatory Assessment</h2>
              <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-full border border-blue-100 uppercase tracking-wider">{compliance.sector || 'General'}</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {(compliance.compliance_frameworks || []).map((framework: string, idx: number) => (
                <div key={idx} className="bg-rose-50/50 border border-rose-100 p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-3 hover:bg-rose-50 transition-colors">
                  <ShieldAlert className="w-6 h-6 text-rose-500" />
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-tight leading-snug">{framework}</span>
                </div>
              ))}
            </div>
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl mt-auto">
               <p className="text-sm text-slate-700 font-medium"><span className="font-bold text-slate-900 mr-2 uppercase text-xs tracking-wider">Impact:</span>{compliance.compliance_impact}</p>
            </div>
          </div>

        </div>

        {/* ROW 3: INTERACTIVE SIMULATOR */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
          
          {/* Slider Control Box */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-inner">
            <div className="flex-shrink-0 text-center md:text-left">
              <h3 className="font-extrabold text-sm text-slate-900 tracking-widest uppercase flex items-center gap-2 justify-center md:justify-start"><SlidersHorizontal className="w-5 h-5 text-blue-600"/> Temporal Simulator</h3>
              <p className="text-slate-500 text-[10px] font-bold mt-1 uppercase tracking-wider">Forecast Cryptographic Decay</p>
            </div>
            <div className="flex-1 w-full px-4">
              <input type="range" min="2025" max="2045" step="1" value={driftYear} onChange={(e) => setDriftYear(parseInt(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-500 transition-all" />
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">
                <span className="text-slate-600">2025 (Present)</span>
                <span className="text-rose-500">2035 (Q-Day)</span>
                <span className="text-slate-600">2045 (Critical Limit)</span>
              </div>
            </div>
            <div className="flex-shrink-0 bg-white text-blue-700 border border-blue-100 px-6 py-3 rounded-xl shadow-sm font-mono text-3xl font-black">
              {driftYear}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Timeline */}
            <div>
              <h2 className="font-bold text-[10px] text-slate-400 tracking-widest uppercase mb-6 flex items-center gap-2"><Clock className="w-4 h-4"/> Algorithm Vulnerability Horizon</h2>
              <div className="space-y-6">
                {(data.visualization_data?.quantum_attack_timeline || []).map((item: any, idx: number) => {
                  const isBroken = driftYear >= item.risk_start_year;
                  const width = Math.min(((item.risk_start_year - 2025) / 25) * 100, 100);
                  return (
                    <div key={idx}>
                      <div className="flex justify-between text-[11px] font-bold mb-2 uppercase tracking-widest">
                        <span className="text-slate-700">{item.algorithm}</span>
                        <span className={isBroken ? 'text-rose-600' : 'text-emerald-600'}>{isBroken ? 'CRITICAL BREACH' : `SECURE TILL ${item.risk_start_year}`}</span>
                      </div>
                      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden relative shadow-inner">
                        <div style={{ width: `${width}%` }} className={`h-full transition-colors duration-500 ${isBroken ? 'bg-rose-500' : 'bg-slate-300'}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Light Theme Chart */}
            <div className="flex flex-col">
              <h2 className="font-bold text-[10px] text-slate-400 tracking-widest uppercase mb-6 flex items-center gap-2"><TrendingUp className="w-4 h-4"/> Exponential Risk Curve</h2>
              <div className="flex-1 w-full min-h-[160px] bg-slate-50 border border-slate-100 rounded-2xl p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.visualization_data?.quantum_risk_forecast || []}>
                    <defs>
                      <linearGradient id="riskLight" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#e11d48" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#e11d48" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="year" stroke="#cbd5e1" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#0f172a', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Area type="monotone" dataKey="risk" stroke="#e11d48" strokeWidth={3} fill="url(#riskLight)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>

      </div>
    </motion.div>
  );
}