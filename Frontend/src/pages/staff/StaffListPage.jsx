import { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2,
  Phone,
  Mail
} from 'lucide-react';
import toast from 'react-hot-toast';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Pagination } from '@/components/ui/Pagination';
import { DropdownMenu, DropdownMenuItem } from '@/components/ui/DropdownMenu';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { StaffFormModal } from './StaffFormModal';

// Mock Staff Data
const ROLES = ['Doctor', 'Nurse', 'Receptionist', 'Pharmacist', 'Lab Technician', 'Admin'];
const DEPTS = ['Cardiology', 'Neurology', 'Pediatrics', 'Emergency', 'General Medicine', 'Surgery', 'Pharmacy', 'Laboratory', 'Administration'];

const initialStaff = Array.from({ length: 42 }).map((_, i) => {
  const role = ROLES[i % ROLES.length];
  let dept = DEPTS[i % DEPTS.length];
  
  if (role === 'Pharmacist') dept = 'Pharmacy';
  if (role === 'Lab Technician') dept = 'Laboratory';
  if (role === 'Admin') dept = 'Administration';

  return {
    id: `EMP-${1000 + i}`,
    firstName: ['Tariq', 'Sana', 'Ahmed', 'Ayesha', 'Omar', 'Fatima'][i % 6],
    lastName: ['Mahmood', 'Zafar', 'Malik', 'Siddiqui', 'Khan', 'Bibi'][i % 6],
    role: role,
    department: dept,
    phone: `+92 321 76543${(i % 99).toString().padStart(2, '0')}`,
    email: `staff${i}@hospital.com`,
    specialization: role === 'Doctor' ? ['Cardiology', 'Orthopedics', 'Pediatrics'][i % 3] : undefined,
    availability: role === 'Doctor' ? 'Morning Shift (8AM - 2PM)' : undefined,
  };
});

export function StaffListPage({ defaultRole = 'all' }) {
  const [staffList, setStaffList] = useState(initialStaff);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Convert 'all' to 'All', 'doctor' to 'Doctor', etc.
  const initialRoleFilter = defaultRole.toLowerCase() === 'all' 
    ? 'All' 
    : defaultRole.charAt(0).toUpperCase() + defaultRole.slice(1);
    
  const [roleFilter, setRoleFilter] = useState(initialRoleFilter);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staffToEdit, setStaffToEdit] = useState(null);

  // Derived filtered data
  const filteredStaff = useMemo(() => {
    return staffList.filter((s) => {
      const matchesSearch = 
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.department.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRole = roleFilter === 'All' || s.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [staffList, searchTerm, roleFilter]);

  const totalItems = filteredStaff.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const paginatedStaff = filteredStaff.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page) => setCurrentPage(page);
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleAddStaff = () => {
    setStaffToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditStaff = (staff) => {
    setStaffToEdit(staff);
    setIsModalOpen(true);
  };

  const handleDeleteStaff = (id) => {
    if (window.confirm('Are you sure you want to remove this staff member?')) {
      setStaffList(staffList.filter(s => s.id !== id));
      toast.success('Staff member removed.');
    }
  };

  const handleModalSuccess = (data) => {
    if (staffToEdit) {
      // Update
      setStaffList(staffList.map(s => s.id === staffToEdit.id ? { ...s, ...data } : s));
    } else {
      // Create
      const newStaff = {
        id: `EMP-${Math.floor(Math.random() * 9000) + 1000}`,
        ...data,
      };
      setStaffList([newStaff, ...staffList]);
    }
  };

  // Helper for role badge colors
  const getRoleBadgeVariant = (role) => {
    switch(role) {
      case 'Doctor': return 'primary';
      case 'Nurse': return 'success';
      case 'Admin': return 'danger';
      case 'Receptionist': return 'warning';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Staff Directory</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Manage hospital personnel, doctors, and department assignments.
          </p>
        </div>
        <Button onClick={handleAddStaff} variant="primary" className="shrink-0">
          <Plus className="w-4 h-4 mr-2" />
          Add Staff Member
        </Button>
      </div>

      <Card>
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
          <div className="w-full sm:w-72 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search name, ID or department..."
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
              <span>Role:</span>
            </div>
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="All">All Roles</option>
              {ROLES.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 text-xs uppercase font-semibold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Role & Dept</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Additional Info</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedStaff.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No staff members found matching your search.
                  </td>
                </tr>
              ) : (
                paginatedStaff.map((staff) => (
                  <tr key={staff.id} className="hover:bg-slate-50/75 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={`${staff.firstName} ${staff.lastName}`} size="sm" />
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {staff.role === 'Doctor' ? 'Dr. ' : ''}{staff.firstName} {staff.lastName}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{staff.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="mb-1">
                        <Badge variant={getRoleBadgeVariant(staff.role)}>
                          {staff.role}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300">{staff.department}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{staff.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>{staff.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {staff.role === 'Doctor' ? (
                        <div className="text-xs space-y-1">
                          <p className="text-slate-900 dark:text-white font-medium">{staff.specialization}</p>
                          <p className="text-slate-500">{staff.availability}</p>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic text-xs">Standard Hours</span>
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
                        <DropdownMenuItem
                          icon={Edit}
                          onClick={() => handleEditStaff(staff)}
                        >
                          Edit Record
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          icon={Trash2}
                          danger
                          onClick={() => handleDeleteStaff(staff.id)}
                        >
                          Remove Staff
                        </DropdownMenuItem>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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

      <StaffFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        staffMember={staffToEdit}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}

export default StaffListPage;
