import { useState } from 'react';
import {
  FlaskConical,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ArrowUpRight,
  Eye,
  Microscope,
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
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import Card from '@/components/ui/Card';

const weeklyWorkloadData = [
  { day: 'Mon', completed: 42, inProgress: 8 },
  { day: 'Tue', completed: 48, inProgress: 10 },
  { day: 'Wed', completed: 55, inProgress: 12 },
  { day: 'Thu', completed: 50, inProgress: 9 },
  { day: 'Fri', completed: 62, inProgress: 14 },
  { day: 'Sat', completed: 35, inProgress: 6 },
  { day: 'Sun', completed: 18, inProgress: 4 },
];

const categoryVolumeData = [
  { name: 'Hematology', value: 35, color: '#2563EB' },
  { name: 'Biochemistry', value: 28, color: '#10B981' },
  { name: 'Microbiology', value: 16, color: '#F59E0B' },
  { name: 'Endocrinology', value: 12, color: '#8B5CF6' },
  { name: 'Immunology', value: 9, color: '#EC4899' },
];

const initialPendingOrders = [
  {
    id: 'LAB-501',
    testName: 'Complete Blood Count (CBC)',
    patient: 'Sarah Khan',
    mrn: 'P-8891',
    doctor: 'Dr. Ahmed Malik',
    priority: 'Urgent',
    status: 'Sample Collected',
    receivedAt: '10:15 AM',
  },
  {
    id: 'LAB-502',
    testName: 'Liver Function Tests (LFT)',
    patient: 'Muhammad Bilal',
    mrn: 'P-6721',
    doctor: 'Dr. Fatima Noor',
    priority: 'Routine',
    status: 'In Analyzer',
    receivedAt: '10:40 AM',
  },
  {
    id: 'LAB-503',
    testName: 'Cardiac Troponin I (STAT)',
    patient: 'Rashid Minhas',
    mrn: 'P-9432',
    doctor: 'Dr. Tariq Mahmood',
    priority: 'Urgent',
    status: 'Sample Processing',
    receivedAt: '11:00 AM',
  },
  {
    id: 'LAB-504',
    testName: 'HbA1c & Fasting Blood Sugar',
    patient: 'Noreen Akhtar',
    mrn: 'P-3109',
    doctor: 'Dr. Sana Zafar',
    priority: 'Routine',
    status: 'Awaiting Specimen',
    receivedAt: '11:20 AM',
  },
  {
    id: 'LAB-505',
    testName: 'Serum Electrolytes (Na/K/Cl)',
    patient: 'Kamran Shah',
    mrn: 'P-5542',
    doctor: 'Dr. Zubair Rehman',
    priority: 'Routine',
    status: 'Sample Collected',
    receivedAt: '11:45 AM',
  },
];

const recentTestResults = [
  {
    id: 'RES-395',
    testName: 'Lipid Panel',
    patient: 'Kashif Mehmood',
    verifiedTime: '10:15 AM',
    resultSummary: 'Cholesterol 224 mg/dL',
    flag: 'Abnormal',
    statusVariant: 'warning',
  },
  {
    id: 'RES-396',
    testName: 'Thyroid Profile (TSH, FT4)',
    patient: 'Samina Pervez',
    verifiedTime: '10:45 AM',
    resultSummary: 'TSH 2.4 µIU/mL',
    flag: 'Normal',
    statusVariant: 'success',
  },
  {
    id: 'RES-397',
    testName: 'Renal Function Test (RFT)',
    patient: 'Umar Farooq',
    verifiedTime: '11:20 AM',
    resultSummary: 'Creatinine 1.1 mg/dL',
    flag: 'Normal',
    statusVariant: 'success',
  },
  {
    id: 'RES-398',
    testName: 'Urine Routine Examination',
    patient: 'Ayesha Siddiqui',
    verifiedTime: '11:50 AM',
    resultSummary: 'Protein Neg, Glucose Neg',
    flag: 'Normal',
    statusVariant: 'success',
  },
];

const statusStyles = {
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  danger: 'bg-red-50 text-red-700 border-red-200',
  primary: 'bg-blue-50 text-blue-700 border-blue-200',
};

/**
 * Lab Technician Dashboard page for monitoring sample intake, performing assays,
 * viewing diagnostic turnaround trends, and publishing verified test reports.
 */
export function LabTechDashboard() {
  const [orders, setOrders] = useState(initialPendingOrders);

  const handleUpdateStatus = (id) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: 'Completed' } : order
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Lab Technician Dashboard</h1>
        <p className="text-slate-500">
          Central Pathology Laboratory • Diagnostic Station 04 • Analyzer Line Active
        </p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Pending Tests */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">Pending Tests</p>
              <p className="text-2xl font-bold text-slate-900">18</p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                  In queue
                </span>
                <span className="text-xs text-slate-400">specimens logged</span>
              </div>
            </div>
            <div className="rounded-lg p-3 bg-blue-50 text-blue-600">
              <FlaskConical className="w-6 h-6" />
            </div>
          </div>
        </Card>

        {/* Completed Today */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">Completed Today</p>
              <p className="text-2xl font-bold text-slate-900">32</p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                  64%
                </span>
                <span className="text-xs text-slate-400">of daily goal</span>
              </div>
            </div>
            <div className="rounded-lg p-3 bg-blue-50 text-blue-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </Card>

        {/* Urgent Tests */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">Urgent Tests</p>
              <p className="text-2xl font-bold text-slate-900">4</p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-700">
                  STAT priority
                </span>
                <span className="text-xs text-slate-400">ER / ICU cases</span>
              </div>
            </div>
            <div className="rounded-lg p-3 bg-red-50 text-red-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
        </Card>

        {/* Total Reports */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">Total Reports</p>
              <p className="text-2xl font-bold text-slate-900">890</p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                  This month
                </span>
                <span className="text-xs text-slate-400">+11% vs Aug</span>
              </div>
            </div>
            <div className="rounded-lg p-3 bg-blue-50 text-blue-600">
              <FileText className="w-6 h-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Diagnostic Workload BarChart */}
        <Card>
          <Card.Header
            title="Weekly Diagnostic Workload"
            description="Completed assays vs pending specimens processed per day"
          />
          <Card.Body>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyWorkloadData} margin={{ top: 10, right: 20, left: -15, bottom: 0 }}>
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
                    formatter={(val) => (
                      <span className="text-xs text-slate-600 capitalize font-medium">{val}</span>
                    )}
                  />
                  <Bar dataKey="completed" name="Completed" fill="#2563EB" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="inProgress" name="In Progress" fill="#93C5FD" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card.Body>
        </Card>

        {/* Diagnostic Test Distribution Pie */}
        <Card>
          <Card.Header
            title="Test Volume by Discipline"
            description="Diagnostic requests broken down by pathology department"
          />
          <Card.Body>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryVolumeData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {categoryVolumeData.map((entry, index) => (
                      <Cell key={`lab-cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                    formatter={(val) => [`${val}%`, 'Share']}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    formatter={(val) => (
                      <span className="text-xs text-slate-600 font-medium">{val}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Two Column Grid: Pending Lab Orders and Recent Test Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Lab Orders List */}
        <Card>
          <Card.Header
            title="Pending Lab Orders"
            description="Awaiting specimen processing and test verification"
          />
          <Card.Body className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Test & Patient</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Priority</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/75 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                            <Microscope className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 leading-tight">
                              {order.testName}
                            </p>
                            <p className="text-xs text-slate-400">
                              {order.patient} • {order.id} • {order.doctor}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-600 font-medium">
                        {order.status}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${
                            order.priority === 'Urgent'
                              ? 'bg-red-50 text-red-700 border-red-200'
                              : 'bg-blue-50 text-blue-700 border-blue-200'
                          }`}
                        >
                          {order.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        {order.status === 'Completed' ? (
                          <span className="text-xs font-semibold text-emerald-600">Done</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(order.id)}
                            className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
                          >
                            Enter Results
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>

        {/* Recent Test Results */}
        <Card>
          <Card.Header
            title="Recent Test Results"
            description="Verified diagnostic reports released in today's run"
          />
          <Card.Body className="p-0">
            <div className="divide-y divide-slate-100">
              {recentTestResults.map((result) => (
                <div
                  key={result.id}
                  className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/75 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 text-sm">
                        {result.testName}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          statusStyles[result.statusVariant]
                        }`}
                      >
                        {result.flag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Patient: <span className="font-medium text-slate-700">{result.patient}</span>{' '}
                      • {result.id}
                    </p>
                    <div className="flex items-center gap-2 pt-0.5 text-xs">
                      <span className="font-medium text-slate-700">
                        Result: {result.resultSummary}
                      </span>
                      <span className="text-slate-400">• Verified at {result.verifiedTime}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </button>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
