import { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  AlertTriangle,
  Clock
} from 'lucide-react';
import toast from 'react-hot-toast';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Pagination } from '@/components/ui/Pagination';
import { DropdownMenu, DropdownMenuItem } from '@/components/ui/DropdownMenu';

// Mock Inventory Data
const CATEGORIES = ['Antibiotics', 'Painkillers', 'Cardiovascular', 'Vitamins', 'Antihistamines', 'Syrups', 'Injections'];

const initialInventory = Array.from({ length: 35 }).map((_, i) => {
  const daysToExpiry = Math.floor(Math.random() * 400) - 20; // some expired or expiring soon
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + daysToExpiry);
  
  const stock = Math.floor(Math.random() * 300); // 0 to 300

  return {
    id: `MED-${1000 + i}`,
    name: ['Amoxicillin', 'Paracetamol', 'Lisinopril', 'Vitamin D3', 'Cetirizine', 'Cough Syrup', 'Insulin'][i % 7] + ` ${Math.floor(Math.random() * 50) * 10}mg`,
    category: CATEGORIES[i % 7],
    stock: stock,
    unit: ['tablets', 'bottles', 'vials', 'capsules'][i % 4],
    expiryDate: expiryDate.toISOString().split('T')[0],
    daysToExpiry: daysToExpiry,
  };
});

export function InventoryPage() {
  const [inventory, setInventory] = useState(initialInventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Derived filtered data
  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCat = categoryFilter === 'All' || item.category === categoryFilter;

      return matchesSearch && matchesCat;
    });
  }, [inventory, searchTerm, categoryFilter]);

  const totalItems = filteredInventory.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const paginatedInventory = filteredInventory.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page) => setCurrentPage(page);
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'bg-red-50 text-red-700 border-red-200' };
    if (stock <= 20) return { label: 'Low Stock', color: 'bg-amber-50 text-amber-700 border-amber-200' };
    return { label: 'In Stock', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
  };

  const getExpiryStatus = (days) => {
    if (days < 0) return { label: 'Expired', icon: <AlertTriangle className="w-3.5 h-3.5 text-red-500" />, color: 'text-red-600 font-medium' };
    if (days <= 90) return { label: 'Expiring Soon', icon: <Clock className="w-3.5 h-3.5 text-amber-500" />, color: 'text-amber-600 font-medium' };
    return { label: 'Valid', icon: null, color: 'text-slate-600 dark:text-slate-300' };
  };

  const handleDelete = (id) => {
    if (window.confirm('Remove this medicine from inventory?')) {
      setInventory(inventory.filter(i => i.id !== id));
      toast.success('Item deleted.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Pharmacy Inventory</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Manage medicines, track stock levels, and monitor expiration dates.
          </p>
        </div>
        <Button variant="primary" className="shrink-0">
          <Plus className="w-4 h-4 mr-2" />
          Add Medicine
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-4 border-l-4 border-l-blue-500">
          <p className="text-sm font-medium text-slate-500">Total Unique Items</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{inventory.length}</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-amber-500 bg-amber-50/30 dark:bg-amber-900/10">
          <p className="text-sm font-medium text-amber-700 dark:text-amber-500">Low or Out of Stock</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {inventory.filter(i => i.stock <= 20).length}
          </p>
        </Card>
        <Card className="p-4 border-l-4 border-l-red-500 bg-red-50/30 dark:bg-red-900/10">
          <p className="text-sm font-medium text-red-700 dark:text-red-500">Expired / Expiring (&lt; 90 Days)</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {inventory.filter(i => i.daysToExpiry <= 90).length}
          </p>
        </Card>
      </div>

      <Card>
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
          <div className="w-full sm:w-80 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search medicine name or ID..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <Filter className="w-4 h-4" />
              <span>Category:</span>
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 text-xs uppercase font-semibold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-4">Medicine Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Stock Level</th>
                <th className="px-6 py-4">Expiry Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedInventory.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No medicines found matching your criteria.
                  </td>
                </tr>
              ) : (
                paginatedInventory.map((item) => {
                  const stockStat = getStockStatus(item.stock);
                  const expiryStat = getExpiryStatus(item.daysToExpiry);

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/75 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.id}</p>
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                        {item.category}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-start gap-1">
                          <span className="font-medium text-slate-900 dark:text-white">
                            {item.stock} {item.unit}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${stockStat.color}`}>
                            {stockStat.label}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`flex items-center gap-1.5 ${expiryStat.color}`}>
                          {expiryStat.icon}
                          <span>{item.expiryDate}</span>
                        </div>
                        {item.daysToExpiry < 0 && (
                          <p className="text-xs text-red-500 mt-0.5">Expired {Math.abs(item.daysToExpiry)} days ago</p>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu
                          align="right"
                          trigger={
                            <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          }
                        >
                          <DropdownMenuItem icon={Edit}>
                            Update Stock
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            icon={Trash2}
                            danger
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete Record
                          </DropdownMenuItem>
                        </DropdownMenu>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      </Card>
    </div>
  );
}

export default InventoryPage;
