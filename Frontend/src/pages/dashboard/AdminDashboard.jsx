import { 
  Users, 
  Stethoscope, 
  Calendar, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  UserPlus, 
  FileText, 
  BedDouble, 
  Package, 
  FlaskConical, 
  UserCog,
  HeartPulse
} from 'lucide-react';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import Card from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

// ==========================================
// MOCK DATA
// ==========================================

const departmentData = [
  { name: 'Cardiology', value: 25 },
  { name: 'Orthopedics', value: 18 },
  { name: 'Neurology', value: 15 },
  { name: 'Pediatrics', value: 22 },
  { name: 'General', value: 20 },
];

const DEPARTMENT_COLORS = ['#2563EB', '#10B981', '#F59E0B', '#8B5CF6', '#06B6D4'];

const revenueData = [
  { day: 'Mon', revenue: 450000 },
  { day: 'Tue', revenue: 520000 },
  { day: 'Wed', revenue: 480000 },
  { day: 'Thu', revenue: 610000 },
  { day: 'Fri', revenue: 590000 },
  { day: 'Sat', revenue: 350000 },
  { day: 'Sun', revenue: 200000 },
];

const recentAppointments = [
  { id: 'APT-1001', patient: 'Sarah Khan', doctor: 'Dr. Ahmed Malik', department: 'Cardiology', time: '09:30 AM', status: 'Completed', statusVariant: 'success' },
  { id: 'APT-1002', patient: 'Muhammad Bilal', doctor: 'Dr. Fatima Noor', department: 'Orthopedics', time: '10:15 AM', status: 'In Progress', statusVariant: 'primary' },
  { id: 'APT-1003', patient: 'Ayesha Siddiqui', doctor: 'Dr. Tariq Mahmood', department: 'Neurology', time: '11:00 AM', status: 'Scheduled', statusVariant: 'warning' },
  { id: 'APT-1004', patient: 'Hamza Ali', doctor: 'Dr. Sana Zafar', department: 'Pediatrics', time: '11:45 AM', status: 'Scheduled', statusVariant: 'warning' },
];

const recentPatients = [
  { id: 'PAT-8812', name: 'Zainab Bibi', age: 34, gender: 'F', condition: 'Fever', date: 'Today, 08:15 AM' },
  { id: 'PAT-8813', name: 'Usman Ghani', age: 45, gender: 'M', condition: 'Chest Pain', date: 'Today, 09:00 AM' },
  { id: 'PAT-8814', name: 'Rabia Khalid', age: 28, gender: 'F', condition: 'Routine Checkup', date: 'Today, 09:45 AM' },
  { id: 'PAT-8815', name: 'Fahad Mustafa', age: 52, gender: 'M', condition: 'Diabetes Follow-up', date: 'Today, 10:30 AM' },
];

const recentPayments = [
  { id: 'INV-401', patient: 'Sarah Khan', amount: 'PKR 15,000', method: 'Credit Card', status: 'Paid', statusVariant: 'success', date: 'Today, 10:00 AM' },
  { id: 'INV-402', patient: 'Muhammad Bilal', amount: 'PKR 8,500', method: 'Cash', status: 'Paid', statusVariant: 'success', date: 'Today, 11:30 AM' },
  { id: 'INV-403', patient: 'Ayesha Siddiqui', amount: 'PKR 22,000', method: 'Insurance', status: 'Pending', statusVariant: 'warning', date: 'Today, 12:15 PM' },
];

const notifications = [
  { id: 1, type: 'alert', message: 'ICU Bed 4 is now occupied.', time: '10 mins ago', icon: BedDouble, color: 'text-red-600', bg: 'bg-red-100' },
  { id: 2, type: 'warning', message: 'Blood Bank: O- inventory critically low (2 units remaining).', time: '45 mins ago', icon: HeartPulse, color: 'text-amber-600', bg: 'bg-amber-100' },
  { id: 3, type: 'info', message: 'Dr. Tariq Mahmood has started their shift.', time: '2 hours ago', icon: Stethoscope, color: 'text-blue-600', bg: 'bg-blue-100' },
  { id: 4, type: 'success', message: 'Daily data backup completed successfully.', time: '5 hours ago', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-100' },
];

const statusStyles = {
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  primary: 'bg-blue-50 text-blue-700 border-blue-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  danger: 'bg-red-50 text-red-700 border-red-200',
};

// ==========================================
// COMPONENT
// ==========================================

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Admin Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Real-time hospital metrics, administrative controls, and system overview.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 overflow-x-auto pb-1 sm:pb-0">
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            <UserPlus className="w-4 h-4 mr-2" />
            New Patient
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            <Stethoscope className="w-4 h-4 mr-2" />
            Add Doctor
          </Button>
          <Button variant="primary" size="sm" className="whitespace-nowrap">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* KPI Stats Grid - 4 columns on large screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <Card className="p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Patients</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">12,847</p>
              <span className="inline-flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <ArrowUpRight className="w-3 h-3 mr-0.5" /> +12% this month
              </span>
            </div>
            <div className="rounded-lg p-3 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </Card>

        {/* KPI 2 */}
        <Card className="p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Doctors</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">142</p>
              <span className="inline-flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <ArrowUpRight className="w-3 h-3 mr-0.5" /> +3 newly joined
              </span>
            </div>
            <div className="rounded-lg p-3 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
              <Stethoscope className="w-6 h-6" />
            </div>
          </div>
        </Card>

        {/* KPI 3 */}
        <Card className="p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Staff</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">450</p>
              <span className="inline-flex items-center text-xs font-medium text-slate-500 dark:text-slate-400">
                Nurses, Admins, Techs
              </span>
            </div>
            <div className="rounded-lg p-3 bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
              <UserCog className="w-6 h-6" />
            </div>
          </div>
        </Card>

        {/* KPI 4 */}
        <Card className="p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Appointments Today</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">186</p>
              <span className="inline-flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <ArrowUpRight className="w-3 h-3 mr-0.5" /> 84 completed
              </span>
            </div>
            <div className="rounded-lg p-3 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
        </Card>

        {/* KPI 5 */}
        <Card className="p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Admissions</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">92</p>
              <span className="inline-flex items-center text-xs font-semibold text-red-600 dark:text-red-400">
                <ArrowDownRight className="w-3 h-3 mr-0.5" /> -4 since yesterday
              </span>
            </div>
            <div className="rounded-lg p-3 bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </Card>

        {/* KPI 6 */}
        <Card className="p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Available Beds</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">48<span className="text-base text-slate-500">/150</span></p>
              <span className="inline-flex items-center text-xs font-semibold text-amber-600 dark:text-amber-400">
                32% capacity remaining
              </span>
            </div>
            <div className="rounded-lg p-3 bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
              <BedDouble className="w-6 h-6" />
            </div>
          </div>
        </Card>

        {/* KPI 7 */}
        <Card className="p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending Lab Tests</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">34</p>
              <span className="inline-flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400">
                12 urgent requests
              </span>
            </div>
            <div className="rounded-lg p-3 bg-cyan-50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400">
              <FlaskConical className="w-6 h-6" />
            </div>
          </div>
        </Card>

        {/* KPI 8 */}
        <Card className="p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Low Stock Meds</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">18</p>
              <span className="inline-flex items-center text-xs font-semibold text-red-600 dark:text-red-400">
                Requires restocking
              </span>
            </div>
            <div className="rounded-lg p-3 bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
              <Package className="w-6 h-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Revenue Summary */}
        <Card className="lg:col-span-2">
          <Card.Header
            title="Revenue / Billing Summary"
            description="Daily cash flow and insurance claims over the last 7 days"
            action={
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                  Total: PKR 3.2M
                </span>
              </div>
            }
          />
          <Card.Body>
            <div className="h-72 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis 
                    dataKey="day" 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val) => `PKR ${(val/1000)}k`}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value) => [`PKR ${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card.Body>
        </Card>

        {/* Department Distribution */}
        <Card>
          <Card.Header
            title="Department Traffic"
            description="Consultation distribution by wing"
          />
          <Card.Body>
            <div className="h-72 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                  >
                    {departmentData.map((entry, index) => (
                      <Cell
                        key={`cell-${entry.name}`}
                        fill={DEPARTMENT_COLORS[index % DEPARTMENT_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value) => [`${value}%`, 'Share']}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    formatter={(value) => <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Lists Section: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Patients */}
        <Card>
          <Card.Header
            title="Newly Registered Patients"
            description="Latest patients added to the system"
            action={<Button variant="ghost" size="sm">View All</Button>}
          />
          <Card.Body className="p-0">
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {recentPatients.map((patient) => (
                <div key={patient.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <Avatar name={patient.name} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{patient.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {patient.id} • {patient.gender}, {patient.age} yrs • {patient.condition}
                    </p>
                  </div>
                  <div className="text-right text-xs text-slate-400 dark:text-slate-500">
                    {patient.date}
                  </div>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>

        {/* Notifications / Activity Feed */}
        <Card>
          <Card.Header
            title="System Notifications"
            description="Real-time alerts and activity logs"
            action={<Button variant="ghost" size="sm">Mark all read</Button>}
          />
          <Card.Body className="p-0">
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {notifications.map((notif) => (
                <div key={notif.id} className="p-4 flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className={`mt-0.5 shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${notif.bg} ${notif.color}`}>
                    <notif.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-800 dark:text-slate-200 leading-snug">{notif.message}</p>
                    <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>

        {/* Recent Appointments */}
        <Card className="lg:col-span-1">
          <Card.Header
            title="Today's Appointments"
            description="Overview of scheduled visits"
          />
          <Card.Body className="p-0 overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 text-xs uppercase font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-4 py-3">Patient</th>
                  <th className="px-4 py-3">Doctor</th>
                  <th className="px-4 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {recentAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                      <p>{apt.patient}</p>
                      <p className="text-[10px] text-slate-400 font-normal">{apt.time}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                      <p>{apt.doctor}</p>
                      <p className="text-[10px] text-slate-400 font-normal">{apt.department}</p>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold border ${statusStyles[apt.statusVariant]}`}>
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card.Body>
        </Card>

        {/* Recent Payments */}
        <Card className="lg:col-span-1">
          <Card.Header
            title="Recent Payments"
            description="Latest billing transactions"
          />
          <Card.Body className="p-0 overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 text-xs uppercase font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-4 py-3">Invoice</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {recentPayments.map((pay) => (
                  <tr key={pay.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900 dark:text-white">{pay.patient}</p>
                      <p className="text-[10px] text-slate-400 font-normal">{pay.id} • {pay.date}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-slate-700 dark:text-slate-300 font-semibold">{pay.amount}</p>
                      <p className="text-[10px] text-slate-400 font-normal">{pay.method}</p>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold border ${statusStyles[pay.statusVariant]}`}>
                        {pay.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card.Body>
        </Card>

      </div>
    </div>
  );
}

export default AdminDashboard;
