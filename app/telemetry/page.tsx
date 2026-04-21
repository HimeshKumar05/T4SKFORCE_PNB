"use client";

import { useState, useEffect } from "react";
import { useScan } from "../../context/ScanContext"; 
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, Search, FileJson, ChevronRight, Activity, Download, 
  Globe, Lock, TerminalSquare, ShieldCheck, Microscope, Database, 
  Network, ArrowRight, ChevronUp, ChevronDown, Code, Layers, List,
  Fingerprint, Award
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// 🛠️ This function intercepts raw backend objects and safely converts them to strings
const safeRender = (val: any): string => {
  if (!val) return "N/A";
  if (typeof val === "string" || typeof val === "number") return String(val);
  if (typeof val === "object" && val.name) return val.name; 
  if (typeof val === "object" && val.value) return val.value;
  if (Array.isArray(val)) return val.map(safeRender).join(", ");
  try {
    return JSON.stringify(val).replace(/[{}"\[\]]/g, '').trim() || "N/A";
  } catch {
    return "N/A";
  }
};

export default function TelemetryPage() {
  const { layer1Data, isScanning, loadingStep, clearCurrentScan } = useScan();
  const currentPath = usePathname();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isJsonOpen, setIsJsonOpen] = useState(false);

  if (isScanning || !layer1Data) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#f8fafc] font-sans">
          <div className="relative mb-8">
            <Network size={60} className="text-blue-500 animate-pulse relative z-10" />
            <div className="absolute inset-0 bg-blue-400/20 blur-2xl rounded-full" />
          </div>
          <div className="flex gap-2 text-slate-500 font-bold uppercase text-sm tracking-widest">
              {isScanning ? "Intercepting Telemetry Stream" : "Telemetry Offline"}
              <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} >.</motion.span>
              <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} >.</motion.span>
              <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} >.</motion.span>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-4 uppercase tracking-widest">{loadingStep}</p>
          
          {!isScanning && (
            <Link href="/" className="mt-8 group flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-all text-xs font-bold text-slate-700 uppercase tracking-widest">
              Return to Command <ChevronRight className="w-4 h-4 text-blue-600" />
            </Link>
          )}
      </div>
    );
  }

  const data = layer1Data as any;
  const metadata = data?.scan_metadata;
  const assetData = data?.asset;
  const protoData = data?.protocol;
  const certData = data?.certificate;
  
  const filteredCiphers = (protoData?.supported_cipher_suites || []).filter((c: any) => 
    (c.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-20 font-sans selection:bg-blue-100">
      
      {/* PREMIUM NAV BAR */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm print:hidden">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2.5">
              <div className="bg-blue-600 p-1.5 rounded shadow-sm">
                <ShieldAlert className="w-5 h-5 text-white"/>
              </div>
              <span className="font-black text-slate-900 tracking-tight text-xl uppercase">T4skforce</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-widest h-16">
              <Link href="/" className={`${currentPath === '/' ? 'text-blue-700 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-900'} flex items-center h-full transition-all`}>Overview</Link>
              <Link href="/intelligence" className={`${currentPath === '/intelligence' ? 'text-blue-700 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-900'} flex items-center h-full transition-all`}>CBOM</Link>
              <Link href="/telemetry" className={`${currentPath === '/telemetry' ? 'text-blue-700 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-900'} flex items-center h-full transition-all`}>Telemetry</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={clearCurrentScan} className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-5 py-2.5 rounded-lg transition-all uppercase tracking-widest flex items-center gap-2 hover:bg-rose-100">
              <ShieldAlert size={14} /> Terminate
            </button>
            <button onClick={() => window.print()} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-sm hover:bg-blue-700 transition-all">
               <Download size={14} /> Export Audit
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-4 md:px-6 mt-8 space-y-6 print:m-0 print:p-0">

        {/* CREATIVE PAGE HEADER */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative bg-white border border-slate-200 rounded-2xl p-8 md:p-12 overflow-hidden shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group print:border-b print:shadow-none print:rounded-none">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-50 to-transparent pointer-events-none print:hidden" />
           <div className="absolute -right-10 -top-10 opacity-[0.02] pointer-events-none group-hover:rotate-12 transition-transform duration-1000 print:hidden">
              <Activity size={300} />
           </div>
           
           <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-8 h-1 bg-slate-800 rounded-full" />
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Raw Connection Stream</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">TELEMETRY</h1>
              <p className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-[0.3em] mt-4">Intercepted Handshake & Logic Objects</p>
           </div>

           <div className="relative z-10 flex flex-col items-start md:items-end gap-3 text-right">
              <div className="bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-lg flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Stream Active</span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 font-mono mt-2 uppercase tracking-widest">Target: <span className="text-slate-800 ml-1 text-xs">{safeRender(assetData?.hostname)}</span></p>
           </div>
        </motion.div>

        {/* SECTION 1: ASSET & SCHEMATIC FLOW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           
           {/* Dark Target Card */}
           <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-4 bg-[#0f172a] border border-slate-800 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 w-64 h-64 border-[1px] border-white/10 rounded-full pointer-events-none" />
              <div className="absolute -right-20 -bottom-20 w-80 h-80 border-[1px] border-white/5 rounded-full pointer-events-none" />
              
              <div className="flex justify-between items-start mb-10 relative z-10">
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md">
                   <Globe className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-right">
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Target IP Node</p>
                   <p className="text-sm font-mono text-white">{safeRender(metadata?.ip_address)}</p>
                </div>
              </div>
              
              <div className="relative z-10">
                 <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">Resolved Domain</p>
                 <h2 className="text-3xl font-black tracking-tight truncate" title={safeRender(assetData?.hostname)}>{safeRender(assetData?.hostname)}</h2>
                 
                 <div className="flex gap-4 mt-8 pt-6 border-t border-white/10">
                    <div>
                       <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Port</p>
                       <p className="text-sm font-mono font-bold text-white">{safeRender(assetData?.port)}</p>
                    </div>
                    <div>
                       <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Service</p>
                       <p className="text-sm font-bold text-emerald-400 uppercase">{safeRender(assetData?.service)}</p>
                    </div>
                 </div>
              </div>
           </motion.div>

           {/* Protocol DNA Horizontal Flow */}
           <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col justify-center relative overflow-hidden">
              <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-10 flex items-center gap-2">
                <Network className="w-4 h-4 text-blue-500" /> Handshake Schematic
              </h2>
              
              <div className="flex flex-col md:flex-row items-center justify-between relative z-10 px-4">
                 
                 {/* Step 1: Protocol */}
                 <div className="flex flex-col items-center group/step">
                    <div className="w-16 h-16 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center mb-4 group-hover/step:border-blue-400 group-hover/step:bg-blue-50 transition-colors shadow-sm">
                       <Lock className="w-6 h-6 text-slate-600 group-hover/step:text-blue-600 transition-colors" />
                    </div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Layer 1</p>
                    <p className="text-sm font-black text-slate-900">{safeRender(protoData?.version)}</p>
                 </div>
                 
                 <ArrowRight className="hidden md:block w-6 h-6 text-slate-300" />
                 
                 {/* Step 2: Handshake */}
                 <div className="flex flex-col items-center group/step">
                    <div className="w-16 h-16 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center mb-4 group-hover/step:border-indigo-400 group-hover/step:bg-indigo-50 transition-colors shadow-sm">
                       <Activity className="w-6 h-6 text-slate-600 group-hover/step:text-indigo-600 transition-colors" />
                    </div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Layer 2</p>
                    <p className="text-sm font-black text-slate-900">Key Exchange</p>
                 </div>
                 
                 <ArrowRight className="hidden md:block w-6 h-6 text-slate-300" />
                 
                 {/* Step 3: Negotiated Buffer */}
                 <div className="flex-1 w-full md:w-auto bg-slate-900 rounded-xl p-6 flex flex-col justify-center shadow-lg relative overflow-hidden group/final">
                    <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-blue-600/20 to-transparent pointer-events-none" />
                    <p className="text-[9px] font-bold text-blue-400 uppercase tracking-widest mb-2 relative z-10">Active Tunnel Established</p>
                    <h3 className="text-sm md:text-base font-mono font-bold text-white leading-relaxed relative z-10 break-all">
                       {safeRender(protoData?.negotiated_cipher_suite)}
                    </h3>
                 </div>
              </div>
           </motion.div>
        </div>

        {/* SECTION 1.5: THE X.509 IDENTITY BLOCK */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none"><Fingerprint className="w-48 h-48 text-slate-900" /></div>
           <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6 relative z-10">
              <Award className="w-6 h-6 text-blue-600" />
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.4em]">Raw X.509 Identity Extract</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-inner md:col-span-2">
                 <p className="text-[9px] font-bold text-slate-400 uppercase mb-2">Subject / Domain Name</p>
                 <p className="text-sm font-black text-slate-800 font-mono break-all">{safeRender(certData?.subject_name)}</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-inner">
                 <p className="text-[9px] font-bold text-slate-400 uppercase mb-2">Issuer Authority</p>
                 <p className="text-xs font-black text-blue-700 font-mono">{safeRender(certData?.issuer_name)}</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-inner">
                 <p className="text-[9px] font-bold text-slate-400 uppercase mb-2">Signature Algorithm</p>
                 <p className="text-xs font-black text-slate-800 font-mono">{safeRender(certData?.signature_algorithm)}</p>
              </div>
           </div>
        </div>

        {/* SECTION 2: CLEAN CIPHER TABLE */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
           <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-slate-900 rounded-2xl shadow-md"><List className="w-6 h-6 text-white" /></div>
                 <div>
                    <h2 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Supported Suite Inventory</h2>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{filteredCiphers.length} Vectors Extracted</p>
                 </div>
              </div>
              <div className="relative group w-full md:w-96 print:hidden">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input 
                    type="text" 
                    placeholder="Search suite DNA..." 
                    className="w-full pl-12 pr-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold uppercase outline-none focus:border-blue-400 focus:bg-white transition-all shadow-inner"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>
           </div>

           <div className="grid grid-cols-1 gap-3 max-h-[500px] overflow-auto custom-scrollbar pr-2 print:max-h-full print:overflow-visible">
              {filteredCiphers.map((cipher: any, idx: number) => (
                 <div key={idx} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 rounded-2xl transition-all group shadow-sm">
                    <div className="flex items-center gap-5 w-full md:w-auto mb-3 md:mb-0">
                       <span className="text-[10px] font-black text-slate-300 font-mono w-6">#{idx + 1}</span>
                       <div>
                          <p className="text-sm font-black text-slate-800 font-mono tracking-tight uppercase">{safeRender(cipher.name)}</p>
                          <div className="flex gap-2 mt-1.5">
                             <span className="text-[9px] font-bold text-blue-700 bg-blue-100/50 px-2 py-0.5 rounded uppercase tracking-widest">{safeRender(cipher.key_exchange) || 'KEX'}</span>
                             <span className="text-[9px] font-bold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded uppercase tracking-widest">{safeRender(cipher.encryption_algorithm) || 'ENC'}</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex gap-6 items-center w-full md:w-auto justify-between md:justify-end pl-11 md:pl-0">
                       <div className="text-left md:text-right hidden sm:block">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Digest Layer</p>
                          <p className="text-[11px] font-bold text-slate-700 font-mono">{safeRender(cipher.hash_algorithm)}</p>
                       </div>
                       <div className={`px-4 py-2 rounded-xl border flex items-center justify-center min-w-[70px] ${cipher.mode === 'GCM' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-slate-200 text-slate-500'}`}>
                          <span className="text-[10px] font-black uppercase tracking-widest">{safeRender(cipher.mode) || 'CBC'}</span>
                       </div>
                    </div>
                 </div>
              ))}
              {filteredCiphers.length === 0 && (
                <div className="p-10 text-center text-slate-400 font-bold text-[10px] uppercase tracking-widest border-2 border-dashed border-slate-200 rounded-2xl">
                  No matching suites found.
                </div>
              )}
           </div>
        </div>

        {/* SECTION 3: RAW JSON TERMINAL (RESTORED TO DARK THEME) */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col print:hidden">
            <button 
               onClick={() => setIsJsonOpen(!isJsonOpen)}
               className="w-full p-6 md:p-8 flex items-center justify-between text-white hover:bg-slate-800 transition-colors border-b border-slate-800/50"
            >
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-800 rounded-xl"><FileJson className="w-5 h-5 text-blue-400" /></div>
                  <div className="text-left">
                     <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-100">Logic Object Buffer (Raw JSON)</h3>
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Click to {isJsonOpen ? 'Collapse' : 'Expand'} Hex Stream</p>
                  </div>
               </div>
               {isJsonOpen ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-blue-400 animate-bounce" />}
            </button>
            
            <AnimatePresence>
               {isJsonOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                     <div className="p-6 md:p-8 pt-0 bg-slate-900">
                        {/* Dark inner terminal for the code */}
                        <div className="bg-[#050b14] border border-white/5 rounded-2xl p-6 font-mono text-[11px] leading-relaxed overflow-auto max-h-[500px] custom-scrollbar text-emerald-400 shadow-inner">
                           <pre>{JSON.stringify(layer1Data, null, 3)}</pre>
                        </div>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
            
            {!isJsonOpen && (
               <div className="flex flex-col items-center justify-center text-slate-500 p-10 bg-slate-900/50">
                  <Code className="w-10 h-10 mb-4 opacity-20" />
                  <p className="text-[10px] font-mono uppercase tracking-widest text-center">Payload buffered in secure memory.<br/>Expand to view raw JSON dump.</p>
               </div>
            )}
        </motion.div>

      </main>
    </div>
  );
}