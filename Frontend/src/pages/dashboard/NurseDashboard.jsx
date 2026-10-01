import { useState } from 'react';
import {
  Users,
  BedDouble,
  AlertTriangle,
  HeartPulse,
  CheckCircle2,
  Clock,
  Activity,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import Card from '@/components/ui/Card';

const wardOccupancyData = [
  { ward: 'General (A)', occupied: 16, available: 4 },
  { ward: 'Surgical (B)', occupied: 12, available: 3 },
  { ward: 'ICU', occupied: 6, available: 1 },
  { ward: 'Pediatrics', occupied: 4, available: 4 },
];

const vitalsTimelineData = [
  { hour: '08:00', recorded: 12, target: 12 },
  { hour: '10:00', recorded: 10, target: 12 },
  { hour: '12:00', recorded: 11, target: 12 },
  { hour: '14:00', recorded: 5, target: 12 },
  { hour: '16:00', recorded: 0, target: 12 },
];

const initialVitalsChecklist = [
  {
    id: 'VIT-101',
    patient: 'Muhammad Irfan',
    bed: 'ICU - Bed 02',
    dueTime: '12:30 PM',
    priority: 'Urgent',
    required: 'BP, Pulse, SpO2, Temp',
    lastRecorded: '10:30 AM (140/90, 88 bpm)',
    completed: false,
  },
  {
    id: 'VIT-102',
    patient: 'Zubaida Begum',
    bed: 'Ward A - Bed 05',
    dueTime: '12:45 PM',
    priority: 'Normal',
    required: 'Blood Glucose, BP',
    lastRecorded: '08:45 AM (118/78, 142 mg/dL)',
    completed: false,
  },
  {
    id: 'VIT-103',
    patient: 'Rashid Minhas',
    bed: 'ICU - Bed 04',
    dueTime: '01:00 PM',
    priority: 'Urgent',
    required: 'Cardiac Rhythm, SpO2, Resp Rate',
    lastRecorded: '11:00 AM (92% SpO2, 22 rpm)',
    completed: false,
  },
  {
    id: 'VIT-104',
    patient: 'Nasreen Akhtar',
    bed: 'Ward B - Bed 11',
    dueTime: '01:15 PM',
    priority: 'Normal',
    required: 'Temperature, Pain Scale',
    lastRecorded: '09:15 AM (98.6°F, Pain 4/10)',
    completed: false,
  },
  {
    id: 'VIT-105',
    patient: 'Kamran Shah',
    bed: 'Ward A - Bed 14',
    dueTime: '01:30 PM',
    priority: 'Normal',
    required: 'BP, Heart Rate',
    lastRecorded: '09:30 AM (125/82, 74 bpm)',
    completed: true,
  },
];

const wards = [
  {
    id: 'ward-a',
    name: 'Ward A - General Medicine',
    nurse: 'Sister Maryam',
    occupied: 16,
    total: 20,
    criticalCount: 0,
    accent: 'border-l-blue-500',
    barColor: 'bg-blue-600',
  },
  {
    id: 'ward-b',
    name: 'Ward B - Post-Surgical',
    nurse: 'Staff Nurse Zoya',
    occupied: 12,
    total: 15,
    criticalCount: 0,
    accent: 'border-l-emerald-500',
    barColor: 'bg-emerald-500',
  },
  {
    id: 'icu',
    name: 'Intensive Care Unit (ICU)',
    nurse: 'Sr. Nurse Rashid',
    occupied: 6,
    total: 7,
    criticalCount: 3,
    accent: 'border-l-red-500',
    barColor: 'bg-red-500',
  },
  {
    id: 'peds',
    name: 'Pediatrics Ward',
    nurse: 'Staff Nurse Anum',
    occupied: 4,
    total: 8,
    accent: 'border-l-purple-500',
    barColor: 'bg-purple-500',
  },
];

/**
 * Nurse Dashboard page providing ward occupancy tracking, active bed rosters,
 * critical patient alerts, and routine vitals checklists.
 */
export function NurseDashboard() {
  const [checklist, setChecklist] = useState(initialVitalsChecklist);

  const toggleCheck = (id) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Nurse Dashboard</h1>
        <p className="text-slate-500">
          Station: Inpatient Care & ICU Wing • Shift: Morning (07:00 AM - 03:00 PM)
        </p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Active Patients */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">Active Patients</p>
              <p className="text-2xl font-bold text-slate-900">45</p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                  In Wards
                </span>
                <span className="text-xs text-slate-400">across 4 wings</span>
              </div>
            </div>
            <div className="rounded-lg p-3 bg-blue-50 text-blue-600">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </Card>

        {/* Beds Occupied */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">Beds Occupied</p>
              <p className="text-2xl font-bold text-slate-900">38/50</p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">
                  76% capacity
                </span>
                <span className="text-xs text-slate-400">12 available</span>
              </div>
            </div>
            <div className="rounded-lg p-3 bg-blue-50 text-blue-600">
              <BedDouble className="w-6 h-6" />
            </div>
          </div>
        </Card>

        {/* Critical Patients */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">Critical Patients</p>
              <p className="text-2xl font-bold text-slate-900">3</p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-700">
                  Immediate attention
                </span>
                <span className="text-xs text-slate-400">in ICU</span>
              </div>
            </div>
            <div className="rounded-lg p-3 bg-red-50 text-red-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
        </Card>

        {/* Pending Vitals */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">Pending Vitals</p>
              <p className="text-2xl font-bold text-slate-900">8</p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                  Due this hour
                </span>
                <span className="text-xs text-slate-400">next round</span>
              </div>
            </div>
            <div className="rounded-lg p-3 bg-amber-50 text-amber-600">
              <HeartPulse className="w-6 h-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Ward Overview Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-slate-900">Ward Overview</h2>
          <span className="text-xs text-slate-500">Updated 5 minutes ago</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {wards.map((ward) => {
            const percentage = Math.round((ward.occupied / ward.total) * 100);
            return (
              <Card
                key={ward.id}
                className={`p-5 border-l-4 ${ward.accent} hover:shadow-md transition-shadow`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-sm text-slate-900 leading-tight">
                    {ward.name}
                  </h3>
                  {ward.criticalCount ? (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-700 border border-red-200">
                      {ward.criticalCount} Critical
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                      Stable
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mb-3">Lead: {ward.nurse}</p>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Occupancy</span>
                    <span className="font-medium text-slate-900">
                      {ward.occupied}/{ward.total} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${ward.barColor}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Bed Occupancy Distribution */}
        <Card>
          <Card.Header
            title="Ward Bed Distribution"
            description="Occupied vs available beds across inpatient wards"
          />
          <Card.Body>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={wardOccupancyData} margin={{ top: 10, right: 20, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis
                    dataKey="ward"
                    stroke="#94A3B8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={{ stroke: '#E2E8F0' }}
                  />
                  <YAxis
                    stroke="#94A3B8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    formatter={(value) => (
                      <span className="text-xs text-slate-600 capitalize font-medium">{value}</span>
                    )}
                  />
                  <Bar dataKey="occupied" name="Occupied Beds" fill="#2563EB" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="available" name="Available Beds" fill="#CBD5E1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card.Body>
        </Card>

        {/* Chart 2: Vitals Recording Progress */}
        <Card>
          <Card.Header
            title="Hourly Vitals Logging"
            description="Target vs completed vitals checks during the current shift"
          />
          <Card.Body>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={vitalsTimelineData} margin={{ top: 10, right: 20, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="nurseColorRecorded" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis
                    dataKey="hour"
                    stroke="#94A3B8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={{ stroke: '#E2E8F0' }}
                  />
                  <YAxis
                    stroke="#94A3B8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    formatter={(value) => (
                      <span className="text-xs text-slate-600 capitalize font-medium">{value}</span>
                    )}
                  />
                  <Area
                    type="monotone"
                    dataKey="recorded"
                    name="Recorded Vitals"
                    stroke="#10B981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#nurseColorRecorded)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Pending Vitals Checklist */}
      <Card>
        <Card.Header
          title="Pending Vitals Checklist"
          description="Patients scheduled for vital signs observation this shift round"
        />
        <Card.Body className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5 w-12 text-center">Status</th>
                  <th className="px-6 py-3.5">Patient & Bed</th>
                  <th className="px-6 py-3.5">Scheduled Time</th>
                  <th className="px-6 py-3.5">Required Vitals</th>
                  <th className="px-6 py-3.5">Last Record</th>
                  <th className="px-6 py-3.5 text-right">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {checklist.map((item) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-slate-50/75 transition-colors ${
                      item.completed ? 'bg-slate-50/40 opacity-75' : ''
                    }`}
                  >
                    <td className="px-6 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleCheck(item.id)}
                        className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                        aria-label={`Mark vitals for ${item.patient} as complete`}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                            item.priority === 'Urgent'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          <Activity className="w-4 h-4" />
                        </div>
                        <div>
                          <p
                            className={`font-semibold ${
                              item.completed ? 'line-through text-slate-400' : 'text-slate-900'
                            }`}
                          >
                            {item.patient}
                          </p>
                          <p className="text-xs text-slate-500 font-medium">{item.bed}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700 font-mono text-xs">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {item.dueTime}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium text-xs">
                      {item.required}
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">{item.lastRecorded}</td>
                    <td className="px-6 py-4 text-right">
                      {item.completed ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          Done
                        </span>
                      ) : (
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                            item.priority === 'Urgent'
                              ? 'bg-red-50 text-red-700 border-red-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          {item.priority}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
