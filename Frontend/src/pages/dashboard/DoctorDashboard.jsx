import { Link } from 'react-router-dom';
import { Users, Clock, CheckCircle2, UserCheck, CalendarCheck2, ArrowUpRight } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';
import Card from '@/components/ui/Card';

const weeklyTrendData = [
  { day: 'Mon', completed: 14, scheduled: 2 },
  { day: 'Tue', completed: 16, scheduled: 3 },
  { day: 'Wed', completed: 12, scheduled: 4 },
  { day: 'Thu', completed: 15, scheduled: 1 },
  { day: 'Fri', completed: 18, scheduled: 5 },
  { day: 'Sat', completed: 8, scheduled: 2 },
  { day: 'Sun', completed: 2, scheduled: 0 },
];

const consultationTypeData = [
  { name: 'Follow-up', patients: 45, fill: '#2563EB' },
  { name: 'New Consultation', patients: 32, fill: '#10B981' },
  { name: 'Routine Checkup', patients: 20, fill: '#F59E0B' },
  { name: 'Post-Surgery', patients: 14, fill: '#8B5CF6' },
];

const upcomingAppointments = [
  {
    id: 'APT-301',
    patient: 'Kashif Mehmood',
    age: 48,
    gender: 'Male',
    time: '10:30 AM',
    type: 'Follow-up',
    reason: 'Hypertension Review',
    status: 'In Waiting Room',
    badgeVariant: 'warning',
  },
  {
    id: 'APT-302',
    patient: 'Samina Pervez',
    age: 35,
    gender: 'Female',
    time: '11:15 AM',
    type: 'New Consultation',
    reason: 'Chest Discomfort',
    status: 'Confirmed',
    badgeVariant: 'primary',
  },
  {
    id: 'APT-303',
    patient: 'Umar Farooq',
    age: 52,
    gender: 'Male',
    time: '12:00 PM',
    type: 'Routine Checkup',
    reason: 'Annual Cardiac Screening',
    status: 'Confirmed',
    badgeVariant: 'primary',
  },
  {
    id: 'APT-304',
    patient: 'Noreen Akhtar',
    age: 29,
    gender: 'Female',
    time: '02:30 PM',
    type: 'Follow-up',
    reason: 'ECG Report Evaluation',
    status: 'Confirmed',
    badgeVariant: 'primary',
  },
  {
    id: 'APT-305',
    patient: 'Abdul Wahab',
    age: 63,
    gender: 'Male',
    time: '03:15 PM',
    type: 'Post-Op Review',
    reason: 'Stent Placement Follow-up',
    status: 'Scheduled',
    badgeVariant: 'purple',
  },
];

const typeBadgeStyles = {
  'Follow-up': 'bg-blue-50 text-blue-700 border-blue-200',
  'New Consultation': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Routine Checkup': 'bg-amber-50 text-amber-700 border-amber-200',
  'Post-Op Review': 'bg-purple-50 text-purple-700 border-purple-200',
};

const statusBadgeStyles = {
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  primary: 'bg-blue-50 text-blue-700 border-blue-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

/**
 * Doctor Dashboard page providing consultation schedules, patient queues,
 * weekly workload volume, and clinical summaries.
 */
export function DoctorDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Doctor Dashboard</h1>
        <p className="text-slate-500">
          Welcome back, Dr. Ahmed Malik. You have 5 pending consultations scheduled for today.
        </p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Today's Patients */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">Today's Patients</p>
              <p className="text-2xl font-bold text-slate-900">12</p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                  <CalendarCheck2 className="w-3 h-3 mr-1" />
                  Scheduled
                </span>
                <span className="text-xs text-slate-400">for today</span>
              </div>
            </div>
            <div className="rounded-lg p-3 bg-blue-50 text-blue-600">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </Card>

        {/* Pending Appointments */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">Pending Appointments</p>
              <p className="text-2xl font-bold text-slate-900">5</p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                  In queue
                </span>
                <span className="text-xs text-slate-400">1 in waiting room</span>
              </div>
            </div>
            <div className="rounded-lg p-3 bg-blue-50 text-blue-600">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </Card>

        {/* Completed Today */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">Completed Today</p>
              <p className="text-2xl font-bold text-slate-900">7</p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                  58%
                </span>
                <span className="text-xs text-slate-400">of daily roster</span>
              </div>
            </div>
            <div className="rounded-lg p-3 bg-blue-50 text-blue-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </Card>

        {/* Total Patients */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">Total Patients</p>
              <p className="text-2xl font-bold text-slate-900">328</p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                  +18
                </span>
                <span className="text-xs text-slate-400">active this month</span>
              </div>
            </div>
            <div className="rounded-lg p-3 bg-blue-50 text-blue-600">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trend BarChart */}
        <Card>
          <Card.Header
            title="Weekly Appointment Trend"
            description="Completed consultations vs scheduled appointments this week"
          />
          <Card.Body>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyTrendData} margin={{ top: 10, right: 20, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis
                    dataKey="day"
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
                  <Bar dataKey="completed" name="Completed" fill="#2563EB" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="scheduled" name="Scheduled" fill="#93C5FD" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card.Body>
        </Card>

        {/* Consultation Types Breakdown */}
        <Card>
          <Card.Header
            title="Consultation Types (This Month)"
            description="Distribution of patient cases by appointment nature"
          />
          <Card.Body>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={consultationTypeData}
                  layout="vertical"
                  margin={{ top: 10, right: 20, left: 30, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                  <XAxis
                    type="number"
                    stroke="#94A3B8"
                    fontSize={12}
                    tickLine={false}
                    axisLine={{ stroke: '#E2E8F0' }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="#64748B"
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
                    formatter={(value) => [`${value} patients`, 'Total']}
                  />
                  <Bar dataKey="patients" radius={[0, 4, 4, 0]}>
                    {consultationTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Upcoming Appointments List */}
      <Card>
        <Card.Header
          title="Upcoming Appointments"
          description="Next consultations scheduled for today's session"
        />
        <Card.Body className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Time</th>
                  <th className="px-6 py-3.5">Patient Name</th>
                  <th className="px-6 py-3.5">Type</th>
                  <th className="px-6 py-3.5">Reason for Visit</th>
                  <th className="px-6 py-3.5 text-right">Status</th>
                  <th className="px-6 py-3.5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {upcomingAppointments.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/75 transition-colors">
                    <td className="px-6 py-4 font-mono font-semibold text-xs text-blue-600">
                      {item.time}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-900">{item.patient}</p>
                        <p className="text-xs text-slate-400">
                          {item.gender}, {item.age} yrs • ID: {item.id}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                          typeBadgeStyles[item.type] || 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm">{item.reason}</td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                          statusBadgeStyles[item.badgeVariant]
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <Link 
                          to={`/doctor/patients/PAT-1042`}
                          className="px-3 py-1.5 text-xs font-medium bg-white text-slate-700 border border-slate-300 rounded hover:bg-slate-50 transition-colors"
                        >
                          History
                        </Link>
                        <Link 
                          to={`/doctor/consultation/${item.id}`}
                          className="px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors shadow-sm"
                        >
                          Start Consult
                        </Link>
                      </div>
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
