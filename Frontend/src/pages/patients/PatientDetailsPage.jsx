import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Activity,
  Pill,
  FlaskConical,
  Receipt,
  User,
  AlertTriangle
} from 'lucide-react';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/utils/cn';

// Mock Patient Data for Details
const mockPatientData = {
  id: 'PAT-1042',
  firstName: 'Ayesha',
  lastName: 'Siddiqui',
  dateOfBirth: '1985-06-15',
  gender: 'Female',
  bloodGroup: 'A+',
  phone: '+92 300 1234567',
  email: 'ayesha.s@example.com',
  address: 'Gulberg III, Lahore, Pakistan',
  status: 'admitted',
  registeredDate: '2023-01-12',
  emergencyContact: {
    name: 'Tariq Siddiqui',
    relation: 'Husband',
    phone: '+92 321 7654321',
  },
  allergies: ['Penicillin', 'Peanuts', 'Dust Mites'],
  medicalHistory: [
    { condition: 'Hypertension', diagnosed: '2019' },
    { condition: 'Type 2 Diabetes', diagnosed: '2021' },
    { condition: 'Asthma', diagnosed: 'Childhood' },
  ],
  visits: [
    { id: 'VIS-901', date: '2023-10-15', doctor: 'Dr. Ahmed Malik', department: 'Cardiology', reason: 'Routine Checkup' },
    { id: 'VIS-902', date: '2023-08-02', doctor: 'Dr. Sana Zafar', department: 'General', reason: 'Fever and Cough' },
  ],
  prescriptions: [
    { id: 'RX-402', date: '2023-10-15', doctor: 'Dr. Ahmed Malik', meds: 'Lisinopril 10mg (1x daily)' },
    { id: 'RX-403', date: '2023-08-02', doctor: 'Dr. Sana Zafar', meds: 'Paracetamol 500mg (as needed)' },
  ],
  labs: [
    { id: 'LAB-221', date: '2023-10-10', test: 'Complete Blood Count (CBC)', status: 'Completed', result: 'Normal' },
    { id: 'LAB-222', date: '2023-10-10', test: 'HbA1c', status: 'Completed', result: '6.2% (Borderline)' },
  ],
  billing: [
    { id: 'INV-1001', date: '2023-10-15', amount: 'PKR 5,000', status: 'Paid' },
    { id: 'INV-1002', date: '2023-08-02', amount: 'PKR 3,500', status: 'Paid' },
  ]
};

const TABS = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'medical', label: 'Medical History', icon: Activity },
  { id: 'visits', label: 'Visits', icon: Calendar },
  { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
  { id: 'labs', label: 'Lab Reports', icon: FlaskConical },
  { id: 'billing', label: 'Billing', icon: Receipt },
];

export function PatientDetailsPage() {
  useParams(); // id unused
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // In a real app, you would fetch patient data by ID here.
  const patient = mockPatientData;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <Card.Header title="Demographics" />
              <Card.Body className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="block text-slate-500">Date of Birth</span>
                    <span className="font-medium text-slate-900 dark:text-white">{patient.dateOfBirth}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500">Gender</span>
                    <span className="font-medium text-slate-900 dark:text-white">{patient.gender}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500">Blood Group</span>
                    <Badge variant="primary">{patient.bloodGroup}</Badge>
                  </div>
                  <div>
                    <span className="block text-slate-500">Registered On</span>
                    <span className="font-medium text-slate-900 dark:text-white">{patient.registeredDate}</span>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header title="Emergency Contact" />
              <Card.Body className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{patient.emergencyContact.name}</p>
                    <p className="text-xs text-slate-500">{patient.emergencyContact.relation}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-slate-400" />
                  <p className="font-medium text-slate-900 dark:text-white">{patient.emergencyContact.phone}</p>
                </div>
              </Card.Body>
            </Card>
          </div>
        );

      case 'medical':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <Card.Header 
                title="Known Allergies" 
                action={<AlertTriangle className="w-5 h-5 text-amber-500" />}
              />
              <Card.Body>
                {patient.allergies.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {patient.allergies.map(allergy => (
                      <span key={allergy} className="px-3 py-1 bg-red-50 text-red-700 border border-red-100 rounded-full text-sm font-medium">
                        {allergy}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">No known allergies.</p>
                )}
              </Card.Body>
            </Card>

            <Card>
              <Card.Header title="Chronic Conditions & History" />
              <Card.Body className="p-0">
                <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                  {patient.medicalHistory.map((item, idx) => (
                    <li key={idx} className="p-4 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <span className="font-medium text-slate-900 dark:text-white">{item.condition}</span>
                      <span className="text-sm text-slate-500">Diagnosed: {item.diagnosed}</span>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </div>
        );

      case 'visits':
        return (
          <Card>
            <Card.Header title="Visit History" />
            <Card.Body className="p-0">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 text-xs uppercase font-semibold">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Doctor</th>
                    <th className="px-4 py-3">Department</th>
                    <th className="px-4 py-3">Reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {patient.visits.map(visit => (
                    <tr key={visit.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{visit.date}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{visit.doctor}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{visit.department}</td>
                      <td className="px-4 py-3 text-slate-500">{visit.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card.Body>
          </Card>
        );

      case 'prescriptions':
        return (
          <Card>
            <Card.Header title="Prescription History" />
            <Card.Body className="p-0">
              <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                {patient.prescriptions.map(rx => (
                  <li key={rx.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-slate-900 dark:text-white">{rx.id}</h4>
                      <span className="text-xs text-slate-500">{rx.date}</span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 mb-1">{rx.meds}</p>
                    <p className="text-xs text-slate-400">Prescribed by {rx.doctor}</p>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        );

      case 'labs':
        return (
          <Card>
            <Card.Header title="Laboratory Reports" />
            <Card.Body className="p-0">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 text-xs uppercase font-semibold">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Test</th>
                    <th className="px-4 py-3">Result</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {patient.labs.map(lab => (
                    <tr key={lab.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="px-4 py-3 text-slate-500">{lab.date}</td>
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{lab.test}</td>
                      <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{lab.result}</td>
                      <td className="px-4 py-3">
                        <Badge variant="success">{lab.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card.Body>
          </Card>
        );

      case 'billing':
        return (
          <Card>
            <Card.Header title="Billing History" />
            <Card.Body className="p-0">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 text-xs uppercase font-semibold">
                  <tr>
                    <th className="px-4 py-3">Invoice ID</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {patient.billing.map(bill => (
                    <tr key={bill.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{bill.id}</td>
                      <td className="px-4 py-3 text-slate-500">{bill.date}</td>
                      <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-semibold">{bill.amount}</td>
                      <td className="px-4 py-3">
                        <Badge variant="success">{bill.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card.Body>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to List
      </button>

      {/* Patient Header Card */}
      <Card className="bg-white dark:bg-slate-900 border-none shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 overflow-hidden">
        <div className="bg-blue-600 h-24 w-full"></div>
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col sm:flex-row gap-6 sm:items-end -mt-12 sm:-mt-10 mb-4">
            <Avatar 
              name={`${patient.firstName} ${patient.lastName}`} 
              className="h-24 w-24 text-2xl border-4 border-white dark:border-slate-900 bg-white"
            />
            <div className="flex-1 pb-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {patient.firstName} {patient.lastName}
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                    ID: {patient.id} • {patient.status === 'admitted' ? (
                      <span className="text-amber-600 font-medium">Currently Admitted</span>
                    ) : (
                      <span className="text-emerald-600 font-medium">Discharged</span>
                    )}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit Patient</Button>
                  <Button variant="primary" size="sm">Add Visit</Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <Phone className="w-4 h-4 text-slate-400" />
              <span>{patient.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <Mail className="w-4 h-4 text-slate-400" />
              <span className="truncate">{patient.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 md:col-span-2">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="truncate">{patient.address}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto border-b border-slate-200 dark:border-slate-700 hide-scrollbar">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                isActive 
                  ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:hover:text-slate-300'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="pb-10">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default PatientDetailsPage;
