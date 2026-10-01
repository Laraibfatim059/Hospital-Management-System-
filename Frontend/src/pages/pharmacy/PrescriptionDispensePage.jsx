import { useState } from 'react';
import { 
  Search, 
  CheckCircle,
  FileText,
  AlertTriangle
} from 'lucide-react';
import toast from 'react-hot-toast';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

// Mock Prescription Data
const initialPrescriptions = [
  {
    id: 'RX-1092',
    date: '2023-10-18',
    patient: 'Kashif Mehmood',
    doctor: 'Dr. Ahmed Malik',
    status: 'Pending',
    medications: [
      { name: 'Lisinopril 10mg', dosage: '1x Daily', quantity: 30, stock: 120 },
      { name: 'Aspirin 81mg', dosage: '1x Daily', quantity: 30, stock: 45 },
    ]
  },
  {
    id: 'RX-1093',
    date: '2023-10-18',
    patient: 'Samina Pervez',
    doctor: 'Dr. Sana Zafar',
    status: 'Pending',
    medications: [
      { name: 'Amoxicillin 500mg', dosage: '3x Daily', quantity: 21, stock: 15 }, // Low stock scenario
      { name: 'Paracetamol 500mg', dosage: 'As needed', quantity: 10, stock: 200 },
    ]
  },
  {
    id: 'RX-1091',
    date: '2023-10-17',
    patient: 'Umar Farooq',
    doctor: 'Dr. Tariq Mahmood',
    status: 'Dispensed',
    medications: [
      { name: 'Atorvastatin 20mg', dosage: '1x Daily', quantity: 30, stock: 80 },
    ]
  },
];

export function PrescriptionDispensePage() {
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRx = prescriptions.filter(rx => 
    rx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rx.patient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDispense = (id) => {
    // In a real app, this would also deduct from inventory stock
    setPrescriptions(prescriptions.map(rx => 
      rx.id === id ? { ...rx, status: 'Dispensed' } : rx
    ));
    toast.success(`Prescription ${id} marked as dispensed.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Prescription Queue</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Review prescriptions, verify inventory, and dispense medication.
          </p>
        </div>
      </div>

      <Card>
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30">
          <div className="w-full sm:max-w-md relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by RX ID or Patient Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
            />
          </div>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {filteredRx.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <FileText className="w-12 h-12 mx-auto text-slate-300 mb-3" />
              <p>No prescriptions found in the queue.</p>
            </div>
          ) : (
            filteredRx.map((rx) => (
              <div key={rx.id} className="p-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{rx.id}</h3>
                      <Badge variant={rx.status === 'Dispensed' ? 'success' : 'warning'}>
                        {rx.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      <span className="font-medium text-slate-900 dark:text-slate-100">Patient:</span> {rx.patient}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      <span className="font-medium text-slate-900 dark:text-slate-100">Prescribed by:</span> {rx.doctor} on {rx.date}
                    </p>
                  </div>
                  
                  {rx.status === 'Pending' && (
                    <Button onClick={() => handleDispense(rx.id)} variant="primary">
                      <CheckCircle className="w-4 h-4 mr-2" /> Mark as Dispensed
                    </Button>
                  )}
                </div>

                {/* Medications List */}
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100/50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                      <tr>
                        <th className="px-4 py-2 font-medium">Medication</th>
                        <th className="px-4 py-2 font-medium">Dosage / Freq</th>
                        <th className="px-4 py-2 font-medium text-center">Req. Qty</th>
                        <th className="px-4 py-2 font-medium text-center">In Stock</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/50 dark:divide-slate-700/50">
                      {rx.medications.map((med, idx) => {
                        const isShort = med.stock < med.quantity;
                        return (
                          <tr key={idx}>
                            <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{med.name}</td>
                            <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{med.dosage}</td>
                            <td className="px-4 py-3 text-center font-bold">{med.quantity}</td>
                            <td className="px-4 py-3 text-center">
                              {isShort ? (
                                <span className="inline-flex items-center text-red-600 font-bold bg-red-50 px-2 py-1 rounded">
                                  <AlertTriangle className="w-3.5 h-3.5 mr-1" />
                                  {med.stock}
                                </span>
                              ) : (
                                <span className="text-emerald-600 font-medium">{med.stock}</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}

export default PrescriptionDispensePage;
