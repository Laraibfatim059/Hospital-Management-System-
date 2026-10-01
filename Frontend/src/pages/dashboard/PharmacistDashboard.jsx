import { useState } from 'react';
import {
  ClipboardList,
  CheckCircle2,
  AlertTriangle,
  Package,
  ArrowUpRight,
  Pill,
  Truck,
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

const dailyDispensationData = [
  { day: 'Mon', dispensed: 52 },
  { day: 'Tue', dispensed: 58 },
  { day: 'Wed', dispensed: 48 },
  { day: 'Thu', dispensed: 61 },
  { day: 'Fri', dispensed: 70 },
  { day: 'Sat', dispensed: 45 },
  { day: 'Sun', dispensed: 22 },
];

const categoryStockData = [
  { name: 'Antibiotics', value: 28, color: '#2563EB' },
  { name: 'Analgesics', value: 22, color: '#10B981' },
  { name: 'Cardiovascular', value: 20, color: '#F59E0B' },
  { name: 'Respiratory', value: 18, color: '#8B5CF6' },
  { name: 'Vitamins & Supp.', value: 12, color: '#EC4899' },
];

const initialPendingPrescriptions = [
  {
    id: 'RX-901',
    patient: 'Sarah Khan',
    mrn: 'P-8891',
    doctor: 'Dr. Ahmed Malik',
    itemsCount: 3,
    time: '10:45 AM',
    priority: 'Urgent',
    status: 'Ready to Dispense',
  },
  {
    id: 'RX-902',
    patient: 'Muhammad Bilal',
    mrn: 'P-6721',
    doctor: 'Dr. Fatima Noor',
    itemsCount: 2,
    time: '11:10 AM',
    priority: 'Routine',
    status: 'In Review',
  },
  {
    id: 'RX-903',
    patient: 'Khadija Begum',
    mrn: 'P-9432',
    doctor: 'Dr. Tariq Mahmood',
    itemsCount: 4,
    time: '11:25 AM',
    priority: 'Urgent',
    status: 'Ready to Dispense',
  },
  {
    id: 'RX-904',
    patient: 'Tariq Aziz',
    mrn: 'P-3109',
    doctor: 'Dr. Sana Zafar',
    itemsCount: 1,
    time: '11:40 AM',
    priority: 'Routine',
    status: 'In Review',
  },
  {
    id: 'RX-905',
    patient: 'Nadia Pervez',
    mrn: 'P-5542',
    doctor: 'Dr. Zubair Rehman',
    itemsCount: 2,
    time: '12:00 PM',
    priority: 'Routine',
    status: 'Ready to Dispense',
  },
];

const lowStockItems = [
  {
    id: 'MED-101',
    name: 'Amoxicillin 500mg',
    category: 'Antibiotics',
    currentStock: 15,
    minThreshold: 50,
    unit: 'Boxes',
    status: 'Critical',
  },
  {
    id: 'MED-102',
    name: 'Paracetamol IV 1000mg',
    category: 'Analgesics',
    currentStock: 20,
    minThreshold: 80,
    unit: 'Vials',
    status: 'Critical',
  },
  {
    id: 'MED-103',
    name: 'Insulin Glargine 100 IU/mL',
    category: 'Endocrinology',
    currentStock: 8,
    minThreshold: 30,
    unit: 'Pens',
    status: 'Critical',
  },
  {
    id: 'MED-104',
    name: 'Omeprazole 40mg IV',
    category: 'Gastrointestinal',
    currentStock: 25,
    minThreshold: 60,
    unit: 'Vials',
    status: 'Low',
  },
];

/**
 * Pharmacist Dashboard page for monitoring drug dispensation, managing pending orders,
 * tracking medication inventory, and responding to low-stock alerts.
 */
export function PharmacistDashboard() {
  const [prescriptions, setPrescriptions] = useState(initialPendingPrescriptions);

  const handleDispense = (id) => {
    setPrescriptions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'Dispensed' } : item
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Pharmacist Dashboard</h1>
        <p className="text-slate-500">
          Central Hospital Pharmacy • Dispensation Counter 02 • Active Inventory Monitor
        </p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Pending Prescriptions */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">Pending Prescriptions</p>
              <p className="text-2xl font-bold text-slate-900">12</p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                  4 urgent
                </span>
                <span className="text-xs text-slate-400">awaiting check</span>
              </div>
            </div>
            <div className="rounded-lg p-3 bg-blue-50 text-blue-600">
              <ClipboardList className="w-6 h-6" />
            </div>
          </div>
        </Card>

        {/* Dispensed Today */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">Dispensed Today</p>
              <p className="text-2xl font-bold text-slate-900">45</p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                  +15%
                </span>
                <span className="text-xs text-slate-400">vs yesterday</span>
              </div>
            </div>
            <div className="rounded-lg p-3 bg-blue-50 text-blue-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </Card>

        {/* Low Stock Items */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">Low Stock Items</p>
              <p className="text-2xl font-bold text-slate-900">8</p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-700">
                  Action required
                </span>
                <span className="text-xs text-slate-400">below min level</span>
              </div>
            </div>
            <div className="rounded-lg p-3 bg-red-50 text-red-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
        </Card>

        {/* Total Inventory */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">Total Inventory</p>
              <p className="text-2xl font-bold text-slate-900">1,240</p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                  98% in-stock
                </span>
                <span className="text-xs text-slate-400">active SKUs</span>
              </div>
            </div>
            <div className="rounded-lg p-3 bg-blue-50 text-blue-600">
              <Package className="w-6 h-6" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dispensation BarChart */}
        <Card>
          <Card.Header
            title="Daily Dispensation Volume"
            description="Total completed medication orders filled this week"
          />
          <Card.Body>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyDispensationData} margin={{ top: 10, right: 20, left: -15, bottom: 0 }}>
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
                    formatter={(val) => [`${val} orders`, 'Dispensed']}
                  />
                  <Bar dataKey="dispensed" name="Dispensed" fill="#2563EB" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card.Body>
        </Card>

        {/* Stock Categories PieChart */}
        <Card>
          <Card.Header
            title="Medicine Stock Categories"
            description="Inventory distribution by therapeutic group"
          />
          <Card.Body>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryStockData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {categoryStockData.map((entry, index) => (
                      <Cell key={`cat-cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                    formatter={(val) => [`${val}%`, 'Stock Share']}
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

      {/* Two Column Grid: Pending Prescriptions and Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Prescriptions List */}
        <Card>
          <Card.Header
            title="Pending Prescriptions"
            description="Prescriptions ready for verification and dispensing"
          />
          <Card.Body className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Prescription & Patient</th>
                    <th className="px-4 py-3">Doctor</th>
                    <th className="px-4 py-3">Priority</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {prescriptions.map((rx) => (
                    <tr key={rx.id} className="hover:bg-slate-50/75 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                            <Pill className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 leading-tight">
                              {rx.patient}
                            </p>
                            <p className="text-xs text-slate-400">
                              {rx.id} • {rx.itemsCount} items
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-600 font-medium">
                        {rx.doctor}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${
                            rx.priority === 'Urgent'
                              ? 'bg-red-50 text-red-700 border-red-200'
                              : 'bg-blue-50 text-blue-700 border-blue-200'
                          }`}
                        >
                          {rx.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        {rx.status === 'Dispensed' ? (
                          <span className="text-xs font-semibold text-emerald-600">Dispensed</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleDispense(rx.id)}
                            className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
                          >
                            Dispense
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

        {/* Low Stock Alerts */}
        <Card>
          <Card.Header
            title="Low Stock Alerts"
            description="Medications currently running below minimum safety threshold"
          />
          <Card.Body className="p-0">
            <div className="divide-y divide-slate-100">
              {lowStockItems.map((med) => {
                return (
                  <div
                    key={med.id}
                    className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/75 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 text-sm">
                          {med.name}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            med.status === 'Critical'
                              ? 'bg-red-100 text-red-700 border border-red-200'
                              : 'bg-amber-100 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {med.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Category: {med.category} • SKU: {med.id}
                      </p>
                      <div className="flex items-center gap-2 pt-1 text-xs">
                        <span className="font-semibold text-red-600">
                          {med.currentStock} {med.unit}
                        </span>
                        <span className="text-slate-400">/ min {med.minThreshold} {med.unit}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer shrink-0"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      Reorder
                    </button>
                  </div>
                );
              })}
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
