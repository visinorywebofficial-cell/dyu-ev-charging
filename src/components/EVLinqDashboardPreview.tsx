"use client";

import React from "react";
import { 
  Building2, 
  CreditCard, 
  MapPin, 
  Network, 
  Activity, 
  Ticket, 
  Clock, 
  FileText, 
  MessageSquareWarning,
  Calendar,
  Download,
  XCircle,
  PlusCircle
} from "lucide-react";

export function EVLinqDashboardPreview() {
  return (
    <div className="w-full min-w-[1024px] bg-[#F8FBFC] rounded-2xl overflow-hidden shadow-2xl flex flex-col font-['Inter'] text-[#1F2933] border border-[#DDE6EA]" style={{ height: '700px' }}>
      
      {/* MAC WINDOW CONTROLS */}
      <div className="h-10 bg-[#002B36] border-b border-[#003C4B] flex items-center px-4 shrink-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#D1495B]" />
          <div className="w-3 h-3 rounded-full bg-[#E9C46A]" />
          <div className="w-3 h-3 rounded-full bg-[#94D2BD]" />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR — Deep Ocean (#002B36) */}
        <div className="w-64 bg-[#002B36] border-r border-[#003C4B] flex flex-col shrink-0 text-white">
          <div className="p-6 flex items-center gap-1">
            <span className="font-['Plus_Jakarta_Sans'] font-black text-2xl tracking-tighter text-white">DYU</span>
            <span className="w-2 h-2 rounded-full bg-[#005F73]" />
          </div>
          <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
            {[
              { icon: Building2, label: "Company Management" },
              { icon: CreditCard, label: "Settlements" },
              { icon: MapPin, label: "Locations" },
              { icon: Network, label: "Network", active: true },
              { icon: Activity, label: "Tariff" },
              { icon: Ticket, label: "Tokens" },
              { icon: Clock, label: "Sessions" },
              { icon: FileText, label: "Logs" },
              { icon: MessageSquareWarning, label: "Complaint" },
            ].map((item, i) => (
              <div 
                key={i} 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${
                  item.active ? "text-white bg-[#005F73]" : "text-white/70 hover:bg-[#003C4B]"
                }`}
              >
                <item.icon size={18} strokeWidth={item.active ? 2.5 : 2} className={item.active ? "text-[#94D2BD]" : "text-white/50"} />
                <span>{item.label}</span>
              </div>
            ))}
          </nav>
        </div>

        {/* MAIN CONTENT — Mist White (#F8FBFC) */}
        <div className="flex-1 bg-[#F8FBFC] flex flex-col overflow-hidden">
          <div className="p-6 overflow-y-auto flex-1">
            
            {/* Header */}
            <div className="flex justify-between items-end mb-6">
              <div>
                <h1 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#1F2933]">
                  Network Details - <span className="text-[#005F73]">EVlinq</span>
                </h1>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#DDE6EA] rounded-md text-xs font-semibold text-[#52606D] shadow-sm">
                  <Calendar size={14} /> 05/05/2025 - 05/05/2026
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#DDE6EA] rounded-md text-xs font-semibold text-[#52606D] shadow-sm">
                  <Download size={14} /> Download Report
                </button>
              </div>
            </div>

            {/* Filter Tags */}
            <div className="flex gap-3 mb-8">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#005F73]/10 border border-[#005F73]/20 text-[#005F73] rounded-full text-xs font-semibold">
                <XCircle size={14} />
                <span>Company Name (31) : DYU</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 text-gray-500 rounded-full text-xs font-semibold">
                <PlusCircle size={14} />
                <span>Charger Name</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 text-gray-500 rounded-full text-xs font-semibold">
                <PlusCircle size={14} />
                <span>Station Name</span>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {['Total Capacity', 'Available Capacity', 'Utilization'].map((title, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm h-28 flex flex-col">
                  <span className="text-xs font-semibold text-gray-400 mb-2">{title}</span>
                  <div className="mt-auto opacity-20 flex gap-1 flex-wrap">
                    {Array.from({ length: 48 }).map((_, j) => (
                      <div key={j} className="w-1 h-2 bg-gray-400 rounded-sm" />
                    ))}
                  </div>
                </div>
              ))}
              <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm h-28 flex flex-col relative overflow-hidden">
                 <span className="text-xs font-semibold text-gray-400 z-10 relative">Uptime</span>
                 <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border-[12px] border-gray-100" />
                 <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border-[12px] border-[#5e6ad2] border-t-transparent border-r-transparent -rotate-45" />
                 <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[#5e6ad2] font-bold text-lg">%</div>
                 <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs font-bold text-gray-500">
                   <div className="w-2 h-2 rounded-full bg-[#5e6ad2]" /> Uptime
                 </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#f8f9fa] text-gray-400 font-semibold border-b border-gray-100">
                    <th className="px-4 py-3 font-semibold">Charger Name</th>
                    <th className="px-4 py-3 font-semibold">CPO Name</th>
                    <th className="px-4 py-3 font-semibold">Station Name</th>
                    <th className="px-4 py-3 font-semibold">State</th>
                    <th className="px-4 py-3 font-semibold">Total Uptime (%)</th>
                    <th className="px-4 py-3 font-semibold">Total Utilization (Units)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-500 font-medium">
                  {[
                    ["DYU DC-120", "Electra Charge", "Cyber Hub Tower B", "Delhi"],
                    ["DYU DC-120", "UrbanVolt", "Cyber Hub Tower B", "Delhi"],
                    ["DYU DC-60", "Hydra charging", "Cyber Hub Tower B", "Delhi"],
                    ["DYU DC-60", "Hydra charging", "DYU Vasant Vihar", "Delhi"],
                    ["DYU DC-120 pro", "Hydra charging", "DYU Vasant Vihar", "Delhi"],
                    ["DYU DC Charger", "Del com", "DLF Mall of India", "Haryana"],
                    ["DYU DC-120", "HPCL", "DLF Mall of India", "Haryana"],
                    ["DYU DC-60", "Hydra charging", "DLF Mall of India", "Haryana"],
                    ["DYU DC-120 pro", "EV Motors", "DLF Mall of India", "Haryana"],
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                      <td className="px-4 py-3">{row[0]}</td>
                      <td className="px-4 py-3">{row[1]}</td>
                      <td className="px-4 py-3">{row[2]}</td>
                      <td className="px-4 py-3">{row[3]}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-[2px] opacity-20">
                          {Array.from({ length: 24 }).map((_, j) => (
                            <div key={j} className="w-1 h-2.5 bg-gray-400 rounded-sm" />
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                         <div className="flex gap-[2px] opacity-20">
                          {Array.from({ length: 24 }).map((_, j) => (
                            <div key={j} className="w-1 h-2.5 bg-gray-400 rounded-sm" />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
