import { useState, useMemo } from 'react';
import { 
  Search, 
  FileEdit,
  CheckCircle2,
  Clock,
  Eye
} from 'lucide-react';
import toast from 'react-hot-toast';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Textarea } from '@/components/ui/Textarea';

const initialOrders = [
  { id: 'ORD-5012', patient: 'Kashif Mehmood', test: 'Lipid Profile', date: '2023-10-18', status: 'Pending', requestingDoctor: 'Dr. Ahmed Malik', result: '' },
  { id: 'ORD-5013', patient: 'Samina Pervez', test: 'Complete Blood Count', date: '2023-10-18', status: 'Pending', requestingDoctor: 'Dr. Sana Zafar', result: '' },
  { id: 'ORD-5011', patient: 'Umar Farooq', test: 'Liver Function Test', date: '2023-10-17', status: 'Completed', requestingDoctor: 'Dr. Tariq Mahmood', result: 'ALT: 45 U/L (Normal), AST: 38 U/L (Normal)' },
];

export function LabOrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Pending'); // 'Pending' or 'Completed'
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderToResult, setOrderToResult] = useState(null);
  const [resultText, setResultText] = useState('');

  const filteredOrders = useMemo(() => {
    return orders.filter(o => 
      o.status === activeTab &&
      (o.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
       o.test.toLowerCase().includes(searchTerm.toLowerCase()) ||
       o.id.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [orders, searchTerm, activeTab]);

  const openResultModal = (order) => {
    setOrderToResult(order);
    setResultText(order.result || '');
    setIsModalOpen(true);
  };

  const handleSaveResult = () => {
    if (!resultText.trim()) {
      toast.error('Result report cannot be empty.');
      return;
    }
    
    setOrders(orders.map(o => 
      o.id === orderToResult.id 
        ? { ...o, result: resultText, status: 'Completed' } 
        : o
    ));
    
    toast.success('Lab results saved and order marked as completed.');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Laboratory Orders</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Process test requests, enter clinical results, and manage lab history.
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
            Pending Tests
            <Badge variant="warning" className="ml-1">
              {orders.filter(o => o.status === 'Pending').length}
            </Badge>
          </div>
        </button>
        <button
          className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'Completed' 
              ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
          onClick={() => setActiveTab('Completed')}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Completed Reports
          </div>
        </button>
      </div>

      <Card>
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30">
          <div className="w-full sm:max-w-md relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by Patient, Test, or Order ID..."
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
                <th className="px-6 py-4">Order ID & Date</th>
                <th className="px-6 py-4">Patient Name</th>
                <th className="px-6 py-4">Test Requested</th>
                <th className="px-6 py-4">Requesting Doctor</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No {activeTab.toLowerCase()} orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/75 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900 dark:text-white">{order.id}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{order.date}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300 font-medium">
                      {order.patient}
                    </td>
                    <td className="px-6 py-4 text-slate-900 dark:text-white font-medium">
                      {order.test}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      {order.requestingDoctor}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {activeTab === 'Pending' ? (
                        <Button size="sm" variant="primary" onClick={() => openResultModal(order)}>
                          <FileEdit className="w-4 h-4 mr-2" /> Enter Results
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => openResultModal(order)}>
                          <Eye className="w-4 h-4 mr-2" /> View Report
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

      {/* Result Entry Modal */}
      {orderToResult && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={activeTab === 'Pending' ? 'Enter Lab Results' : 'Laboratory Report'}
          size="md"
        >
          <div className="space-y-4">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-sm mb-4">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-slate-500">Test:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{orderToResult.test}</span>
                
                <span className="text-slate-500">Patient:</span>
                <span className="font-medium text-slate-900 dark:text-white">{orderToResult.patient}</span>
                
                <span className="text-slate-500">Requested By:</span>
                <span className="text-slate-700 dark:text-slate-300">{orderToResult.requestingDoctor}</span>
              </div>
            </div>

            <Textarea
              label="Clinical Results / Findings"
              placeholder="Enter numerical values, observations, and conclusions..."
              rows={6}
              value={resultText}
              onChange={(e) => setResultText(e.target.value)}
              disabled={activeTab === 'Completed'}
            />
          </div>

          <Modal.Footer className="mt-6 p-0 border-t-0 bg-transparent flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              {activeTab === 'Pending' ? 'Cancel' : 'Close'}
            </Button>
            {activeTab === 'Pending' && (
              <Button type="button" variant="primary" onClick={handleSaveResult}>
                Save & Complete Order
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default LabOrdersPage;
