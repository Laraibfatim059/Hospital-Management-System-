import {
  Calendar,
  Pill,
  Receipt,
  FileText,
  Clock,
  MapPin,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import Card from '@/components/ui/Card';
import { useAuthStore } from '@/store/useAuthStore';

const vitalsHistoryData = [
  { visit: 'May 12', systolic: 130, diastolic: 85, pulse: 76 },
  { visit: 'Jun 20', systolic: 128, diastolic: 82, pulse: 74 },
  { visit: 'Jul 15', systolic: 122, diastolic: 80, pulse: 72 },
  { visit: 'Aug 18', systolic: 120, diastolic: 78, pulse: 70 },
  { visit: 'Sep 24', systolic: 118, diastolic: 76, pulse: 68 },
];

const medicalExpensesData = [
  { month: 'Apr', amount: 3500 },
  { month: 'May', amount: 8200 },
  { month: 'Jun', amount: 4100 },
  { month: 'Jul', amount: 12500 },
  { month: 'Aug', amount: 6000 },
  { month: 'Sep', amount: 4500 },
];

const upcomingAppointments = [
  {
    id: 'APT-901',
    doctor: 'Dr. Ahmed Malik',
    specialty: 'Cardiologist',
    department: 'Cardiology Clinic',
    room: 'Room 204, 2nd Floor',
    date: 'Tomorrow, Sep 28',
    time: '10:30 AM',
    status: 'Confirmed',
    badgeVariant: 'success',
  },
  {
    id: 'APT-902',
    doctor: 'Dr. Fatima Noor',
    specialty: 'Orthopedic Surgeon',
    department: 'Bone & Joint Center',
    room: 'Room 108, 1st Floor',
    date: 'Wednesday, Oct 04',
    time: '02:00 PM',
    status: 'Scheduled',
    badgeVariant: 'primary',
  },
];

const activePrescriptions = [
  {
    id: 'RX-771',
    medication: 'Atorvastatin (Lipitor)',
    dosage: '20 mg',
    instructions: '1 tablet daily at bedtime',
    doctor: 'Dr. Ahmed Malik',
    startDate: 'Sep 10, 2026',
    duration: '30 Days',
    status: 'Active',
    refillsRemaining: 2,
  },
  {
    id: 'RX-772',
    medication: 'Metformin HCl',
    dosage: '500 mg',
    instructions: '1 tablet twice daily with meals',
    doctor: 'Dr. Tariq Mahmood',
    startDate: 'Aug 15, 2026',
    duration: '60 Days',
    status: 'Active',
    refillsRemaining: 1,
  },
  {
    id: 'RX-773',
    medication: 'Lisinopril',
    dosage: '10 mg',
    instructions: '1 tablet once every morning',
    doctor: 'Dr. Ahmed Malik',
    startDate: 'Sep 01, 2026',
    duration: '90 Days',
    status: 'Active',
    refillsRemaining: 3,
  },
];

/**
 * Patient Dashboard page displaying upcoming visits, personal prescriptions,
 * lab test status, vitals logs, and outstanding medical bills.
 */
export function PatientDashboard() {
  const user = useAuthStore((state) => state.user);
  const patientName = user?.name || user?.fullName || 'Sarah Khan';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Welcome back, {patientName}
        </h1>
        <p className="text-slate-500">
          MRN: P-2024-8891 • Blood Group: B+ • Primary Physician: Dr. Ahmed Malik
        </p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Upcoming Appointments */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">Upcoming Appointments</p>
              <p className="text-2xl font-bold text-slate-900">2</p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                  Next: Tomorrow
                </span>
                <span className="text-xs text-slate-400">10:30 AM</span>
              </div>
            </div>
            <div className="rounded-lg p-3 bg-blue-50 text-blue-600">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
        </Card>

        {/* Active Prescriptions */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">Active Prescriptions</p>
              <p className="text-2xl font-bold text-slate-900">3</p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                  All valid
                </span>
                <span className="text-xs text-slate-400">6 refills left</span>
              </div>
            </div>
            <div className="rounded-lg p-3 bg-emerald-50 text-emerald-600">
              <Pill className="w-6 h-6" />
            </div>
          </div>
        </Card>

        {/* Pending Bills */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">Pending Bills</p>
              <p className="text-2xl font-bold text-slate-900">1</p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                  PKR 4,500 due
                </span>
                <span className="text-xs text-slate-400">Lab invoice</span>
              </div>
            </div>
            <div className="rounded-lg p-3 bg-amber-50 text-amber-600">
              <Receipt className="w-6 h-6" />
            </div>
          </div>
        </Card>

        {/* Lab Reports */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">Lab Reports</p>
              <p className="text-2xl font-bold text-slate-900">5</p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">
                  1 new ready
                </span>
                <span className="text-xs text-slate-400">CBC test</span>
              </div>
            </div>
            <div className="rounded-lg p-3 bg-purple-50 text-purple-600">
              <FileText className="w-6 h-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vitals History LineChart */}
        <Card>
          <Card.Header
            title="Blood Pressure & Pulse History"
            description="Measurements recorded during clinical consultations"
          />
          <Card.Body>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={vitalsHistoryData} margin={{ top: 10, right: 20, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis
                    dataKey="visit"
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
                    domain={[60, 150]}
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
                  <Line
                    type="monotone"
                    dataKey="systolic"
                    name="Systolic (mmHg)"
                    stroke="#2563EB"
                    strokeWidth={2.5}
                    dot={{ fill: '#2563EB', r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="diastolic"
                    name="Diastolic (mmHg)"
                    stroke="#10B981"
                    strokeWidth={2.5}
                    dot={{ fill: '#10B981', r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="pulse"
                    name="Pulse (bpm)"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    strokeDasharray="3 3"
                    dot={{ fill: '#F59E0B', r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card.Body>
        </Card>

        {/* Expenses BarChart */}
        <Card>
          <Card.Header
            title="Medical Expenses (Last 6 Months)"
            description="Overview of outpatient, pharmacy, and laboratory fees in PKR"
          />
          <Card.Body>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={medicalExpensesData} margin={{ top: 10, right: 20, left: 5, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis
                    dataKey="month"
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
                    tickFormatter={(val) => `${val / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                    formatter={(value) => [`PKR ${Number(value).toLocaleString()}`, 'Expenses']}
                  />
                  <Bar dataKey="amount" name="Total Spent" fill="#2563EB" radius={[4, 4, 0, 0]} />
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
          description="Your scheduled appointments with doctors and specialists"
        />
        <Card.Body className="p-0">
          <div className="divide-y divide-slate-100">
            {upcomingAppointments.map((apt) => (
              <div
                key={apt.id}
                className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/75 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-xl p-3 bg-blue-50 text-blue-600 shrink-0">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-slate-900 text-base">{apt.doctor}</h4>
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {apt.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{apt.specialty} • {apt.department}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                      <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        {apt.date} at {apt.time}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {apt.room}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:self-center">
                  <button
                    type="button"
                    className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
                  >
                    Reschedule
                  </button>
                  <button
                    type="button"
                    className="px-3.5 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>

      {/* Recent Prescriptions List */}
      <Card>
        <Card.Header
          title="Active Prescriptions"
          description="Currently active medical treatments and medication regimens"
        />
        <Card.Body className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Medication & Dosage</th>
                  <th className="px-6 py-3.5">Instructions</th>
                  <th className="px-6 py-3.5">Prescribed By</th>
                  <th className="px-6 py-3.5">Duration</th>
                  <th className="px-6 py-3.5 text-right">Refills Left</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activePrescriptions.map((rx) => (
                  <tr key={rx.id} className="hover:bg-slate-50/75 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                          <Pill className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{rx.medication}</p>
                          <p className="text-xs text-slate-400 font-medium">Dosage: {rx.dosage}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm font-medium">
                      {rx.instructions}
                    </td>
                    <td className="px-6 py-4 text-slate-700 font-medium">{rx.doctor}</td>
                    <td className="px-6 py-4 text-slate-500 text-xs">{rx.duration}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {rx.refillsRemaining} remaining
                      </span>
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
