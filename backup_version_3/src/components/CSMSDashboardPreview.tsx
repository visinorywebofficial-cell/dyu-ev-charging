"use client";

import React from "react";
import { 
  LayoutDashboard, 
  Building2, 
  ChevronDown, 
  ChevronUp, 
  BatteryCharging, 
  Users, 
  CreditCard, 
  MessageSquareWarning, 
  Ticket, 
  Zap, 
  Settings,
  MapPin,
  Smartphone
} from "lucide-react";

const ConcentricDonut = ({ 
  centerValue, 
  centerLabel,
  data 
}: { 
  centerValue: string, 
  centerLabel: string,
  data: { label: string, color: string, value: number, radius: number }[] 
}) => {
  return (
    <div className="flex items-center gap-8">
      <div className="relative flex items-center justify-center w-[160px] h-[160px]">
        <svg width="160" height="160" viewBox="0 0 160 160" className="transform -rotate-90">
          {data.map((item, i) => {
            const circumference = 2 * Math.PI * item.radius;
            const strokeDasharray = `${(item.value / 100) * circumference} ${circumference}`;
            return (
              <g key={`arc-${i}`}>
                <circle 
                  cx="80" cy="80" r={item.radius} 
                  fill="none" 
                  stroke="#E2E5EA" 
                  strokeWidth="8" 
                />
                <circle 
                  cx="80" cy="80" r={item.radius} 
                  fill="none" 
                  stroke={item.color} 
                  strokeWidth="8" 
                  strokeDasharray={strokeDasharray}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </g>
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xs font-semibold text-gray-500">{centerLabel}</span>
          <span className="text-2xl font-bold text-[#1a2b4c] font-['Gilroy']">{centerValue}</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        {data.map((item, i) => (
          <div key={`legend-${i}`} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-sm font-medium text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function CSMSDashboardPreview() {
  return (
    <div className="w-full h-full bg-[#EBECEF] flex relative overflow-hidden font-['Figtree'] text-left">
      {/* SIDEBAR */}
      <div className="w-[280px] bg-[#EBECEF] border-r border-gray-300/50 flex flex-col pt-8 pb-4 shrink-0">
        <div className="px-8 mb-10">
          <h1 className="text-3xl font-black text-[#1a2b4c] font-['Gilroy'] tracking-tight">dyu</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4">
          <ul className="space-y-1">
            <li>
              <button className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-200/50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold text-sm">Dashboard</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </li>
            
            <li className="mt-2">
              <button className="w-full flex items-center justify-between px-4 py-3 text-[#1a2b4c] font-bold rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-gray-700" />
                  <span className="font-bold text-sm">Company Management</span>
                </div>
                <ChevronUp className="w-4 h-4 text-gray-700" />
              </button>
              <div className="pl-12 pr-2 mt-1 space-y-1">
                <button className="w-full text-left px-4 py-2.5 bg-[#DCE0E5] text-[#1a2b4c] font-bold text-sm rounded-lg shadow-sm">
                  Company Details
                </button>
                <button className="w-full text-left px-4 py-2.5 text-gray-500 font-semibold hover:text-gray-700 text-sm rounded-lg transition-colors">
                  Company
                </button>
                <button className="w-full text-left px-4 py-2.5 text-gray-500 font-semibold hover:text-gray-700 text-sm rounded-lg transition-colors">
                  Clients
                </button>
              </div>
            </li>

            <li className="pt-2">
              <button className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-200/50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <BatteryCharging className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold text-sm">Charger Management</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </li>
            
            <li>
              <button className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-200/50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold text-sm">User Management</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </li>

            <li>
              <button className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-200/50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold text-sm">Billings & Payments</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </li>

            <li>
              <button className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-200/50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <MessageSquareWarning className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold text-sm">Complaints</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </li>
            
            <li>
              <button className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-200/50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <Ticket className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold text-sm">Coupons</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </li>

            <li>
              <button className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-200/50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold text-sm">Auto Triggers</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </li>

            <li>
              <button className="w-full flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-gray-200/50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold text-sm">Subscription</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 bg-[#F1F2F4] p-8 overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#1a2b4c] font-['Gilroy'] mb-8">Company Details</h2>
        
        {/* Header Row */}
        <div className="mb-6">
          <div className="flex items-baseline gap-3 mb-1">
            <h3 className="text-3xl font-black text-[#1a2b4c] font-['Gilroy']">DYU</h3>
            <span className="text-xs font-bold text-[#E55A43] tracking-wide">MKTP</span>
          </div>
          <p className="text-sm font-semibold text-gray-500 mb-4">8787</p>
          
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#E8EAEF] rounded-md border border-gray-300/50 shadow-sm text-xs font-bold text-gray-700">
            <img src="https://flagcdn.com/w20/in.png" alt="India" className="w-4 h-3 object-cover rounded-sm" />
            India
            <ChevronDown className="w-3 h-3 ml-2 text-gray-500" />
          </button>
        </div>

        {/* Metric Cards Top Row */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-[#EBECEF] p-5 rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),_0_4px_10px_rgba(0,0,0,0.05)] border border-white/50 flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-[#1a2b4c] font-['Gilroy'] mb-1">29</div>
              <div className="text-xs font-semibold text-gray-500">CPOs</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#E55A43]">
              <MapPin className="w-5 h-5" />
            </div>
          </div>
          
          <div className="bg-[#EBECEF] p-5 rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),_0_4px_10px_rgba(0,0,0,0.05)] border border-white/50 flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-[#1a2b4c] font-['Gilroy'] mb-1">41</div>
              <div className="text-xs font-semibold text-gray-500">eMSPs</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#E55A43]">
              <BatteryCharging className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#EBECEF] p-5 rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),_0_4px_10px_rgba(0,0,0,0.05)] border border-white/50 flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-[#1a2b4c] font-['Gilroy'] mb-1">38</div>
              <div className="text-xs font-semibold text-gray-500">Platform</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#E55A43]">
              <Smartphone className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-[#EBECEF] p-5 rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),_0_4px_10px_rgba(0,0,0,0.05)] border border-white/50 flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-[#1a2b4c] font-['Gilroy'] mb-1">254</div>
              <div className="text-xs font-semibold text-gray-500">Clients</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#E55A43]">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-[#EBECEF] p-8 rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),_0_4px_10px_rgba(0,0,0,0.05)] border border-white/50 relative">
            <h3 className="text-lg font-bold text-[#1a2b4c] font-['Gilroy'] mb-6 absolute top-8 left-8">DC Charger Licenses</h3>
            <div className="mt-12 flex justify-center">
              <ConcentricDonut 
                centerLabel="Total"
                centerValue="500"
                data={[
                  { label: "Total DC Licenses", color: "#3B82F6", value: 85, radius: 70 },
                  { label: "Available DC Licenses", color: "#EF4444", value: 70, radius: 56 },
                  { label: "Active DC Licenses", color: "#EAB308", value: 45, radius: 42 }
                ]}
              />
            </div>
          </div>

          <div className="bg-[#EBECEF] p-8 rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),_0_4px_10px_rgba(0,0,0,0.05)] border border-white/50 relative">
            <h3 className="text-lg font-bold text-[#1a2b4c] font-['Gilroy'] mb-6 absolute top-8 left-8">AC Charger Licenses</h3>
            <div className="mt-12 flex justify-center">
              <ConcentricDonut 
                centerLabel="Total"
                centerValue="800"
                data={[
                  { label: "Total AC Licenses", color: "#3B82F6", value: 92, radius: 70 },
                  { label: "Available AC Licenses", color: "#EF4444", value: 60, radius: 56 },
                  { label: "Active AC Licenses", color: "#EAB308", value: 30, radius: 42 }
                ]}
              />
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-[#EBECEF] p-8 rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),_0_4px_10px_rgba(0,0,0,0.05)] border border-white/50 relative">
            <h3 className="text-lg font-bold text-[#1a2b4c] font-['Gilroy'] mb-6 absolute top-8 left-8">Total EV Owners</h3>
            <div className="mt-12 flex justify-center">
              <ConcentricDonut 
                centerLabel="Total"
                centerValue="254"
                data={[
                  { label: "EV Users", color: "#3B82F6", value: 75, radius: 70 },
                  { label: "Active Users", color: "#EF4444", value: 50, radius: 56 },
                  { label: "Inactive Users", color: "#EAB308", value: 25, radius: 42 }
                ]}
              />
            </div>
          </div>

          <div className="bg-[#EBECEF] p-8 rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),_0_4px_10px_rgba(0,0,0,0.05)] border border-white/50 relative">
            <h3 className="text-lg font-bold text-[#1a2b4c] font-['Gilroy'] mb-6 absolute top-8 left-8">Total Chargers</h3>
            <div className="mt-12 flex justify-center">
              <ConcentricDonut 
                centerLabel="Total"
                centerValue="1300"
                data={[
                  { label: "Total chargers", color: "#3B82F6", value: 80, radius: 70 },
                  { label: "Commissioned chargers", color: "#EF4444", value: 55, radius: 56 }
                ]}
              />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
