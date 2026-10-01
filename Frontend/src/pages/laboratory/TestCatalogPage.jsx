import { useState } from 'react';
import { 
  Search, 
  FlaskConical,
  Clock,
  CircleDollarSign
} from 'lucide-react';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const initialTests = [
  { id: 'TST-001', name: 'Complete Blood Count (CBC)', category: 'Hematology', tat: '24 Hours', cost: 'PKR 1,500', isAvailable: true },
  { id: 'TST-002', name: 'Lipid Profile', category: 'Biochemistry', tat: '12 Hours', cost: 'PKR 2,200', isAvailable: true },
  { id: 'TST-003', name: 'Liver Function Test (LFT)', category: 'Biochemistry', tat: '24 Hours', cost: 'PKR 1,800', isAvailable: true },
  { id: 'TST-004', name: 'HbA1c', category: 'Endocrinology', tat: '48 Hours', cost: 'PKR 2,500', isAvailable: true },
  { id: 'TST-005', name: 'Thyroid Stimulating Hormone (TSH)', category: 'Endocrinology', tat: '48 Hours', cost: 'PKR 2,100', isAvailable: true },
  { id: 'TST-006', name: 'Urinalysis', category: 'Microbiology', tat: '4 Hours', cost: 'PKR 800', isAvailable: true },
  { id: 'TST-007', name: 'Vitamin D (25-OH)', category: 'Immunology', tat: '72 Hours', cost: 'PKR 4,500', isAvailable: false }, // Equipment maintenance mockup
];

export function TestCatalogPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTests = initialTests.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Laboratory Test Catalog</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Directory of all available diagnostic tests, turnaround times, and pricing.
          </p>
        </div>
      </div>

      <Card>
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30">
          <div className="w-full sm:max-w-md relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by test name, category or ID..."
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
                <th className="px-6 py-4">Test Name & ID</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Turn-Around Time (TAT)</th>
                <th className="px-6 py-4">Cost</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No tests found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredTests.map((test) => (
                  <tr key={test.id} className="hover:bg-slate-50/75 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg">
                          <FlaskConical className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{test.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{test.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300 font-medium">
                      {test.category}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {test.tat}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <CircleDollarSign className="w-3.5 h-3.5 text-slate-400" />
                        {test.cost}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {test.isAvailable ? (
                        <Badge variant="success">Available</Badge>
                      ) : (
                        <Badge variant="danger">Unavailable</Badge>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default TestCatalogPage;
