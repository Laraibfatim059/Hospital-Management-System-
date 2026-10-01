import { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2,
  CalendarDays,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  CalendarCheck
} from 'lucide-react';
import toast from 'react-hot-toast';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Pagination } from '@/components/ui/Pagination';
import { DropdownMenu, DropdownMenuItem } from '@/components/ui/DropdownMenu';
import { Badge } from '@/components/ui/Badge';
import { AppointmentFormModal } from './AppointmentFormModal';

const STATUSES = ['Pending', 'Confirmed', 'Completed', 'Cancelled', 'No-show'];

// Mock Appointment Data
const generateMockAppointments = () => {
  const data = [];
  const today = new Date();
  
  for (let i = 0; i < 45; i++) {
    // Generate dates around today (past and future)
    const d = new Date(today);
    d.setDate(today.getDate() + (i % 14) - 7);
    const dateStr = d.toISOString().split('T')[0];
    
    let status = STATUSES[i % STATUSES.length];
    if (d < today && status === 'Pending') status = 'Completed';
    if (d > today && status === 'Completed') status = 'Confirmed';

    data.push({
      id: `APT-${2000 + i}`,
      patient: ['Ali Khan', 'Ayesha Ahmed', 'Omar Malik', 'Fatima Shah', 'Zainab Bibi'][i % 5],
      patientId: `PAT-${1000 + (i % 20)}`,
      doctorId: `DOC-${(i % 3) + 1}`,
      doctorName: ['Dr. Ahmed Malik', 'Dr. Sana Zafar', 'Dr. Tariq Mahmood'][i % 3],
      department: ['Cardiology', 'Pediatrics', 'Neurology'][i % 3],
      date: dateStr,
      time: ['09:00 AM', '10:30 AM', '11:00 AM', '02:30 PM', '04:00 PM'][i % 5],
      type: ['Consultation', 'Follow-up', 'Checkup'][i % 3],
      status: status,
    });
  }
  return data.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date desc
};

const initialAppointments = generateMockAppointments();

export function AppointmentListPage() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aptToEdit, setAptToEdit] = useState(null);

  // Derived filtered data
  const filteredApts = useMemo(() => {
    return appointments.filter((apt) => {
      const matchesSearch = 
        apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [appointments, searchTerm, statusFilter]);

  const totalItems = filteredApts.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const paginatedApts = filteredApts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page) => setCurrentPage(page);
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleBookApt = () => {
    setAptToEdit(null);
    setIsModalOpen(true);
  };

  const handleReschedule = (apt) => {
    setAptToEdit(apt);
    setIsModalOpen(true);
  };

  const handleStatusChange = (id, newStatus) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: newStatus } : apt
    ));
    toast.success(`Appointment marked as ${newStatus}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to permanently delete this appointment record?')) {
      setAppointments(appointments.filter(a => a.id !== id));
      toast.success('Appointment deleted.');
    }
  };

  const handleModalSuccess = (data) => {
    // Basic mapping back to list view format
    const docMap = {
      'DOC-1': { name: 'Dr. Ahmed Malik', dept: 'Cardiology' },
      'DOC-2': { name: 'Dr. Sana Zafar', dept: 'Pediatrics' },
      'DOC-3': { name: 'Dr. Tariq Mahmood', dept: 'Neurology' },
    };
    
    if (aptToEdit) {
      setAppointments(appointments.map(a => 
        a.id === aptToEdit.id ? { 
          ...a, ...data, 
          doctorName: docMap[data.doctorId]?.name || a.doctorName,
          department: docMap[data.doctorId]?.dept || a.department,
        } : a
      ));
    } else {
      const newApt = {
        id: `APT-${Math.floor(Math.random() * 9000) + 1000}`,
        patient: data.patientId || 'New Patient',
        patientId: data.patientId,
        doctorId: data.doctorId,
        doctorName: docMap[data.doctorId]?.name || 'Unknown Doctor',
        department: docMap[data.doctorId]?.dept || 'Unknown',
        date: data.date,
        time: data.time,
        type: data.type,
        status: 'Pending',
      };
      setAppointments([newApt, ...appointments]);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed': return 'primary';
      case 'Completed': return 'success';
      case 'Pending': return 'warning';
      case 'Cancelled': return 'danger';
      case 'No-show': return 'default';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Appointments</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Manage scheduling, cancellations, and patient visits.
          </p>
        </div>
        <Button onClick={handleBookApt} variant="primary" className="shrink-0">
          <CalendarCheck className="w-4 h-4 mr-2" />
          Book Appointment
        </Button>
      </div>

      <Card>
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
          <div className="w-full sm:w-80 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search patient, doctor or ID..."
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
              <option value="All">All Statuses</option>
              {STATUSES.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 text-xs uppercase font-semibold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-4">ID & Patient</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Doctor & Dept</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedApts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No appointments found matching your criteria.
                  </td>
                </tr>
              ) : (
                paginatedApts.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/75 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900 dark:text-white">{apt.patient}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{apt.id}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-1.5 mb-1 font-medium">
                        <CalendarDays className="w-3.5 h-3.5 text-blue-500" />
                        <span>{apt.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{apt.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-900 dark:text-white font-medium">{apt.doctorName}</p>
                      <p className="text-xs text-slate-500">{apt.department}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {apt.type}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={getStatusBadge(apt.status)}>
                        {apt.status}
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
                          icon={CheckCircle2}
                          onClick={() => handleStatusChange(apt.id, 'Confirmed')}
                          disabled={['Confirmed', 'Completed', 'Cancelled'].includes(apt.status)}
                        >
                          Confirm
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          icon={CheckCircle2}
                          onClick={() => handleStatusChange(apt.id, 'Completed')}
                          disabled={apt.status === 'Completed' || apt.status === 'Cancelled'}
                        >
                          Mark Completed
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          icon={Edit}
                          onClick={() => handleReschedule(apt)}
                          disabled={apt.status === 'Completed' || apt.status === 'Cancelled'}
                        >
                          Reschedule
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          icon={XCircle}
                          onClick={() => handleStatusChange(apt.id, 'Cancelled')}
                          disabled={apt.status === 'Completed' || apt.status === 'Cancelled'}
                        >
                          Cancel Appointment
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          icon={AlertCircle}
                          onClick={() => handleStatusChange(apt.id, 'No-show')}
                          disabled={apt.status === 'Completed' || apt.status === 'Cancelled'}
                        >
                          Mark No-show
                        </DropdownMenuItem>
                        <div className="h-px bg-slate-200 dark:bg-slate-700 my-1 mx-2" />
                        <DropdownMenuItem
                          icon={Trash2}
                          danger
                          onClick={() => handleDelete(apt.id)}
                        >
                          Delete Record
                        </DropdownMenuItem>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
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

      <AppointmentFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appointment={aptToEdit}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}

export default AppointmentListPage;
