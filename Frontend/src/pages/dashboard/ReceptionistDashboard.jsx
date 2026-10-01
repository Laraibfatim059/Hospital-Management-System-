import { useState } from 'react';
import {
  UserCheck,
  Calendar,
  UserPlus,
  Clock,
  ArrowUpRight,
  CalendarPlus,
  Search,
  CheckCircle2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import Card from '@/components/ui/Card';

const hourlyFootfallData = [
  { hour: '08:00', arrivals: 8, scheduled: 6 },
  { hour: '09:00', arrivals: 18, scheduled: 15 },
  { hour: '10:00', arrivals: 25, scheduled: 20 },
  { hour: '11:00', arrivals: 22, scheduled: 18 },
  { hour: '12:00', arrivals: 14, scheduled: 12 },
  { hour: '13:00', arrivals: 10, scheduled: 8 },
  { hour: '14:00', arrivals: 16, scheduled: 14 },
  { hour: '15:00', arrivals: 12, scheduled: 10 },
];

const statusDistributionData = [
  { name: 'Checked In', value: 24, color: '#2563EB' },
  { name: 'Completed', value: 18, color: '#10B981' },
  { name: 'In Waiting', value: 6, color: '#F59E0B' },
  { name: 'In Consult', value: 5, color: '#8B5CF6' },
  { name: 'No Show', value: 2, color: '#EF4444' },
];

const initialQueue = [
  {
    token: 'T-101',
    patient: 'Muhammad Tahir',
    phone: '0301-8273645',
    doctor: 'Dr. Ahmed Malik',
    dept: 'Cardiology',
    time: '10:15 AM',
    status: 'In Consultation',
    statusVariant: 'purple',
  },
  {
    token: 'T-102',
    patient: 'Farzana Kausar',
    phone: '0322-4918234',
    doctor: 'Dr. Fatima Noor',
    dept: 'Orthopedics',
    time: '10:30 AM',
    status: 'Checked In',
    statusVariant: 'primary',
  },
  {
    token: 'T-103',
    patient: 'Ali Raza',
    phone: '0345-1234567',
    doctor: 'Dr. Sana Zafar',
    dept: 'Pediatrics',
    time: '10:45 AM',
    status: 'Waiting',
    statusVariant: 'warning',
  },
  {
    token: 'T-104',
    patient: 'Khadija Bibi',
    phone: '0313-9876543',
    doctor: 'Dr. Tariq Mahmood',
    dept: 'Neurology',
    time: '11:00 AM',
    status: 'Waiting',
    statusVariant: 'warning',
  },
  {
    token: 'T-105',
    patient: 'Bilal Hassan',
    phone: '0333-5566778',
    doctor: 'Dr. Zubair Rehman',
    dept: 'General Medicine',
    time: '11:15 AM',
    status: 'Scheduled',
    statusVariant: 'slate',
  },
];

const statusStyles = {
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
  primary: 'bg-blue-50 text-blue-700 border-blue-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  slate: 'bg-slate-100 text-slate-700 border-slate-200',
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

/**
 * Receptionist Dashboard page managing front desk operations, patient check-ins,
 * appointments timeline, and registration workflows.
 */
export function ReceptionistDashboard() {
  const [queue, setQueue] = useState(initialQueue);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCheckIn = (token) => {
    setQueue((prev) =>
      prev.map((item) =>
        item.token === token
          ? { ...item, status: 'Checked In', statusVariant: 'primary' }
          : item
      )
    );
  };

  const filteredQueue = queue.filter(
    (item) =>
      item.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.token.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header and Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Receptionist Dashboard</h1>
          <p className="text-slate-500">
            Front Desk Desk 01 • Patient Arrival, Triage & Registration Terminal
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-sm cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            Register Patient
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-sm transition-colors cursor-pointer"
          >
            <CalendarPlus className="w-4 h-4" />
            Book Appointment
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Today's Check-ins */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">Today's Check-ins</p>
              <p className="text-2xl font-bold text-slate-900">24</p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                  +6
                </span>
                <span className="text-xs text-slate-400">in last hour</span>
              </div>
            </div>
            <div className="rounded-lg p-3 bg-blue-50 text-blue-600">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>
        </Card>

        {/* Pending Appointments */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">Pending Appointments</p>
              <p className="text-2xl font-bold text-slate-900">15</p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                  Today's slots
                </span>
                <span className="text-xs text-slate-400">remaining</span>
              </div>
            </div>
            <div className="rounded-lg p-3 bg-blue-50 text-blue-600">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
        </Card>

        {/* New Registrations */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">New Registrations</p>
              <p className="text-2xl font-bold text-slate-900">8</p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                  First-time
                </span>
                <span className="text-xs text-slate-400">issued MRN</span>
              </div>
            </div>
            <div className="rounded-lg p-3 bg-blue-50 text-blue-600">
              <UserPlus className="w-6 h-6" />
            </div>
          </div>
        </Card>

        {/* Waiting Patients */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">Waiting Patients</p>
              <p className="text-2xl font-bold text-slate-900">6</p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">
                  Avg wait: 14m
                </span>
                <span className="text-xs text-slate-400">lobby area</span>
              </div>
            </div>
            <div className="rounded-lg p-3 bg-blue-50 text-blue-600">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Footfall Chart */}
        <Card>
          <Card.Header
            title="Hourly Patient Flow"
            description="Patient arrivals vs scheduled appointments today"
          />
          <Card.Body>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyFootfallData} margin={{ top: 10, right: 20, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="receptionArrivals" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
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
                    dataKey="arrivals"
                    name="Actual Arrivals"
                    stroke="#2563EB"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#receptionArrivals)"
                  />
                  <Area
                    type="monotone"
                    dataKey="scheduled"
                    name="Scheduled Slots"
                    stroke="#94A3B8"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    fill="transparent"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card.Body>
        </Card>

        {/* Appointment Status Pie */}
        <Card>
          <Card.Header
            title="Appointment Status Distribution"
            description="Real-time breakdown of today's 55 registered visits"
          />
          <Card.Body>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistributionData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {statusDistributionData.map((entry, index) => (
                      <Cell key={`status-cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                    formatter={(value) => [`${value} patients`, 'Count']}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    formatter={(value) => (
                      <span className="text-xs text-slate-600 font-medium">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Today's Appointments Timeline / Queue */}
      <Card>
        <Card.Header
          title="Today's Appointments Timeline"
          description="Live check-in status and consultation queue"
        >
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search token, patient, doctor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Token #</th>
                  <th className="px-6 py-3.5">Patient Details</th>
                  <th className="px-6 py-3.5">Doctor & Dept</th>
                  <th className="px-6 py-3.5">Time</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredQueue.map((item) => (
                  <tr key={item.token} className="hover:bg-slate-50/75 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold text-xs px-2.5 py-1 bg-slate-100 text-slate-800 rounded">
                        {item.token}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-900">{item.patient}</p>
                        <p className="text-xs text-slate-400">{item.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-800">{item.doctor}</p>
                        <p className="text-xs text-slate-500">{item.dept}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-600">{item.time}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                          statusStyles[item.statusVariant]
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {item.status === 'Waiting' || item.status === 'Scheduled' ? (
                        <button
                          type="button"
                          onClick={() => handleCheckIn(item.token)}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Check In
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400 font-medium">Checked</span>
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
