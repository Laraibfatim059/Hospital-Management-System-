import { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash2,
  Calendar
} from 'lucide-react';
import toast from 'react-hot-toast';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Pagination } from '@/components/ui/Pagination';
import { DropdownMenu, DropdownMenuItem } from '@/components/ui/DropdownMenu';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { PatientFormModal } from './PatientFormModal';

// Mock Patient Data
const initialPatients = Array.from({ length: 45 }).map((_, i) => ({
  id: `PAT-${1000 + i}`,
  firstName: ['Ali', 'Ayesha', 'Omar', 'Fatima', 'Bilal', 'Zainab'][i % 6],
  lastName: ['Khan', 'Ahmed', 'Malik', 'Shah', 'Qureshi', 'Raza'][i % 6],
  gender: i % 3 === 0 ? 'female' : 'male',
  dateOfBirth: '1985-06-15',
  phone: `+92 300 12345${(i % 99).toString().padStart(2, '0')}`,
  email: `patient${i}@example.com`,
  bloodGroup: ['A+', 'O+', 'B+', 'AB-'][i % 4],
  address: 'Lahore, Pakistan',
  status: i % 5 === 0 ? 'admitted' : 'discharged',
  lastVisit: `2023-10-${(10 + (i % 20)).toString().padStart(2, '0')}`,
}));

export function PatientListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const basePath = location.pathname.split('/').slice(0, 2).join('/'); // gets /admin or /doctor etc.

  const [patients, setPatients] = useState(initialPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientToEdit, setPatientToEdit] = useState(null);

  // Derived filtered data
  const filteredPatients = useMemo(() => {
    return patients.filter((p) => {
      const matchesSearch = 
        `${p.firstName} ${p.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.phone.includes(searchTerm);
      
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [patients, searchTerm, statusFilter]);

  const totalItems = filteredPatients.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const paginatedPatients = filteredPatients.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page) => setCurrentPage(page);
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleAddPatient = () => {
    setPatientToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditPatient = (patient) => {
    setPatientToEdit(patient);
    setIsModalOpen(true);
  };

  const handleDeletePatient = (id) => {
    if (window.confirm('Are you sure you want to delete this patient record?')) {
      setPatients(patients.filter(p => p.id !== id));
      toast.success('Patient record deleted.');
    }
  };

  const handleModalSuccess = (data) => {
    if (patientToEdit) {
      // Update
      setPatients(patients.map(p => p.id === patientToEdit.id ? { ...p, ...data } : p));
    } else {
      // Create
      const newPatient = {
        id: `PAT-${Math.floor(Math.random() * 9000) + 1000}`,
        status: 'discharged',
        lastVisit: new Date().toISOString().split('T')[0],
        ...data,
      };
      setPatients([newPatient, ...patients]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Patients</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Manage patient records, history, and registrations.
          </p>
        </div>
        <Button onClick={handleAddPatient} variant="primary" className="shrink-0">
          <Plus className="w-4 h-4 mr-2" />
          Add Patient
        </Button>
      </div>

      <Card>
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
          <div className="w-full sm:w-72 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by name, ID or phone..."
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
              <span>Status:</span>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="all">All Patients</option>
              <option value="admitted">Admitted</option>
              <option value="discharged">Discharged</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 text-xs uppercase font-semibold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-4">Patient Name</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Last Visit</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedPatients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No patients found matching your search.
                  </td>
                </tr>
              ) : (
                paginatedPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-slate-50/75 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={`${patient.firstName} ${patient.lastName}`} size="sm" />
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {patient.firstName} {patient.lastName}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {patient.id} • {patient.gender === 'male' ? 'M' : 'F'} • {patient.bloodGroup}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      <p>{patient.phone}</p>
                      <p className="text-xs text-slate-400">{patient.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{patient.lastVisit}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={patient.status === 'admitted' ? 'warning' : 'success'}>
                        {patient.status}
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
                          icon={Eye}
                          onClick={() => navigate(`${basePath}/patients/${patient.id}`)}
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          icon={Edit}
                          onClick={() => handleEditPatient(patient)}
                        >
                          Edit Record
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          icon={Trash2}
                          danger
                          onClick={() => handleDeletePatient(patient.id)}
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

      <PatientFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        patient={patientToEdit}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}

export default PatientListPage;
