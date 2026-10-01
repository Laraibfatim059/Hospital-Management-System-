import { useState, useMemo } from 'react';
import { 
  Search, 
  CreditCard,
  CheckCircle2,
  Clock,
  Receipt,
  FileText,
  Printer
} from 'lucide-react';
import toast from 'react-hot-toast';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';

// Mock Invoice Data
const initialInvoices = [
  {
    id: 'INV-8042',
    patient: 'Kashif Mehmood',
    date: '2023-10-18',
    status: 'Pending',
    total: 8500,
    breakdown: [
      { category: 'Consultation', description: 'Cardiology Visit - Dr. Ahmed', amount: 3000 },
      { category: 'Laboratory', description: 'Lipid Profile', amount: 2200 },
      { category: 'Pharmacy', description: 'Prescription Meds', amount: 3300 },
    ]
  },
  {
    id: 'INV-8043',
    patient: 'Samina Pervez',
    date: '2023-10-18',
    status: 'Pending',
    total: 4500,
    breakdown: [
      { category: 'Consultation', description: 'Pediatrics Visit - Dr. Sana', amount: 2500 },
      { category: 'Laboratory', description: 'Complete Blood Count', amount: 1500 },
      { category: 'Pharmacy', description: 'Syrup & Vitamins', amount: 500 },
    ]
  },
  {
    id: 'INV-8040',
    patient: 'Umar Farooq',
    date: '2023-10-15',
    status: 'Paid',
    total: 45000,
    breakdown: [
      { category: 'Room/Bed', description: 'General Ward (3 Days)', amount: 15000 },
      { category: 'Consultation', description: 'Daily Rounds', amount: 6000 },
      { category: 'Laboratory', description: 'Liver Function & Comprehensive', amount: 8000 },
      { category: 'Pharmacy', description: 'IV Fluids & Antibiotics', amount: 16000 },
    ]
  },
];

export function BillingDashboard() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Pending'); // 'Pending' or 'Paid'
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeInvoice, setActiveInvoice] = useState(null);

  const filteredInvoices = useMemo(() => {
    return invoices.filter(inv => 
      inv.status === activeTab &&
      (inv.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
       inv.id.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [invoices, searchTerm, activeTab]);

  const openInvoice = (invoice) => {
    setActiveInvoice(invoice);
    setIsModalOpen(true);
  };

  const handleProcessPayment = () => {
    setInvoices(invoices.map(inv => 
      inv.id === activeInvoice.id ? { ...inv, status: 'Paid' } : inv
    ));
    toast.success(`Payment of PKR ${activeInvoice.total.toLocaleString()} processed successfully.`);
    setIsModalOpen(false);
  };

  const formatCurrency = (amount) => `PKR ${amount.toLocaleString()}`;



  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Billing & Payments</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Manage patient invoices, process payments, and track hospital revenue.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-700">
        <button
          className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'Pending' 
              ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
          onClick={() => setActiveTab('Pending')}
        >
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Pending Payments
            <Badge variant="warning" className="ml-1">
              {invoices.filter(i => i.status === 'Pending').length}
            </Badge>
          </div>
        </button>
        <button
          className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'Paid' 
              ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
          onClick={() => setActiveTab('Paid')}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Payment History
          </div>
        </button>
      </div>

      <Card>
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30">
          <div className="w-full sm:max-w-md relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by Patient Name or Invoice ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
            />
          </div>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 text-xs uppercase font-semibold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-4">Invoice ID & Date</th>
                <th className="px-6 py-4">Patient Name</th>
                <th className="px-6 py-4 text-right">Total Amount</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <Receipt className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                    No {activeTab.toLowerCase()} invoices found.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/75 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900 dark:text-white">{inv.id}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{inv.date}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300 font-medium">
                      {inv.patient}
                    </td>
                    <td className="px-6 py-4 text-slate-900 dark:text-white font-bold text-right">
                      {formatCurrency(inv.total)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge variant={inv.status === 'Paid' ? 'success' : 'warning'}>
                        {inv.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {activeTab === 'Pending' ? (
                        <Button size="sm" variant="primary" onClick={() => openInvoice(inv)}>
                          <CreditCard className="w-4 h-4 mr-2" /> Process Payment
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => openInvoice(inv)}>
                          <FileText className="w-4 h-4 mr-2" /> View Receipt
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Detailed Invoice Modal */}
      {activeInvoice && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={activeTab === 'Pending' ? 'Process Payment' : 'Invoice Receipt'}
          size="lg"
        >
          <div className="space-y-6">
            
            {/* Invoice Header */}
            <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-700 pb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">MedCare Hospital</h3>
                <p className="text-sm text-slate-500">123 Health Avenue, City District</p>
                <p className="text-sm text-slate-500">Phone: +92 42 111-222-333</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-slate-900 dark:text-white">{activeInvoice.id}</p>
                <p className="text-sm text-slate-500">Date: {activeInvoice.date}</p>
                <p className="text-sm font-medium mt-2">
                  <span className="text-slate-500">Patient: </span>
                  <span className="text-slate-900 dark:text-white">{activeInvoice.patient}</span>
                </p>
              </div>
            </div>

            {/* Invoice Body (Itemized) */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Itemized Charges</h4>
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  <tr>
                    <th className="px-4 py-2 font-semibold">Category</th>
                    <th className="px-4 py-2 font-semibold">Description</th>
                    <th className="px-4 py-2 font-semibold text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {activeInvoice.breakdown.map((item, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">{item.category}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{item.description}</td>
                      <td className="px-4 py-3 text-right font-medium text-slate-900 dark:text-white">{formatCurrency(item.amount)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-50 dark:bg-slate-800 font-bold text-slate-900 dark:text-white text-base border-t-2 border-slate-200 dark:border-slate-700">
                    <td colSpan={2} className="px-4 py-3 text-right">Total Amount:</td>
                    <td className="px-4 py-3 text-right text-blue-600 dark:text-blue-400">{formatCurrency(activeInvoice.total)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Payment Status Badging inside receipt */}
            <div className="flex justify-center pt-4">
              {activeInvoice.status === 'Paid' ? (
                <div className="px-8 py-3 border-2 border-emerald-500 text-emerald-600 rounded-lg font-bold text-lg uppercase tracking-widest rotate-[-5deg] opacity-70">
                  PAID IN FULL
                </div>
              ) : (
                <div className="px-8 py-3 border-2 border-red-500 text-red-600 rounded-lg font-bold text-lg uppercase tracking-widest rotate-[-5deg] opacity-70">
                  PAYMENT DUE
                </div>
              )}
            </div>
            
          </div>

          <Modal.Footer className="mt-8 pt-4 flex justify-between items-center">
            <Button type="button" variant="outline" onClick={() => window.print()}>
              <Printer className="w-4 h-4 mr-2" /> Print
            </Button>
            
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
              {activeTab === 'Pending' && (
                <Button type="button" variant="primary" onClick={handleProcessPayment}>
                  Process Payment Now
                </Button>
              )}
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default BillingDashboard;
