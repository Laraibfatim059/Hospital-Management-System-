import { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2,
  Users
} from 'lucide-react';
import toast from 'react-hot-toast';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { DropdownMenu, DropdownMenuItem } from '@/components/ui/DropdownMenu';
import { Badge } from '@/components/ui/Badge';
import { DepartmentFormModal } from './DepartmentFormModal';

// Mock Department Data
const initialDepartments = [
  { id: 'DEPT-01', name: 'Cardiology', headOfDepartment: 'Dr. Ahmed Malik', description: 'Heart and cardiovascular system treatments.', staffCount: 24, status: 'Active' },
  { id: 'DEPT-02', name: 'Neurology', headOfDepartment: 'Dr. Tariq Mahmood', description: 'Brain and nervous system specialists.', staffCount: 18, status: 'Active' },
  { id: 'DEPT-03', name: 'Pediatrics', headOfDepartment: 'Dr. Sana Zafar', description: 'Infant, child, and adolescent care.', staffCount: 32, status: 'Active' },
  { id: 'DEPT-04', name: 'Emergency', headOfDepartment: 'Dr. Omar Khan', description: '24/7 urgent care and trauma center.', staffCount: 45, status: 'Active' },
  { id: 'DEPT-05', name: 'General Medicine', headOfDepartment: 'Dr. Fatima Noor', description: 'Primary care and internal medicine.', staffCount: 38, status: 'Active' },
  { id: 'DEPT-06', name: 'Surgery', headOfDepartment: 'Dr. Bilal Raza', description: 'General and specialized surgical procedures.', staffCount: 28, status: 'Active' },
  { id: 'DEPT-07', name: 'Pharmacy', headOfDepartment: 'Pharm. Ayesha Siddiqui', description: 'Medication dispensing and inventory.', staffCount: 12, status: 'Active' },
  { id: 'DEPT-08', name: 'Laboratory', headOfDepartment: 'Tech. Zainab Bibi', description: 'Diagnostic tests and imaging.', staffCount: 15, status: 'Active' },
];

export function DepartmentListPage() {
  const [departments, setDepartments] = useState(initialDepartments);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deptToEdit, setDeptToEdit] = useState(null);

  // Derived filtered data
  const filteredDepartments = useMemo(() => {
    return departments.filter((d) => 
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.headOfDepartment.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [departments, searchTerm]);

  const handleAddDept = () => {
    setDeptToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditDept = (dept) => {
    setDeptToEdit(dept);
    setIsModalOpen(true);
  };

  const handleDeleteDept = (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartments(departments.filter(d => d.id !== id));
      toast.success('Department deleted.');
    }
  };

  const handleModalSuccess = (data) => {
    if (deptToEdit) {
      // Update
      setDepartments(departments.map(d => d.id === deptToEdit.id ? { ...d, ...data } : d));
    } else {
      // Create
      const newDept = {
        id: `DEPT-0${departments.length + 1}`,
        staffCount: 0,
        ...data,
      };
      setDepartments([...departments, newDept]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Departments</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Manage hospital departments, capacities, and leadership.
          </p>
        </div>
        <Button onClick={handleAddDept} variant="primary" className="shrink-0">
          <Plus className="w-4 h-4 mr-2" />
          Add Department
        </Button>
      </div>

      <Card>
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30">
          <div className="w-full sm:max-w-md relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search departments or HODs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 text-xs uppercase font-semibold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-4">Department Name</th>
                <th className="px-6 py-4">Head of Department</th>
                <th className="px-6 py-4 text-center">Staff Count</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredDepartments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No departments found matching your search.
                  </td>
                </tr>
              ) : (
                filteredDepartments.map((dept) => (
                  <tr key={dept.id} className="hover:bg-slate-50/75 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900 dark:text-white">{dept.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[250px] mt-0.5">{dept.description}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300 font-medium">
                      {dept.headOfDepartment}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium">
                        <Users className="w-4 h-4 text-slate-400" />
                        {dept.staffCount}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={dept.status === 'Active' ? 'success' : 'danger'}>
                        {dept.status}
                      </Badge>
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
                        <DropdownMenuItem
                          icon={Edit}
                          onClick={() => handleEditDept(dept)}
                        >
                          Edit Department
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          icon={Trash2}
                          danger
                          onClick={() => handleDeleteDept(dept.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <DepartmentFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        department={deptToEdit}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}

export default DepartmentListPage;
